import Image from "next/image";

interface WhatsAppButtonProps {
  phone: string; // contoh: "6281234567890"
  message?: string; // pesan default
}

export default function WhatsAppButton({ phone, message }: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message || '');
  const waLink = `https://wa.me/${phone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-semibold text-white shadow hover:bg-green-600 transition"
    >
      <Image src="/icons/icon-whatsapp.svg" alt="WA" width={50} height={50} className="size-5"></Image>
      Chat via WhatsApp
    </a>
  );
}
