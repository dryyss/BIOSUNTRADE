import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

type BaseProps = {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
};

type InputProps = BaseProps & {
  type?: string;
};

export function FloatingInput({ name, label, type = 'text', required, className }: InputProps) {
  const [value, setValue] = useState('');
  const filled = value.trim().length > 0;
  return (
    <div className={`relative ${className ?? ''}`}>
      <input
        name={name}
        type={type}
        required={required}
        placeholder=" "
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="peer w-full px-4 py-3 rounded-md border border-white/20 bg-transparent text-white placeholder-transparent focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition"
      />
      <label
        className="pointer-events-none absolute left-3 top-3 px-1 text-white/60 bg-transparent transition-all duration-200
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/60
        peer-focus:-top-3 peer-focus:text-xs peer-focus:text-brand-yellow
        peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs"
      >
        {label}
      </label>
      <AnimatePresence>
        {filled && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute right-2 top-3 text-brand-green"
          >
            <FiCheckCircle />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

type TextAreaProps = BaseProps & {
  rows?: number;
};

export function FloatingTextarea({ name, label, required, rows = 4, className }: TextAreaProps) {
  const [value, setValue] = useState('');
  const filled = value.trim().length > 0;
  return (
    <div className={`relative ${className ?? ''}`}>
      <textarea
        name={name}
        required={required}
        placeholder=" "
        rows={rows}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="peer w-full px-4 py-3 rounded-md border border-white/20 bg-transparent text-white placeholder-transparent focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition"
      />
      <label
        className="pointer-events-none absolute left-3 top-3 px-1 text-white/60 transition-all duration-200
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/60
        peer-focus:-top-3 peer-focus:text-xs peer-focus:text-brand-yellow
        peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs"
      >
        {label}
      </label>
      <AnimatePresence>
        {filled && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute right-2 top-3 text-brand-green"
          >
            <FiCheckCircle />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}



