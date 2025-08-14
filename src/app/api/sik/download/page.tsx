"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FileType2 } from "lucide-react";

export default function DownloadPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sikId = searchParams.get("sik_id");

  const [token, setToken] = useState<string | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) setToken(storedToken);
    }
  }, [router]);

  const handleDownloadPdf = async () => {
    if (!sikId) return;

    try {
      const res = await axios.get(`${baseUrl}sik/pdf/${sikId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `SIK_${sikId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to download PDF", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-cyan-500 p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-center tracking-wide uppercase">
            SKCK Downloads
          </h2>
        </div>

        {/* Single Download Item */}
        <div className="p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:bg-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-500">
                <FileType2 size={24} className="text-white" />
              </div>
              <div>
                <p className="text-gray-800 font-semibold text-sm md:text-base">
                  {`SIK_${sikId}.pdf`}
                </p>
                <p className="text-gray-500 text-xs">Auto Size</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={handleDownloadPdf}
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
