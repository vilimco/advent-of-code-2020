(() => {
	const commands = document.querySelector('pre').innerText.trim().split('\n');

	const getDirectionMovements = (direction, amount) => {
		switch (direction) {
			case 'E':
				return {x: amount, y: 0};
			case 'S':
				return {x: 0, y: -amount};
			case 'W':
				return {x: -amount, y: 0};
			case 'N':
				return {x: 0, y: amount};
		}
	}

	const directions = ['E', 'S', 'W', 'N'];
	let direction = 0;
	let x = 0;
	let y = 0;

	for (const command of commands) {
		const amount = parseInt(command.substr(1), 10);

		switch (command[0]) {
			case 'R':
				direction = (direction + amount / 90) % directions.length;
				break;
			case 'L':
				direction = (direction + directions.length - amount / 90) % directions.length;
				break;
			case 'F':
				let {x: fx, y: fy} = getDirectionMovements(directions[direction], amount);
				x += fx;
				y += fy;
				break;
			case 'E':
			case 'S':
			case 'W':
			case 'N':
				let {x: dx, y: dy} = getDirectionMovements(command[0], amount);
				x += dx;
				y += dy;
				break;
		}
	}

	console.log(Math.abs(x) + Math.abs(y));


})();
