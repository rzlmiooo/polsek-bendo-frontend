import React, { Suspense } from "react";
import QRCode from "react-qr-code";

interface SuccessMessageProps {
  title?: string;
  description?: string;
  farewell?: string;
  backLinkHref?: string;
  backLinkText?: string;
  newsUrl?: string;
}

export default function SuccessMessageAdmin({
  title,
  description,
  farewell,
  backLinkHref,
  backLinkText,
  newsUrl,
}: SuccessMessageProps) {
  return (
    <Suspense>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <main className="flex-1 transition-all duration-300 pt-16 lg:pt-0 lg:ps-64">
          <div className="bg-white text-black min-h-screen p-8">
            <div className="bg-gray-100 h-screen">
              <div className="bg-white p-6 md:mx-auto">
                <svg
                  viewBox="0 0 24 24"
                  className="text-green-600 w-16 h-16 mx-auto my-6"
                >
                  <path
                    fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                  ></path>
                </svg>
                <div className="text-center">
                  <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                    {title || "Operasi Berhasil!"}
                  </h3>{" "}
                  <p className="text-gray-600 my-2">
                    {description || "Aksi Anda telah berhasil diselesaikan."}
                  </p>{" "}
                  <p>{farewell || "Terima kasih atas kontribusi Anda."}</p>{" "}

                  {newsUrl && (
                    <div className="flex flex-col items-center mt-6">
                      <p className="text-gray-800 font-semibold mb-2">
                        Scan this QR code to view the news article:
                      </p>
                      <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                        <QRCode value={newsUrl} size={180} />
                      </div>
                    </div>
                  )}

                  <div className="py-10 text-center">
                    <a
                      href={backLinkHref || "/admin/dashboard"}
                      className="px-12 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3"
                    >
                      {backLinkText || "KEMBALI KE DASHBOARD"}
                    </a>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Suspense>
  );
}
