import { X } from "lucide-react@0.487.0";

interface ErrorToastProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

export function ErrorToast({ isVisible, message, onClose }: ErrorToastProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-24 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2">
      <div className="bg-white text-black border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="font-heading uppercase tracking-wider mb-2">Error</p>
            <p className="text-sm">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="hover:opacity-70 transition-opacity"
            aria-label="Close notification"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
