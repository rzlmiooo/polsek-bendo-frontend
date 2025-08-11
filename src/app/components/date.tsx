"use client";

import React, { useEffect, useState } from "react";

const hariIndonesia = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

const bulanIndonesia = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function pad2(num: number) {
  return num.toString().padStart(2, "0");
}

const DateTimeDisplay: React.FC = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000); // update tiap menit

    return () => clearInterval(interval);
  }, []);

  const hh = pad2(date.getHours());
  const mm = pad2(date.getMinutes());
  const hari = hariIndonesia[date.getDay()];
  const dd = pad2(date.getDate());
  const bulan = bulanIndonesia[date.getMonth()];
  const yyyy = date.getFullYear();

  return (
    <div className="flex flex-col items-start justify-center text-xs md:text-lg font-bold text-gray-800 dark:text-gray-200">
      <div className="text-sm md:text-2xl">{`${hh}:${mm}`}</div>
      <div>{`${hari},`}</div>
      <div>{`${dd} ${bulan} ${yyyy}`}</div>
    </div>
  );
};

export default DateTimeDisplay;