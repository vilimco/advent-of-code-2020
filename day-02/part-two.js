/*
Split by spaces and map by positions using substrings.
Finally just check if only one position is valid.
 */
(() => {
	const input = document.querySelector('pre').innerText.trim().split('\n');
	const amount = input.reduce((sum, item) => {
		const [limits, rawChar, target] = item.split(' ');
		const char = rawChar.substring(0, 1);
		const [min, max] = limits.split('-').map(i => parseInt(i, 10));

		if (target[min - 1] === char && target[max - 1] !== char || target[min - 1] !== char && target[max - 1] === char) {
			return sum + 1;
		}
		return sum;
	}, 0);
	console.log(amount);
})();
