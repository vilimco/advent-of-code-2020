(() => {
	const [rules, myTicket, nearbyTickets] = document.querySelector('pre').innerText.trim().split('\n\n');
	const allLimits = new Map();
	const allValues = new Map();

	for (let rule of rules.split('\n')) {
		const [name, limits] = rule.split(': ');
		const validValues = new Map();
		for (let limit of limits.split(' or ')) {
			let [start, end] = limit.split('-').map(Number);

			for (let i = start; i <= end; i++) {
				validValues.set(i, true);
				allValues.set(i, true);
			}
		}

		allLimits.set(name, validValues);
	}


	const ticketValues = nearbyTickets.split('\n').slice(1);

	const filteredValidTickets = ticketValues.filter((numbers) => {
		return numbers.split(',').map(Number).reduce((valid, num) => {
			return valid && allValues.has(num);
		}, true);
	})
		.map((ticket) => ticket.split(',').map(Number));

	const positions = new Map();
	const maxPositionIndex = filteredValidTickets[0].length;

	for (let key of allLimits.keys()) {
		const availablePositions = [];
		for (let i = 0; i < maxPositionIndex; i++) {
			availablePositions.push(i);
		}

		positions.set(key, availablePositions);
	}

	for (let ticket of filteredValidTickets) {
		for (let index = 0; index < maxPositionIndex; index++) {
			for (let key of positions.keys()) {
				if (!allLimits.get(key).has(ticket[index])) {
					positions.set(key, positions.get(key).filter(i => i !== index));
				}
			}
		}
	}

	let counter = 0;
	do {
		let totalSum = 0;
		for (let key of positions.keys()) {
			if (positions.get(key).length === 1) {
				const filterValue = positions.get(key)[0];

				for (let subKey of positions.keys()) {
					if (subKey === key) {
						continue;
					}

					positions.set(subKey, positions.get(subKey).filter(v => v !== filterValue));
				}
			}

			totalSum += positions.get(key).length;
		}

		if (totalSum === positions.size) {
			break;
		}

	} while (counter++ < 30)

	let sum = 1;
	const myTicketValues = myTicket.split('\n')[1].split(',').map(Number);
	for (let key of positions.keys()) {
		if (!/^departure/.test(key)) {
			continue;
		}

		sum *= myTicketValues[positions.get(key)[0]];
	}

	console.log(sum);
})();
