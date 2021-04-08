export const PageVariants = {
  start: { opacity: 0 },
  stop: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};
