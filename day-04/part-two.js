/*
Validate with a bunch of Regular Expressions
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


		if (!/^(19[2-9]\d|200[0-2])$/.test(item.byr)) {
			return false;
		}


		if (!/^(201\d|2020)$/.test(item.iyr)) {
			return false;
		}


		if (!/^(202\d|2030)$/.test(item.eyr) || +item.eyr < 2020 || +item.eyr > 2030) {
			return false;
		}

		if (!/^(((59|6\d|7[0-6])in)|1([5-8]\d|9[0-3])cm)$/.test(item.hgt)) {
			return false;
		}

		if (!/^#[a-f0-9]{6}$/.test(item.hcl)) {
			return false;
		}


		if (!/^(amb|blu|brn|gry|grn|hzl|oth)$/.test(item.ecl)) {
			console.log(item.ecl);
			return false;
		}


		if (!/^\d{9}$/.test(item.pid)) {
			return false;
		}

		return true;
	}).filter(i => i).length;
	console.log(validAmount);
})();
