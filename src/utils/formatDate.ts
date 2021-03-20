const formatDate = (date: Date | null): string => {
  const y = date?.getFullYear();
  const m = `00${date?.getMonth() + 1}`.slice(-2);
  const d = `00${date?.getDate()}`.slice(-2);
  const h = `00${date?.getHours()}`.slice(-2);
  const min = `00${date?.getMinutes()}`.slice(-2);

  return `${y}/${m}/${d} ${h}:${min}` || '　';
};

export default formatDate;
