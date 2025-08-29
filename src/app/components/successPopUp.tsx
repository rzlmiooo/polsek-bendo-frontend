import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon } from 'lucide-react';

type SuccessPopupProps = {
    open: boolean
    close: () => void
    label: string
}

export default function SuccessPopUp({ open, close, label }: SuccessPopupProps) {
  return (
      <AnimatePresence>
        {open && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 h-dvh w-full flex justify-center items-center bg-gray-900/30 backdrop-blur-xs"
            onClick={() => close()}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center justify-center gap-4 m-12 p-12 rounded-4xl bg-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
                <DotLottieReact
                src="/success.lottie"
                autoplay
                className='w-64 sm:w-96 h-auto'
                />
              <h2 className="text-3xl text-lime-400 font-bold">
                {label}
              </h2>
              <Link
                href="/order"
                className="inline-flex items-center gap-2 px-3 py-2 bg-sky-600 hover:bg-sky-500 text-sky-50 rounded-xl transition mb-2"
              >
                <ArrowLeftIcon className="w-4 h-auto" />
                <span className="text-base font-bold">
                  Kembali ke Menu Utama
                </span>
              </Link>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
  );
};