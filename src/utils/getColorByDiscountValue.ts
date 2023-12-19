export function getColorByDiscountValue(discount: string) {
  const discountValue = Number(discount);
  
  const colorOptions = [
    { value: 50, color: "bg-generic-alertRed" },
    { value: 40, color: "bg-secondary-dark" },
    { value: 30, color: "bg-secondary-main" },
    { value: 25, color: "bg-secondary-light" },
    { value: 15, color: "bg-primary-dark" },
    { value: 5, color: "bg-primary-main" },
  ];
  const selectedColor = colorOptions.find(({ value }) => discountValue >= value) || {
    color: "bg-primary-light",
  };
  return selectedColor.color;
}
