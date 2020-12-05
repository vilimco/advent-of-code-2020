/*
Split into 2 dimensional array with strings (seconod dimension is in strings).
Then iterate over that while mod-ing directional values.
*/
(() => {
	const input = document.querySelector('pre').innerText.trim().split('\n');
	let x = 0;
	let y = 0;
	let counter = 0;
	while (x < input.length) {
		if (input[x][y] === '#') {
			counter++;
		}
		x += 1;
		y = (y + 3) % input[0].length;
	}

	console.log(counter);
})();
