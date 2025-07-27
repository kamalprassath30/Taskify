export const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

export const item = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
