export function getColorByDiscountValue(discount: string): string {
  const discountValue: number = Number(discount);

  const colorOptions: { value: number; color: string }[] = [
    { value: 76, color: "bg-generic-electricGold" },
    { value: 51, color: "bg-generic-gold" },
    { value: 26, color: "bg-generic-limeGreen" },
  ];

  const selectedColor = colorOptions.find(
    ({ value }) => discountValue >= value,
  ) || { color: "bg-generic-skyBlue" };

  return selectedColor.color;
}
