(() => {
	const input = `16,1,0,18,12,14,19`.trim().split(',').map(i => parseInt(i, 10));

	const numbers = new Map();
	let turn = 1;

	for (const number of input.slice(0, -1)) {
		numbers.set(number, turn++);
	}

	let prevNumber = input[input.length - 1]; // previous number is null

	while (turn < 30000000) {

		let currentNumber;
		if (numbers.has(prevNumber)) {
			currentNumber = turn - numbers.get(prevNumber);
		} else {
			currentNumber = 0;
		}

		numbers.set(prevNumber, turn);

		prevNumber = currentNumber;
		turn++;
	}

	console.log(prevNumber);
})();
