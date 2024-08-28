export function getColorByDiscountValue(discount: string): string {
	const discountValue: number = Number(discount);

	const colorOptions: { value: number; color: string }[] = [
		{ value: 76, color: "bg-generic-electricGold" }, // #FFDF00
		{ value: 51, color: "bg-generic-gold" }, // #FFD700
		{ value: 26, color: "bg-generic-limeGreen" }, // #32CD32
	];

	const selectedColor = colorOptions.find(
		({ value }) => discountValue >= value,
	) || { color: "text-generic-skyBlue border-generic-skyBlue" };

	return selectedColor.color;
}
