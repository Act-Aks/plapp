export const formatIndianCurrency = (amount: number): string => {
  // Convert to string with 2 decimal places
  const [wholePart, decimalPart] = amount.toFixed(2).split(".");

  // Format the whole part with Indian number system
  const lastThree = wholePart.substring(wholePart.length - 3);
  const otherNumbers = wholePart.substring(0, wholePart.length - 3);
  const formatted =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
    (otherNumbers ? "," : "") +
    lastThree;

  // Return formatted string with rupee symbol
  return `₹${formatted}.${decimalPart}`;
};
