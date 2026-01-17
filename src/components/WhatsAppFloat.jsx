import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition"
      aria-label="WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
