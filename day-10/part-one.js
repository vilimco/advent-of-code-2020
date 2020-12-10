(() => {
	const input = document.querySelector('pre').innerText.trim().split('\n').map((number) => parseInt(number, 10)).sort((a, b) => a - b);


	const diff = new Map();
	diff.set(3, 1); // for the end solution

	let maxAdapter = input[0];

	diff.set(input[0], (diff.has(input[0]) ? diff.get(input[0]) : 0) + 1);

	for (let i = 1; i < input.length; i++) {
		maxAdapter = Math.max(maxAdapter, input[i]);

		const key = input[i] - input[i - 1];

		const currentValue = diff.has(key) ? diff.get(key) : 0;
		diff.set(key, currentValue + 1);
	}


	console.log(diff.get(1) * diff.get(3));

})();

