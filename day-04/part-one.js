/*
Consider this as a Validator file and add a method by method checkup for part 2
 */
(() => {
	const dataInput = document.querySelector('pre').innerText.trim().split('\n\n').map((i) => i.split(/\s/));
	const mapData = dataInput.map((items) => {
		return items.reduce((map, item) => {
			const [key, value] = item.split(':');
			map[key] = value;
			return map;
		}, {});
	});

	const validAmount = mapData.map((item) => {
		const hasRequiredKeys = ['byr',
			'iyr',
			'eyr',
			'hgt',
			'hcl',
			'ecl',
			'pid',
		].reduce((valid, key) => valid && item.hasOwnProperty(key), true);

		if (!hasRequiredKeys) {
			return false;
		}
		return true;
	}).filter(i => i).length;
	console.log(validAmount);
})();
