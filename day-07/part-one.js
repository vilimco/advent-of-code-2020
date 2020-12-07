(() => {
	const rules = document.querySelector('pre').innerText.trim().split('\n');

	const hierarchy = {};

	for (let rule of rules) {
		rule = rule.replace(/ bags?\.?/g, '');
		if (/contain no other$/.test(rule)) {
			const bagName = rule.match(/(.+) contain no other/)[1];
			hierarchy[bagName] = hierarchy[bagName] || {parents: []};
			continue;
		}

		const [bagName, parts] = rule.split(' contain ');
		const parent = hierarchy[bagName] = hierarchy[bagName] || {parents: []};


		for (const childParts of parts.split(', ')) {
			const [amount, ...nameParts] = childParts.split(' ');

			const childName = nameParts.join(' ');
			const child = hierarchy[childName] = hierarchy[childName] || {parents: []};

			child.parents.push({name: bagName, amount: parseInt(amount, 10)});

		}
	}

	const uniqueColors = new Set();
	const countParents = (key) => {
		if (!hierarchy[key] || hierarchy[key].parents.length === 0) {
			return;
		}

		for (const parent of hierarchy[key].parents) {
			uniqueColors.add(parent.name);
			countParents(parent.name);
		}
	}
	countParents('shiny gold');
	console.log(uniqueColors.size);

})();

