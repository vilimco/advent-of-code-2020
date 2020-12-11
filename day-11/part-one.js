(() => {
	const input = document.querySelector('pre').innerText.trim().split('\n').map(row => row.split(''));

	const countNumberOfOccurrencesAroundIndex = (row, col, grid, target) => {
		let occurences = 0;

		for (let i = Math.max(0, row - 1); i < Math.min(grid.length, row + 2); i++) {
			for (let j = Math.max(0, col - 1); j < Math.min(grid[0].length, col + 2); j++) {
				if (i === row && j === col) {
					continue;
				}

				occurences += grid[i][j] === target ? 1 : 0;
			}
		}

		return occurences;
	}

	let currentState = input;
	let changeHappened = false;
	let newState;

	do {
		newState = JSON.parse(JSON.stringify(currentState));
		changeHappened = false;

		for (let row = 0; row < currentState.length; row++) {
			for (let col = 0; col < currentState[0].length; col++) {
				let occupiedSeatsAround;

				switch (currentState[row][col]) {
					case '.': //floor
						// do nothing;
						break;
					case 'L': // free seat
						occupiedSeatsAround = countNumberOfOccurrencesAroundIndex(row, col, currentState, '#');
						if (occupiedSeatsAround === 0) {
							newState[row][col] = '#';
							changeHappened = true;
						}
						break;
					case '#': // free seat
						occupiedSeatsAround = countNumberOfOccurrencesAroundIndex(row, col, currentState, '#');
						if (occupiedSeatsAround >= 4) {
							newState[row][col] = 'L';
							changeHappened = true;
						}
						break;
				}
			}
		}

		currentState = newState;

	} while (changeHappened);

	console.log(
		currentState
			.map(row => row.join(''))
			.join('')
			.replace(/[^#]/g, '')
			.length
	);
})();
