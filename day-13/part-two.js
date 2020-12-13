(() => {
	const input = document.querySelector('pre').innerText.trim().split('\n');

	let timestamp = parseInt(input[0], 10);
	let buses = input[1].split(',').map(i => i !== 'x' ? parseInt(i, 10) : i);

	// max value will be used on first filter and following as increment
	const {i: increment, idx: offsetIndex} = buses.reduce(
		(val, bus, index) => (bus !== 'x' && bus > val.i) ? {i: bus, idx: index} : val,
		{i: buses[0], idx: 0}
	);


	// find the first point where first bus is going in order
	let start = 100000000000000; // due to the task input
	while (start % increment !== 0) {
		start++;
	}

	// Define checkup for cycle
	const isValidCycle = (time, buses) => {
		for (let i = 0; i < buses.length; i++) {
			const bus = buses[i];

			// we are checking after one
			if (bus !== 'x' && (time + i) % bus !== 0) {
				return false;
			}
		}

		return true;
	}

	while (true) {
		console.log('Checking ', start);
		if (isValidCycle(start - offsetIndex, buses)) {
			break;
		}

		start += increment;
	}

	console.log(start - offsetIndex);
})();


/*

Or solve with wolfram Alpha:
Get solutions in a form:
y = 13x - 0;
y = 41x - 3;
y = 37x - 7;
y = 659x - 13;
y = 19x - 32;
y = 23x - 36;
y = 29x - 42;
y = 409x - 44;
y = 17x - 61;

After giving this to Wolfram Alpha, you will get:
y = 939490236001473 + 1145159583560291x, x element of set of whole numbers (Z)

Final solution = f(0) = 939490236001473;
 */
