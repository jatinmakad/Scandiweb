export const currencyFormatter = (currency, amount) => {
  return new Intl.NumberFormat("en-au" | "ru-md", {
    style: "currency",
    currency: currency,
  }).format(amount);
};