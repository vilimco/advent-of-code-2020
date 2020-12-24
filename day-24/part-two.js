(() => {
	const commands = document.querySelector('pre').innerText.trim().split('\n');

	const parseCommand = (command) => {
		const commands = [];

		const parts = command.split('');
		for (let i = 0; i < parts.length; i++) {
			let instruction = parts[i];

			if (instruction === 's' || instruction === 'n') {
				instruction += parts[i + 1];
				i++;
			}

			commands.push(instruction);
		}

		return commands;
	}

	const getKey = (x, y) => `${x},${y}`;

	const getFinalLocation = (instructions) => {
		let x = 0;
		let y = 0;

		for (let instruction of instructions) {
			switch (instruction) {
				case 'e':
					x -= 2;
					break;
				case 'w':
					x += 2;
					break;

				case 'ne':
					x -= 1;
					y += 1;
					break;
				case 'nw':
					x += 1;
					y += 1;
					break;

				case 'se':
					x -= 1;
					y -= 1;
					break;
				case 'sw':
					x += 1;
					y -= 1;
					break;
			}
		}

		return [x, y];
	}

	let blackTiles = new Map();

	for (let rawCommand of commands) {
		const instructions = parseCommand(rawCommand);

		const [x, y] = getFinalLocation(instructions);

		const key = getKey(x, y);

		if (blackTiles.has(key)) {
			blackTiles.delete(key);
		} else {
			blackTiles.set(key, true);
		}
	}

	const getNeighbours = (key) => {
		const [x, y] = key.split(',').map(Number);
		return [
			getKey(x + 2, y),
			getKey(x - 2, y),
			getKey(x + 1, y + 1),
			getKey(x - 1, y + 1),
			getKey(x + 1, y - 1),
			getKey(x - 1, y - 1),
		];
	}
	const getNumberAdjacentBlacks = (key, tiles) => {
		const neighbours = getNeighbours(key);

		let amount = 0;

		for (let neighbour of neighbours) {
			amount += tiles.has(neighbour) ? 1 : 0;
		}

		return amount;
	}

	const getAdjacentWhiteTiles = (key, tiles) => {
		const neighbours = getNeighbours(key);

		return neighbours.filter((tile) => !tiles.has(tile));
	}

	const days = 100;
	for (let i = 0; i < days; i++) {
		const newBlackTiles = new Map();
		const listOfBlackTiles = [...blackTiles.keys()];

		for (let blackTile of listOfBlackTiles) {
			// check black tiles
			const neighbouringBlacks = getNumberAdjacentBlacks(blackTile, blackTiles);
			if (neighbouringBlacks === 1 || neighbouringBlacks === 2) {
				newBlackTiles.set(blackTile, true);
			}

			for (let whiteTile of getAdjacentWhiteTiles(blackTile, blackTiles)) {
				const neighbouringBlacks = getNumberAdjacentBlacks(whiteTile, blackTiles);
				if (neighbouringBlacks === 2) {
					newBlackTiles.set(whiteTile, true);
				}
			}
		}

		blackTiles = newBlackTiles;
	}


	console.log('Turned tiles', blackTiles.size);
})();


