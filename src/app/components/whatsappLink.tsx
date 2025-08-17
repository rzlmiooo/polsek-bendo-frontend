import Image from "next/image";

interface WhatsAppButtonProps {
  phone: string;
  message?: string;
}

function changePrefix(nomor:string) {
  nomor = nomor.replace(/[\s-]/g, '');
  if (nomor.startsWith('+62')) return nomor;
  if (nomor.startsWith('0')) return '+62' + nomor.slice(1);
  return nomor;
}

export default function WhatsAppButton({ phone, message }: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message || '');
  const formatted = changePrefix(phone);
  const waLink = `https://wa.me/${formatted}${encodedMessage ? `?text=${encodedMessage}` : ''}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-semibold text-white shadow hover:bg-green-600 transition"
    >
      <Image src="/icons/icon-whatsapp.svg" alt="WA" width={50} height={50} className="size-10 sm:size-6"></Image>
      <span className="hidden sm:inline-flex">Chat via WhatsApp</span>
    </a>
  );
}
