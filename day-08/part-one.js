(() => {
	const commands = document.querySelector('pre').innerText.trim().split('\n').map((rawCommand) => {
		const [cmd, rawValue] = rawCommand.trim().split(' ');

		return {cmd, number: parseInt(rawValue, 10)};
	});

	let acc = 0;
	let pointer = 0;
	let visited = {};
	let loopCounter = 0;

	while (true) {
		if (visited[pointer]) {
			break;
		}

		visited[pointer] = loopCounter;
		loopCounter++;

		const {cmd, number} = commands[pointer];

		switch (cmd) {
			case 'acc':
				acc += number;
				pointer += 1;
				break;
			case 'nop':
				pointer += 1;
				break;
			case 'jmp':
				pointer += number;
				break;
			default:
			// do nothing
		}
	}

	console.log(loopCounter - visited[pointer] - 1);
	console.log(acc);


})();

