(() => {
	const input = document.querySelector('pre').innerText.trim().split('\n').map(row => row.split(''));

	const countNumberOfOccurrencesAroundIndex = (row, col, grid, target) => {
		let occurences = 0;

		let i, j;
		const maxI = grid.length;
		const maxJ = grid[0].length;

		// top left diagonal;
		i = row - 1;
		j = col - 1;
		while (i >= 0 && j >= 0) {
			occurences += grid[i][j] === target ? 1 : 0;
			if (grid[i][j] !== '.') {
				break
			}
			i--;
			j--;
		}
		// top right diagonal;
		i = row - 1;
		j = col + 1;
		while (i >= 0 && j < maxJ) {
			occurences += grid[i][j] === target ? 1 : 0;
			if (grid[i][j] !== '.') {
				break
			}
			i--;
			j++;
		}
		// bottom left diagonal;
		i = row + 1;
		j = col - 1;
		while (i < maxI && j >= 0) {
			occurences += grid[i][j] === target ? 1 : 0;
			if (grid[i][j] !== '.') {
				break
			}
			i++;
			j--;
		}
		// bottom right diagonal;
		i = row + 1;
		j = col + 1;
		while (i < maxI && j < maxJ) {
			occurences += grid[i][j] === target ? 1 : 0;
			if (grid[i][j] !== '.') {
				break
			}
			i++;
			j++;
		}

		// straight up;
		i = row - 1;
		j = col;
		while (i >= 0) {
			occurences += grid[i][j] === target ? 1 : 0;
			if (grid[i][j] !== '.') {
				break
			}
			i--;
		}
		// straight down;
		i = row + 1;
		j = col;
		while (i < maxI) {
			occurences += grid[i][j] === target ? 1 : 0;
			if (grid[i][j] !== '.') {
				break
			}
			i++;
		}
		// straight left;
		i = row;
		j = col - 1;
		while (j >= 0) {
			occurences += grid[i][j] === target ? 1 : 0;
			if (grid[i][j] !== '.') {
				break
			}
			j--;
		}
		// straight right;
		i = row;
		j = col + 1;
		while (j < maxJ) {
			occurences += grid[i][j] === target ? 1 : 0;
			if (grid[i][j] !== '.') {
				break
			}
			j++;
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
						if (occupiedSeatsAround >= 5) {
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
