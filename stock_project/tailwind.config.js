// tailwind.config.js
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
	  extend: {
		fontFamily: {
		  mono: ['Roboto Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
		},
		keyframes: {
		  fadeIn: {
			from: { opacity: '0', transform: 'scale(0.95)' },
			to: { opacity: '1', transform: 'scale(1)' },
		  },
		},
		animation: {
		  'fade-in': 'fadeIn 0.2s ease-out',
		},
	  },
	},
	plugins: [],
  };
  