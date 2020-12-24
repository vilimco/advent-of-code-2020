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

	const blackTiles = new Map();

	for (let rawCommand of commands) {
		const instructions = parseCommand(rawCommand);

		const [x, y] = getFinalLocation(instructions);

		const key = `${x},${y}`;

		if (blackTiles.has(key)) {
			blackTiles.delete(key);
		} else {
			blackTiles.set(key, true);
		}
	}


	console.log('Turned tiles', blackTiles.size);
})();


