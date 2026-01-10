import { motion } from "framer-motion";

export default function SplitText({ text, className = "", delay = 0 }) {
  // Dividimos el texto en un array de letras
  const letters = text.split("");

  // Configuración del contenedor (controla el tiempo entre letras)
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Tiempo entre cada letra
        delayChildren: 0.1 * i + delay,
      },
    }),
  };

  // Configuración de cada letra (movimiento y opacidad)
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 20, // Empieza 20px abajo
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "inline-block" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ display: "inline-block" }}
        >
          {/* Si es un espacio, usamos un espacio "no rompible" para que no se colapse */}
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
