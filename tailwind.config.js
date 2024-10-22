const defaultTheme = require("tailwindcss/defaultTheme");

// Custom color with css variable color in __theme_color.scss
function customColors(cssVar) {
	return ({ opacityVariable, opacityValue }) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${cssVar}), ${opacityValue})`;
		}
		if (opacityVariable !== undefined) {
			return `rgba(var(${cssVar}), var(${opacityVariable}, 1))`;
		}
		return `rgb(var(${cssVar}))`;
	};
}

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class", // or 'media' or 'class',
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
				xl: "40px",
				"2xl": "128px",
			},
		},

		extend: {
			colors: {
				primary: {
					main: customColors("--primary-easytolive"),
					dark: customColors("--primary-easytolive-dark"),
					light: customColors("--primary-easytolive-light"),
					lighter: customColors("--primary-easytolive-lighter"),
					extraLighter: customColors("--primary-easytolive-extralighter"),
				},
				secondary: {
					main: customColors("--secondary-easytolive"),
					light: customColors("--secondary-easytolive-light"),
					lighter: customColors("--secondary-easytolive-lighter"),
					dark: customColors("--secondary-easytolive-dark"),
				},
				neutral: {
					50: customColors("--neutral-50"),
					100: customColors("--neutral-100"),
					200: customColors("--neutral-200"),
					300: customColors("--neutral-300"),
					400: customColors("--neutral-400"),
					500: customColors("--neutral-500"),
					600: customColors("--neutral-600"),
					700: customColors("--neutral-700"),
					800: customColors("--neutral-800"),
					900: customColors("--neutral-900"),
				},
				generic: {
					alertGreen: customColors("--generic-easytolive-green"),
					alertGreenLight: customColors("--generic-easytolive-green-light"),
					alertGreenLigther: customColors("--generic-easytolive-green-lighter"),
					alertRed: customColors("--generic-easytolive-red"),
					alertYellow: customColors("--generic-easytolive-yellow"),
					dark: customColors("--generic-dark"),
					blue: customColors("--generic-easytolive-blue"),
					background: customColors("--generic-easytolive-bg"),
					backgroundLighter: customColors("--generic-easytolive-bg-lighter"),
					grayLighter: customColors("--generic-bg-gray-lighter"),
					gray: customColors("--generic-bg-gray"),
					grayDarker: customColors("--generic-bg-gray-darker"),
					lightBlue: customColors("--generic-light-blue"),
					lightGreen: customColors("--generic-light-green"),
					gold: customColors("--generic-gold"),
					skyBlue: customColors("--generic-sky-blue"),
					limeGreen: customColors("--generic-lime-green"),
					electricGold: customColors("--generic-electric-gold"),
					tomatoRed: customColors("--generic-tomato-red"),
					dark2: customColors("--generic-dark2"),
				},
				main: {
					gray: "#383839",
					purple: "#4D1ABF",
				},
			},
		},
		keyframes: {
			scroll: {
				"0%": { transform: "translateX(0)" },
				"100%": { transform: "translateX(-100%)" },
			},
		},
		animation: {
			scroll: "scroll 30s linear infinite",
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/aspect-ratio"),
	],
};
