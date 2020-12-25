(() => {
	const [cardKey, doorKey] = document.querySelector('pre').innerText.trim().split('\n').map(Number);

	const getLoopStep = (subjectNumber, targetNumber) => {
		let value = 1;
		let step = 0;
		const divider = 20201227;

		while (true) {
			if (value === targetNumber) {
				return step;
			}

			step++;
			value = value * subjectNumber % divider;
		}
	}

	const loop = (subjectNumber, stepSize) => {
		let value = 1;
		const divider = 20201227;

		for (let i = 0; i < stepSize; i++) {
			value = value * subjectNumber % divider;
		}
		return value;
	}

	let cardStepSize = getLoopStep(7, cardKey);

	const encryptionKey = loop(doorKey, cardStepSize);
	console.log(encryptionKey);
})();


