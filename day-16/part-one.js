(() => {
	const [rules, myTicket, nearbyTickets] = document.querySelector('pre').innerText.trim().split('\n\n');

	const validValues = new Map();
	for (let rule of rules.split('\n')) {
		for (let limits of rule.split(': ')[1].split(' or ')) {
			let [start, end] = limits.split('-').map(Number);

			for (let i = start; i <= end; i++) {
				validValues.set(i, true);
			}
		}
	}


	const ticketValues = nearbyTickets.split('\n').slice(1);

	const sum = ticketValues.reduce((sum, numbers) => {
		return sum + numbers.split(',').map(Number).reduce((s, num) => {
			if (!validValues.has(num)) {
				return s + num;
			}

			return s;
		}, 0);
	}, 0)

	console.log(sum);
})();
