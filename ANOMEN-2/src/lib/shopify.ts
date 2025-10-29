// Shopify Storefront API Client
// Fallback to hardcoded values if .env is not available
const domain = (import.meta.env?.VITE_SHOPIFY_STORE_DOMAIN as string) || 'anomen-2.myshopify.com';
const storefrontAccessToken = (import.meta.env?.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string) || '6f9587abfe036bb79929b2614c91ff74';

async function ShopifyData(query: string) {
  // Check if credentials are configured
  if (!domain || domain.trim() === '' || !storefrontAccessToken || storefrontAccessToken.trim() === '') {
    throw new Error("Shopify credentials not configured. Please set VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN in your .env file.");
  }

  const URL = `https://${domain}/api/2024-01/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(URL, options);
    
    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();

    if (data.errors) {
      throw new Error(`Shopify GraphQL error: ${JSON.stringify(data.errors)}`);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Products not fetched");
  }
}

// Get all products
export async function getAllProducts() {
  const query = `
    {
      products(first: 25) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await ShopifyData(query);
  
  if (!response.data || !response.data.products) {
    throw new Error("Invalid response from Shopify API");
  }
  
  const allProducts = response.data.products.edges || [];

  return allProducts;
}

// Get single product by handle
export async function getProduct(handle: string) {
  const query = `
    {
      product(handle: "${handle}") {
        id
        title
        handle
        description
        descriptionHtml
        options {
          name
          values
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 25) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  const response = await ShopifyData(query);
  
  if (!response.data) {
    throw new Error("Invalid response from Shopify API");
  }
  
  const product = response.data.product || null;

  return product;
}

// Create checkout
export async function createCheckout(lineItems: any[]) {
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [${lineItems.map(item => `{
          variantId: "${item.variantId}",
          quantity: ${item.quantity}
        }`).join(',')}]
      }) {
        checkout {
          id
          webUrl
          lineItems(first: 25) {
            edges {
              node {
                title
                quantity
              }
            }
          }
        }
      }
    }
  `;

  const response = await ShopifyData(query);
  
  if (!response.data || !response.data.checkoutCreate) {
    throw new Error("Failed to create checkout");
  }
  
  const checkout = response.data.checkoutCreate.checkout;
  
  if (!checkout) {
    throw new Error("Checkout creation returned null");
  }

  return checkout;
}

// Update checkout
export async function updateCheckout(checkoutId: string, lineItems: any[]) {
  const query = `
    mutation {
      checkoutLineItemsReplace(checkoutId: "${checkoutId}", lineItems: [${lineItems.map(item => `{
        variantId: "${item.variantId}",
        quantity: ${item.quantity}
      }`).join(',')}]) {
        checkout {
          id
          webUrl
          lineItems(first: 25) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await ShopifyData(query);
  
  if (!response.data || !response.data.checkoutLineItemsReplace) {
    throw new Error("Failed to update checkout");
  }
  
  const checkout = response.data.checkoutLineItemsReplace.checkout;
  
  if (!checkout) {
    throw new Error("Checkout update returned null");
  }

  return checkout;
}
