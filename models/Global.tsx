const generateArray = (component: React.ReactNode, count: number) => {
  return Array.from({length: count}, () => component);
};

export {generateArray};
