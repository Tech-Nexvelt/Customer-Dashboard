"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

/**
 * FibonacciPlane component
 * Animates a paper plane along an approximated Fibonacci spiral path
 * that spans the entire viewport.
 */
export default function FibonacciPlane() {
  // Approximate Fibonacci spiral keyframes
  // We'll use a sequence of points that expand outwards
  const spiralPath = {
    x: [
      "50vw", "60vw", "40vw", "20vw", "70vw", "90vw", "10vw", "50vw"
    ],
    y: [
      "50vh", "40vh", "60vh", "80vh", "20vh", "50vh", "90vh", "50vh"
    ],
    rotate: [
      45, 90, 180, 270, 360, 450, 540, 720
    ],
    scale: [
      0.5, 0.8, 1, 1.2, 0.8, 0.6, 1, 0.5
    ],
    opacity: [
      0, 0.2, 0.3, 0.2, 0.1, 0.2, 0.1, 0
    ]
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        animate={spiralPath}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.1, 0.2, 0.4, 0.6, 0.8, 0.9, 1]
        }}
        className="absolute text-[#2DD4A7]"
        style={{ originX: "50%", originY: "50%" }}
      >
        <Send size={40} className="drop-shadow-[0_0_10px_rgba(45,212,167,0.3)]" />
      </motion.div>

      {/* A second smaller plane with a delay and different path */}
      <motion.div
        animate={{
          x: ["10vw", "80vw", "20vw", "90vw", "50vw"],
          y: ["90vh", "20vh", "50vh", "10vh", "50vh"],
          rotate: [0, 180, 360, 540, 720],
          opacity: [0, 0.15, 0.1, 0.15, 0],
          scale: [0.3, 0.6, 0.4, 0.7, 0.3]
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
          delay: 5
        }}
        className="absolute text-[#2DD4A7]"
      >
        <Send size={24} className="drop-shadow-[0_0_8px_rgba(45,212,167,0.2)]" />
      </motion.div>
    </div>
  );
}
