import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, AnimatePresence } from 'framer-motion';

type ErrorPopupProps = {
    open: boolean
    close: () => void
    label: string
}

export default function ErrorPopUp({ open, close, label }: ErrorPopupProps) {
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
              className="flex flex-col items-center justify-center gap-4 mx-24 p-6 rounded-4xl bg-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <DotLottieReact
                src="/failed.lottie"
                autoplay
                className='w-64 sm:w-dvh h-auto'
              />
              <h2 className="text-base sm:text-2xl text-amber-500 font-bold">
                {label}
              </h2>
              <button
                onClick={() => close()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-sky-50 rounded-xl transition mb-2"
              >
                <span className="text-base font-bold">
                  Baik, Saya Mengerti
                </span>
              </button>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
  );
};