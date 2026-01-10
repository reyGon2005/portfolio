import { motion } from "framer-motion";

export default function GradientText({ children, className = "" }) {
  return (
    <span className={`position-relative d-inline-block ${className}`}>
      <motion.span
        style={{
          // Degradado: Azul Claro -> Beige -> Azul Medio -> Azul Claro
          backgroundImage:
            "linear-gradient(to right, #94B4C1, #EAE0CF, #547792, #94B4C1)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        animate={{ backgroundPosition: ["0% center", "200% center"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        {children}
      </motion.span>
    </span>
  );
}
