/*
Split into 2 dimensional array with strings (seconod dimension is in strings).
Then iterate over that while mod-ing directional values.
 */
(() => {
	const dataInput = document.querySelector('pre').innerText.trim().split('\n');

	const moveFunction = (input, xMove, yMove) => {
		let x = 0;
		let y = 0;
		let counter = 0;
		while (x < input.length) {
			if (input[x][y] === '#') {
				counter++;
			}
			x += xMove;
			y = (y + yMove) % input[0].length;

		}
		return counter;
	}

	console.log(
		moveFunction(dataInput, 1, 1) *
		moveFunction(dataInput, 1, 3) *
		moveFunction(dataInput, 1, 5) *
		moveFunction(dataInput, 1, 7) *
		moveFunction(dataInput, 2, 1)
	);
})();
