import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

const Toast = ({ message, isVisible, onClose, duration = 3000 }) => {
 useEffect(() => {
 if (isVisible) {
 const timer = setTimeout(() => {
 onClose();
 }, duration);
 return () => clearTimeout(timer);
 }
 }, [isVisible, duration, onClose]);

 return (
 <AnimatePresence>
 {isVisible && (
 <motion.div
 initial={{ opacity: 0, y: 50, scale: 0.9 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: 20, scale: 0.9 }}
 className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3.5 bg-slate-900 border border-slate-800 text-white rounded-2xl shadow-2xl shadow-slate-900/20 backdrop-blur-md"
 >
 <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
 <CheckCircle2 size={16} />
 </div>
 <span className="text-sm font-bold tracking-tight">{message}</span>
 <button
 onClick={onClose}
 className="ml-2 p-1 text-slate-400 hover:text-white rounded-lg transition-all"
 >
 <X size={14} />
 </button>
 <div className="absolute bottom-0 left-0 h-1 bg-emerald-500/30 rounded-full animate-toast-progress" style={{ animationDuration: `${duration}ms` }} />
 </motion.div>
 )}
 </AnimatePresence>
 );
};

export default Toast;
