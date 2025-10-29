import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { X, Minus, Plus } from "lucide-react@0.487.0";
import { useCart } from "../contexts/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, getCartTotal, checkoutUrl, isLoading } = useCart();

  const handleCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      alert('Shopify checkout is not configured. Please set up your Shopify credentials in the .env file to enable checkout.');
    }
  };

  // Check if cart has mock products
  const hasMockProducts = cart.some(item => item.variantId.includes('mock-'));
  const isCheckoutDisabled = isLoading || (!checkoutUrl && !hasMockProducts);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-black text-white border-l border-white w-full sm:max-w-md">
        <SheetHeader className="border-b border-white pb-6">
          <SheetTitle className="font-heading uppercase tracking-wider text-white">
            CART
          </SheetTitle>
          <SheetDescription className="sr-only">
            Shopping cart with selected items
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8">
          {cart.length === 0 ? (
            <p className="italic">Your cart is empty.</p>
          ) : (
            <div className="space-y-8">
              {cart.map((item) => (
                <div key={item.variantId} className="border-b border-white pb-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-heading uppercase tracking-wider text-xs mb-2">
                        {item.name}
                      </h3>
                      {item.size && (
                        <p className="text-xs mb-2 opacity-70">Size: {item.size}</p>
                      )}
                      <p className="italic text-sm">
                        {item.price}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="border border-white p-1 hover:bg-white hover:text-black transition-colors"
                          aria-label="Decrease quantity"
                          disabled={isLoading}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="border border-white p-1 hover:bg-white hover:text-black transition-colors"
                          aria-label="Increase quantity"
                          disabled={isLoading}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.variantId)}
                      className="hover:opacity-50 transition-opacity"
                      aria-label="Remove item"
                      disabled={isLoading}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-8 space-y-6">
                <div className="flex justify-between items-center border-t border-white pt-6">
                  <span className="font-heading uppercase tracking-wider">TOTAL</span>
                  <span className="font-heading">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={isCheckoutDisabled}
                  className="w-full bg-white text-black py-4 font-heading uppercase tracking-wider text-sm hover:opacity-80 transition-opacity border border-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'LOADING...' : checkoutUrl ? 'CHECKOUT' : 'CHECKOUT (DEMO MODE)'}
                </button>
                {!checkoutUrl && hasMockProducts && (
                  <p className="text-xs text-center opacity-70">
                    Configure Shopify to enable real checkout
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
