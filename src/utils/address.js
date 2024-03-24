
export const getAddress8 = (address) => {
  if (address == null || address === "") return address;
  else
    return (
      address.substring(0, 4) +
      "..." +
      address.substring(address.length - 4, address.length)
    );
};
export const getAddress16 = (address) => {
  if (address == null || address === "") return address;
  else
    return (
      address.substring(0, 4) +
      "..." +
      address.substring(address.length - 4, address.length)
    );
};
