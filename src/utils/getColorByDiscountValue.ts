export function getColorByDiscountValue(discount: string) {
  const discountValue = Number(discount);

  const colorOptions = [
    { value: 75, color: "bg-generic-alertRed" },
    { value: 40, color: "bg-secondary-main" },
    { value: 15, color: "bg-primary-main" },
  ];
  const selectedColor = colorOptions.find(
    ({ value }) => discountValue >= value,
  ) || {
    color: "bg-primary-lighter",
  };
  return selectedColor.color;
}
