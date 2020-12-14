(() => {
	const input = document.querySelector('pre').innerText.trim().split('\n');

	const memory = new Map();
	let mask;

	const applyMask = (number, mask) => {
		const numberParts = number.padStart(mask.length, '0').split('');
		const maskParts = mask.split('');

		for (let i = 0; i < mask.length; i++) {
			switch (maskParts[i]) {
				case '0':
					// don't override
					break;
				case '1':
				case 'X':
					numberParts[i] = maskParts[i];
					break;
			}
		}

		return numberParts.join('');
	}

	const getRealValues = (number) => {
		let values = [number];

		while (/X/.test(values[0])) {
			values = values.reduce((arr, item) => {
				arr.push(item.replace(/X/, '1'));
				arr.push(item.replace(/X/, '0'));

				return arr;
			}, []);
		}

		return values.map(n => parseInt(n, 2));
	}

	for (let command of input) {

		if (command.substring(0, 4) === 'mask') {
			mask = command.split(' = ')[1];
			continue;
		}

		const [, rawLocation, rawValue] = command.match(/mem\[(\d+)\] = (\d+)/);
		const location = parseInt(rawLocation, 10).toString(2).padStart(mask.length, '0');
		let value = parseInt(rawValue, 10);

		const fluctuatingLocation = applyMask(location, mask);

		for (let loc of getRealValues(fluctuatingLocation)) {
			memory.set(loc, value);
		}
	}


	const sum = [...memory.values()].reduce((sum, i) => sum + i, 0);
	console.log(sum);
})();
