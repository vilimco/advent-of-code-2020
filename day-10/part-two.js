(() => {
	const input = document.querySelector('pre').innerText.trim().split('\n').map((number) => parseInt(number, 10)).sort((a, b) => a - b);

	const groups = [];
	let group = [0, input[0]];

	for (let i = 1; i < input.length; i++) {

		const diff = input[i] - input[i - 1];

		if (diff === 3) {
			groups.push(group);
			group = [];
		}

		group.push(input[i]);
	}

	groups.push(group);

	const getGroupCombinations = (group) => {
		if (group.length === 0) {
			return 0;
		}

		if (group.length <= 2) {
			return 1;
		}

		return getGroupCombinations(group.slice(1)) +
			getGroupCombinations(group.slice(2)) +
			getGroupCombinations(group.slice(3))
			;
	}

	const sum = groups.reduce((sum, group) => {
		const value = getGroupCombinations(group);
		return sum * value;
	}, 1);
	console.log(groups, sum);
})();
