export function getColorByDiscountValue(discount: string) {
  const discountValue = Number(discount);

  const colorOptions = [
    { value: 76, color: "bg-generic-gold" },
    { value: 26, color: "bg-generic-lightGreen" },
  ];
  const selectedColor = colorOptions.find(
    ({ value }) => discountValue >= value,
  ) || {
    color: "bg-generic-lightBlue",
  };
  return selectedColor.color;
}
