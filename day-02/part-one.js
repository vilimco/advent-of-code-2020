/*
Split by spaces and map by positions using substrings.
Clean target with Regex and compare the length between original target and and new one (difference of removed keys).

Proposed other solution: replace with regex everything that is not char and just read that length as a difference (only
the char values will remain in cleaned target).
 */
(() => {
	const input = document.querySelector('pre').innerText.trim().split('\n');
	const amount = input.reduce((sum, item) => {
		const [limits, rawChar, target] = item.split(' ');
		const char = rawChar.substring(0, 1);
		const [min, max] = limits.split('-').map(i => parseInt(i, 10));
		const length = target.length - target.replace(new RegExp(`${char}`, 'g'), '').length;

		if (length >= min && length <= max) {
			return sum + 1;
		}
		return sum;
	}, 0);
	console.log(amount);
})();
