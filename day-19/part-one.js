(() => {
	const [rawRules, rawWords] = document.querySelector('pre').innerText.trim().split('\n\n');

	const rules = new Map();
	for (let rawRule of rawRules.split('\n')) {
		let [id, rule] = rawRule.split(': ');
		id = parseInt(id, 10);

		if (rule[0] === '"') {
			rule = rule.substr(1, 1);
		} else {
			rule = rule.split(' ');
		}

		rules.set(id, rule);
	}

	while (true) {
		let hadChange = false;

		for (let key of rules.keys()) {
			let rule = rules.get(key);
			if (!Array.isArray(rule)) {
				continue;
			}

			const replacementKey = rule.reduce((key, item) => {
				if (key !== null) {
					return key;
				}

				if (/\d+/.test(item)) {
					return item;
				}

				return key;
			}, null);

			let replacementRule = rules.get(parseInt(replacementKey, 10));

			if (Array.isArray(replacementRule)) {
				continue;
			}

			rule = rule.map((item) => {
				if (item !== replacementKey) {
					return item;
				}

				// console.log("replacing", item, replacementRule, rule)
				return replacementRule;
			});

			if (!/\d/.test(rule.join(''))) {
				rule = `(${rule.join('')})`;
			}

			hadChange = true;
			rules.set(key, rule);
		}

		if (!hadChange) {
			break;
		}
	}

	const regex = `^${rules.get(0)}$`;

	const matches = rawWords.split('\n').reduce((sum, word) => {
		return sum + ((new RegExp(regex)).test(word) ? 1 : 0)
	}, 0);

	console.log(matches);
})();
