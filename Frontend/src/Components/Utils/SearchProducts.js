export const searchProducts = (products, searchTerm) => {
  if (!searchTerm.trim()) return [];

  const term = searchTerm.toLowerCase();

  return products.filter((product) => {
    return (
      product.name.toLowerCase().includes(term) ||
      (product.description &&
        product.description.toLowerCase().includes(term)) ||
      (product.summery && product.summery.toLowerCase().includes(term))
    );
  });
};
