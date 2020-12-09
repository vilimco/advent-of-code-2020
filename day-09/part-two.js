(() => {
	const input = document.querySelector('pre').innerText.trim().split('\n').map((number) => parseInt(number, 10));

	const preamble = 25;

	const isValidPreambleNumber = (targetValue, currentInput) => {
		for (let i = 0; i < preamble; i++) {
			for (let j = i; j < preamble; j++) {
				if (currentInput[i] + currentInput[j] === targetValue) {
					return true;
				}
			}
		}

		return false;
	}

	let invalidValue = null;
	let indexOfInvalidValue = null;
	let checkList = input.slice(0, preamble);
	for (let k = preamble; k < input.length; k++) {
		const value = input[k];

		if (isValidPreambleNumber(value, checkList)) {
			checkList.push(value);
			checkList = checkList.slice(1);
			continue;
		}

		invalidValue = value;
		indexOfInvalidValue = k;
		break;
	}

	let startCheckIndex = 0;
	let endCheckIndex = 0;
	while (startCheckIndex < indexOfInvalidValue) {
		let sum = input[startCheckIndex];

		endCheckIndex = startCheckIndex + 1;
		while (sum !== invalidValue && endCheckIndex < indexOfInvalidValue) {
			sum += input[endCheckIndex];
			endCheckIndex++;
		}

		if (sum === invalidValue) {
			break;
		}

		startCheckIndex++;
	}

	const sumValues = input
		.slice(startCheckIndex, endCheckIndex)
		.sort((a, b) => a - b);

	console.log(sumValues[0] + sumValues[sumValues.length - 1]);

})();

