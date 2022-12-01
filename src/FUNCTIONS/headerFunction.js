export const handleActiveHeader = (target_id, setActiveHeader) => {
  setActiveHeader((prev) => (prev === target_id ? -1 : target_id));
};
