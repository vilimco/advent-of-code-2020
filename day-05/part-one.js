/*
Use binary replacements and calculate the rest with that.
 */
(() => {
	const dataInput = document.querySelector('pre').innerText.trim().split('\n');

	const max = dataInput.reduce((max, value) => {
		const currentValue = parseInt(
			value
				.replace(/[FL]/g, '0')
				.replace(/[BR]/g, '1'),
			2
		);

		return max > currentValue ? max : currentValue;
	}, -Infinity);

	console.log(max);
})();
