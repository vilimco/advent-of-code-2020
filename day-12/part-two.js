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

	// https://stackoverflow.com/questions/28112315/how-do-i-rotate-a-vector
	const rotate = function (vector, angle) {
		angle = -angle * (Math.PI / 180);
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		return [
			Math.round(10000 * (vector[0] * cos - vector[1] * sin)) / 10000,
			Math.round(10000 * (vector[0] * sin + vector[1] * cos)) / 10000
		];
	};

	let shipX = 0;
	let shipY = 0;

	let waypointX = 10;
	let waypointY = 1;


	for (const command of commands) {
		const amount = parseInt(command.substr(1), 10);

		switch (command[0]) {
			case 'R':
				let [rx, ry] = rotate([waypointX, waypointY], amount);
				waypointX = rx;
				waypointY = ry;
				break;
			case 'L':
				let [lx, ly] = rotate([waypointX, waypointY], -amount);
				waypointX = lx;
				waypointY = ly;
				break;
			case 'F':
				shipX += amount * waypointX;
				shipY += amount * waypointY;
				break;
			case 'E':
			case 'S':
			case 'W':
			case 'N':
				let {x: dx, y: dy} = getDirectionMovements(command[0], amount);
				waypointX += dx;
				waypointY += dy;
				break;
		}
	}

	console.log(Math.abs(shipX) + Math.abs(shipY));

})();
