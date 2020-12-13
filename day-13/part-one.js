(() => {
	const input = document.querySelector('pre').innerText.trim().split('\n');

	let timestamp = parseInt(input[0], 10);
	const buses = input[1].split(',').filter(bus => bus !== 'x').sort((a, b) => a - b);

	let bus;
	let time = timestamp;

	while (true) {
		const matchedBus = buses.reduce((match, bus) => {
			if (match !== null) {
				return match;
			}

			return time % bus === 0 ? bus : null;
		}, null);

		if (matchedBus !== null) {
			bus = matchedBus;
			break;
		}

		time++;
	}

	console.log(`Start time: ${timestamp}, end time: ${time}`);
	console.log("Bus: ", bus);
	console.log("Result: ", bus * (time - timestamp));

})();
