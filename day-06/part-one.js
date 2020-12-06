/*
Split groups by \n\n and the iterate through group answers to find answers unions (through Set)
 */
(() => {
	const groups = document.querySelector('pre').innerText.trim().split('\n\n');

	const answersPerGroups = groups.map((group) => {
		return (new Set(group.replace(/\s/g, '').split(''))).size;
	});

	const totalAnswers = answersPerGroups.reduce((sum, item) => sum + item, 0);
	console.log(totalAnswers);

})();

