export function SearchProduct(searchText, data) {
  return data.filter((item) => {
    return item.name?.toLowerCase()?.includes(searchText.toLowerCase());
  });
}
