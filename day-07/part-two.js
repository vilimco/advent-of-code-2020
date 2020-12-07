(() => {
	const rules = document.querySelector('pre').innerText.trim().split('\n');

	const hierarchy = {};

	for (let rule of rules) {
		rule = rule.replace(/ bags?\.?/g, '');
		if (/contain no other$/.test(rule)) {
			const bagName = rule.match(/(.+) contain no other/)[1];
			hierarchy[bagName] = hierarchy[bagName] || {children: {}};
			continue;
		}

		const [bagName, parts] = rule.split(' contain ');
		const parent = hierarchy[bagName] = hierarchy[bagName] || {children: {}};


		for (const childParts of parts.split(', ')) {
			const [amount, ...nameParts] = childParts.split(' ');

			const childName = nameParts.join(' ');
			const child = hierarchy[childName] = hierarchy[childName] || {children: {}};

			parent.children[childName] = parseInt(amount, 10);

		}
	}


	const countChildren = (key) => {
		if (!hierarchy[key] || Object.keys(hierarchy[key].children).length === 0) {
			return 0;
		}

		let sum = 0;

		for (const childName in hierarchy[key].children) {
			sum += hierarchy[key].children[childName] * (countChildren(childName) + 1);
		}


		return sum;
	}


	console.log(countChildren('shiny gold'));
})();

