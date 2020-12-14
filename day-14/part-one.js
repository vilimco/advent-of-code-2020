(() => {
	const input = document.querySelector('pre').innerText.trim().split('\n');
// 	const input = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
// mem[8] = 11
// mem[7] = 101
// mem[8] = 0`.trim().split('\n');

	const memory = new Map();
	let mask;

	const binaryOr = (number, mask) => {
		const numberParts = number.padStart(mask.length, '0').split('');
		const maskParts = mask.split('');

		for (let i = 0; i < mask.length; i++) {
			numberParts[i] = (parseInt(numberParts[i], 2) | parseInt(maskParts[i], 2)).toString(2);
		}

		return numberParts.join('');
	}

	const binaryAnd = (number, mask) => {
		const numberParts = number.padStart(mask.length, '0').split('');
		const maskParts = mask.split('');

		for (let i = 0; i < mask.length; i++) {
			numberParts[i] = (parseInt(numberParts[i], 2) & parseInt(maskParts[i], 2)).toString(2);
		}

		return numberParts.join('');
	}

	for (let command of input) {

		if (command.substring(0, 4) === 'mask') {
			mask = command.split(' = ')[1];
			continue;
		}

		const [, rawLocation, rawValue] = command.match(/mem\[(\d+)\] = (\d+)/);
		const location = parseInt(rawLocation, 10);
		let value = parseInt(rawValue, 10).toString(2).padStart(mask.length, '0');


		// for large numbers (> 2^32) it began to cast to floats, thus changing binary value (and started getting negative numbers)
		// why, not sure right now, will investigate
		// lets work with strings instead

		// clear for 0s
		value = binaryAnd(value, mask.replace(/X/g, 1));
		// clear for 1s
		value = binaryOr(value, mask.replace(/X/g, 0));

		memory.set(location, value);
	}


	const sum = [...memory.values()].reduce((sum, i) => sum + parseInt(i, 2), 0);
	console.log(sum);
})();
