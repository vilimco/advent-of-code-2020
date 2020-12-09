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

	let checkList = input.slice(0, preamble);
	for (let k = preamble; k < input.length; k++) {
		const value = input[k];

		if (isValidPreambleNumber(value, checkList)) {
			checkList.push(value);
			checkList = checkList.slice(1);
			continue;
		}

		console.log('invalid value', value);
		break;
	}
})();

