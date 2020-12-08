(() => {
	const commands = document.querySelector('pre').innerText.trim().split('\n').map((rawCommand) => {
		const [cmd, rawValue] = rawCommand.trim().split(' ');

		return {cmd, number: parseInt(rawValue, 10)};
	});

	const getAccumulatedValue = (commands) => {
		let acc = 0;
		let pointer = 0;
		let visited = {};
		let loopCounter = 0;

		while (true) {
			if (visited[pointer]) {
				throw new Error('Infinite loop');
			}

			if (pointer < 0 || pointer >= commands.length) {
				throw new Error('Invalid pointer');
			}

			visited[pointer] = true;
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

			if (pointer === commands.length) {
				break;
			}
		}

		return acc;
	}

	for (let i = 0; i < commands.length; i++) {
		if (commands[i].cmd !== 'jmp') {
			continue;
		}

		const cmds = JSON.parse(JSON.stringify(commands));
		cmds[i].cmd = 'nop';

		try {
			const acc = getAccumulatedValue(cmds);
			console.log(acc);
			break;
		} catch (e) {
			console.log(`Error on ${i}`, e.message);
		}
	}

})();

