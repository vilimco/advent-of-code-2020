/*
Split groups by \n\n and the iterate through group answers to find answers intersections
 */
(() => {
	const groups = document.querySelector('pre').innerText.trim().split('\n\n');

	const answersPerGroups = groups.map((group) => {
		const oneSheetAnswers = group.split('\n').map((row) => row.split(''));

		let sharedAnswers = oneSheetAnswers[0];

		for (const answers of oneSheetAnswers) {
			sharedAnswers = sharedAnswers.filter(a => answers.includes(a));
		}

		return sharedAnswers.length;
	});

	const totalAnswers = answersPerGroups.reduce((sum, item) => sum + item, 0);
	console.log(totalAnswers);

})();

