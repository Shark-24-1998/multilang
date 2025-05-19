'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AnimatedImage() {
  return (
    <motion.div
      animate={{ y: [0, -15, 0] }} // float up and down
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Image
        src="/images/main-image.png"
        alt="Tailwind CSS Components"
        width={500}
        height={500}
        priority
      />
    </motion.div>
  );
}
