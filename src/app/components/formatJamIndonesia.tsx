export default function formatJamIndonesia(dateString: string) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }