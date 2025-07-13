import Navbar from "@/app/components/navbar"
import React from 'react';

const VerticalConnector = () => <div className="w-px bg-gray-400 h-8"></div>;
const HorizontalConnector = () => <div className="h-px bg-gray-400 w-full"></div>;
const BranchConnector = () => (
  <div className="flex justify-center w-full relative">
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-6 bg-gray-400"></div>
  </div>
);

export default function StrukturKapolsek() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Struktur Organisasi Polsek</h1>

            <div className="flex flex-col items-center space-y-4">

                {/* Level 1: KAPOLSEK */}
                <div className="bg-blue-600 text-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center border border-gray-200 min-w-[160px] max-w-[200px] flex-shrink-0">
                    <img src="https://res.cloudinary.com/dcnpu9qlr/image/upload/v1752398865/Kapolres_ecfnjo.jpg" alt="Avatar" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-gray-300" />
                    <p className="font-bold text-lg">KAPOLSEK</p>
                    <p className="text-sm text-gray-200">Kepala Kepolisian Sektor</p>
                    <p className="text-xs text-gray-300 mt-1">1 Pegawai</p>
                </div>

                <VerticalConnector />

                {/* Level 1: WAKAPOLSEK */}
                <div className="bg-blue-500 text-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center border border-gray-200 min-w-[160px] max-w-[200px] flex-shrink-0">
                    <img src="https://placehold.co/40x40/33FF57/FFFFFF?text=WK" alt="Avatar" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-gray-300" />
                    <p className="font-bold text-lg">WAKAPOLSEK</p>
                    <p className="text-sm text-gray-200">Wakil Kepala Kepolisian Sektor</p>
                    <p className="text-xs text-gray-300 mt-1">1 Pegawai</p>
                </div>

                <VerticalConnector />

                {/* Unsur Pimpinan Label */}
                <div className="text-gray-700 font-semibold text-sm mb-2 mt-4 border-b-2 border-gray-400 pb-1">UNSUR PIMPINAN</div>

                {/* Level 2: UNIT PROVOS */}
                <div className="bg-purple-600 text-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center border border-gray-200 min-w-[160px] max-w-[200px] flex-shrink-0">
                    <img src="https://placehold.co/40x40/5733FF/FFFFFF?text=PR" alt="Avatar" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-gray-300" />
                    <p className="font-bold text-lg">UNIT PROVOS</p>
                    <p className="text-sm text-gray-200">Penegakan Disiplin</p>
                    <p className="text-xs text-gray-300 mt-1">5 Pegawai</p>
                </div>

                <VerticalConnector />

                {/* Unsur Pelayanan dan Pembantu Pimpinan Label */}
                <div className="text-gray-700 font-semibold text-sm mb-2 mt-4 border-b-2 border-gray-400 pb-1">UNSUR PELAYANAN DAN PEMBANTU PIMPINAN</div>

                {/* Level 3: SIUM and SI HUMAS */}
                <div className="flex flex-col items-center w-full">
                    <HorizontalConnector />
                    <BranchConnector />
                    <div className="flex justify-center gap-8 w-full">
                        {/* SIUM Branch */}
                        <div className="flex flex-col items-center">
                            <div className="bg-green-500 text-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center border border-gray-200 min-w-[160px] max-w-[200px] flex-shrink-0">
                                <img src="https://placehold.co/40x40/FF33A1/FFFFFF?text=SU" alt="Avatar" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-gray-300" />
                                <p className="font-bold text-lg">SIUM</p>
                                <p className="text-sm text-gray-200">Seksi Umum</p>
                                <p className="text-xs text-gray-300 mt-1">10 Pegawai</p>
                            </div>
                            <VerticalConnector />
                            <div className="flex flex-col items-center gap-4 mt-2">
                                <div className="bg-green-400 text-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center border border-gray-200 min-w-[160px] max-w-[200px] flex-shrink-0">
                                    <img src="https://placehold.co/40x40/33A1FF/FFFFFF?text=UR" alt="Avatar" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-gray-300" />
                                    <p className="font-bold text-lg">URRERNMN</p>
                                    <p className="text-sm text-gray-600">Urusan Perencanaan</p>
                                    <p className="text-xs text-gray-500 mt-1">3 Pegawai</p>
                                </div>
                                <div className="bg-green-400 text-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center border border-gray-200 min-w-[160px] max-w-[200px] flex-shrink-0">
                                    <img src="https://placehold.co/40x40/A1FF33/FFFFFF?text=UT" alt="Avatar" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-gray-300" />
                                    <p className="font-bold text-lg">URTAUD</p>
                                    <p className="text-sm text-gray-600">Urusan Tata Usaha</p>
                                    <p className="text-xs text-gray-500 mt-1">3 Pegawai</p>
                                </div>
                                <div className="bg-green-400 text-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center border border-gray-200 min-w-[160px] max-w-[200px] flex-shrink-0">
                                    <img src="https://placehold.co/40x40/FF8833/FFFFFF?text=UM" alt="Avatar" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-gray-300" />
                                    <p className="font-bold text-lg">URTANTI</p>
                                    <p className="text-sm text-gray-600">Urusan Pembinaan Mental</p>
                                    <p className="text-xs text-gray-500 mt-1">2 Pegawai</p>
                                </div>
                            </div>
                        </div>
                        {/* SI HUMAS Branch */}
                        <div className="flex flex-col items-center">
                            <div className="bg-green-500 text-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center border border-gray-200 min-w-[160px] max-w-[200px] flex-shrink-0">
                                <img src="https://placehold.co/40x40/33FF88/FFFFFF?text=SH" alt="Avatar" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-gray-300" />
                                <p className="font-bold text-lg">SI HUMAS</p>
                                <p className="text-sm text-gray-200">Seksi Hubungan Masyarakat</p>
                                <p className="text-xs text-gray-300 mt-1">4 Pegawai</p>
                            </div>
                        </div>
                    </div>
                </div>

                <VerticalConnector />

                {/* Unsur Pelaksana Tugas Pokok Label */}
                <div className="text-gray-700 font-semibold text-sm mb-2 mt-4 border-b-2 border-gray-400 pb-1">UNSUR PELAKSANA TUGAS POKOK</div>

                {/* Level 4: SPKT, INTELKAM, RESKRIM, BIMMAS, SABHARA, LANTAS, POLAIR */}
                <div className="flex flex-col items-center w-full">
                    <HorizontalConnector />
                    <BranchConnector />
                    <div className="flex flex-wrap justify-center gap-6 mt-4">
                        <div className="bg-gray-700 text-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center border border-gray-200 min-w-[160px] max-w-[200px] flex-shrink-0">
                            <img src="https://placehold.co/40x40/8833FF/FFFFFF?text=SP" alt="Avatar" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-gray-300" />
                            <p className="font-bold text-lg">SPKT</p>
                            <p className="text-sm text-gray-200">Pelayanan Terpadu</p>
                            <p className="text-xs text-gray-300 mt-1">8 Pegawai</p>
                        </div>
                        <div className="bg-gray-700 text-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center border border-gray-200 min-w-[160px] max-w-[200px] flex-shrink-0">
                            <img src="https://placehold.co/40x40/FF3333/FFFFFF?text=IN" alt="Avatar" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-gray-300" />
                            <p className="font-bold text-lg">UNIT INTELKAM</p>
                            <p className="text-sm text-gray-200">Intelijen Keamanan</p>
                            <p className="text-xs text-gray-300 mt-1">6 Pegawai</p>
                        </div>
                        <div className="bg-gray-700 text-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center border border-gray-200 min-w-[160px] max-w-[200px] flex-shrink-0">
                            <img src="https://placehold.co/40x40/3333FF/FFFFFF?text=RK" alt="Avatar" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-gray-300" />
                            <p className="font-bold text-lg">UNIT RESKRIM</p>
                            <p className="text-sm text-gray-200">Reserse Kriminal</p>
                            <p className="text-xs text-gray-300 mt-1">7 Pegawai</p>
                        </div>
                        <div className="bg-gray-700 text-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center border border-gray-200 min-w-[160px] max-w-[200px] flex-shrink-0">
                            <img src="https://placehold.co/40x40/33FF33/FFFFFF?text=BM" alt="Avatar" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-gray-300" />
                            <p className="font-bold text-lg">UNIT BIMMAS</p>
                            <p className="text-sm text-gray-200">Pembinaan Masyarakat</p>
                            <p className="text-xs text-gray-300 mt-1">9 Pegawai</p>
                        </div>
                        <div className="bg-gray-700 text-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center border border-gray-200 min-w-[160px] max-w-[200px] flex-shrink-0">
                            <img src="https://placehold.co/40x40/FFCC33/FFFFFF?text=SB" alt="Avatar" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-gray-300" />
                            <p className="font-bold text-lg">UNIT SABHARA</p>
                            <p className="text-sm text-gray-200">Samapta Bhayangkara</p>
                            <p className="text-xs text-gray-300 mt-1">12 Pegawai</p>
                        </div>
                        <div className="bg-gray-700 text-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center border border-gray-200 min-w-[160px] max-w-[200px] flex-shrink-0">
                            <img src="https://placehold.co/40x40/CC33FF/FFFFFF?text=LT" alt="Avatar" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-gray-300" />
                            <p className="font-bold text-lg">UNIT LANTAS</p>
                            <p className="text-sm text-gray-200">Lalu Lintas</p>
                            <p className="text-xs text-gray-300 mt-1">10 Pegawai</p>
                        </div>
                        <div className="bg-gray-700 text-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center border border-gray-200 min-w-[160px] max-w-[200px] flex-shrink-0">
                            <img src="https://placehold.co/40x40/33CCFF/FFFFFF?text=PR" alt="Avatar" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-gray-300" />
                            <p className="font-bold text-lg">UNIT POLAIR</p>
                            <p className="text-sm text-gray-200">Kepolisian Perairan</p>
                            <p className="text-xs text-gray-300 mt-1">5 Pegawai</p>
                        </div>
                    </div>
                </div>

                <VerticalConnector />

                {/* Unsur Pelaksana Tingkat Kewilayahan Label */}
                <div className="text-gray-700 font-semibold text-sm mb-2 mt-4 border-b-2 border-gray-400 pb-1">UNSUR PELAKSANA TINGKAT KEWILAYAHAN</div>

                {/* Level 5: SUBPOLSEK */}
                <div className="bg-gray-800 text-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center border border-gray-200 min-w-[160px] max-w-[200px] flex-shrink-0">
                    <img src="https://placehold.co/40x40/FF66B2/FFFFFF?text=SB" alt="Avatar" className="w-12 h-12 rounded-full object-cover mb-2 border-2 border-gray-300" />
                    <p className="font-bold text-lg">SUBPOLSEK</p>
                    <p className="text-sm text-gray-200">Sub Sektor Kepolisian</p>
                    <p className="text-xs text-gray-300 mt-1">20 Pegawai</p>
                </div>

            </div>
        </div>
  );
}
