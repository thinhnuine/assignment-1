export function getQuantityInCart(listCart) {
  if (!listCart || !Array.isArray(listCart) || listCart.length === 0) return 0;

  return listCart.reduce((total, current) => {
    total += current.quantity

    return total
  }, 0)
}

export const formatCurrencyInVnd = (number) => {
  return Math.round(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};