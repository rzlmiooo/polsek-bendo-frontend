export default function RencanaAcara() {
  return (
    <div className="bg-gray-100 min-h-screen pt-24">
      <div className="max-w-screen-xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          RENCANA ACARA
        </h1>

        {/* Struktur Polsek */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Tanggal</th>
                <th className="px-4 py-2 border">Kegiatan</th>
                <th className="px-4 py-2 border">Lokasi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border">2025-06-01</td>
                <td className="px-4 py-2 border">Patroli Malam Gabungan</td>
                <td className="px-4 py-2 border">Polsek Sidoarjo Kota</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border">2025-06-02</td>
                <td className="px-4 py-2 border">Penyuluhan Anti Narkoba</td>
                <td className="px-4 py-2 border">SMAN 1 Porong</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border">2025-06-03</td>
                <td className="px-4 py-2 border">Operasi Tertib Lalu Lintas</td>
                <td className="px-4 py-2 border">Jl. Raya Taman</td>
              </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
