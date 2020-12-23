(() => {
	const input = '789465123'.split('').map(Number);

	let currentCup = {id: input[0], next: null};

	const cupMap = new Map();
	cupMap.set(currentCup.id, currentCup);

	let cups = [...input].slice(1);
	let prevCup = currentCup;
	for (let cupId of cups) {
		const cup = {id: cupId, next: null};
		prevCup.next = cup;

		cupMap.set(cupId, cup);

		prevCup = cup;
	}

	for (let i = 10; i <= 1000000; i++) {
		const cup = {id: i, next: null};
		prevCup.next = cup;

		cupMap.set(i, cup);

		prevCup = cup;
	}

	prevCup.next = currentCup;
	const maxIndex = 1000000;

	const iterations = 10000000;
	for (let i = 0; i < iterations; i++) {

		// Pickup cups
		const firstPickup = currentCup.next;
		const lastPickup = currentCup.next.next.next;

		// close removed cups
		currentCup.next = lastPickup.next;

		let destinationCup = null;
		let destinationIndex = currentCup.id - 1;
		while (true) {
			if (![
					firstPickup.id,
					firstPickup.next.id,
					firstPickup.next.next.id
				].includes(destinationIndex)
				&&
				destinationIndex > 0
			) {
				destinationCup = cupMap.get(destinationIndex);
				break;
			}

			destinationIndex -= 1;
			if (destinationIndex <= 0) {
				destinationIndex = maxIndex;
			}
		}

		// connect in new chain
		const finalConnection = destinationCup.next;
		destinationCup.next = firstPickup;
		lastPickup.next = finalConnection;

		currentCup = currentCup.next;
	}

	const cupOne = cupMap.get(1);

	console.log("Final: ", cupOne.next.id * cupOne.next.next.id);
})();


