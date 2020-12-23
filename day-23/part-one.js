(() => {
	const input = '789465123'.split('').map(Number);

	let cups = [...input];
	let cupIndex = 0;
	for (let i = 0; i < 100; i++) {
		const currentCup = cups[cupIndex];

		let pickedUpCups = cups.splice((cupIndex + 1) % cups.length, 3);
		if (pickedUpCups.length < 3) {
			pickedUpCups = [...pickedUpCups, ...cups.splice(0, 3 - pickedUpCups.length)];
		}

		let targetIndex = cups.indexOf(Math.max(...cups.filter(c => c < currentCup)));
		if (targetIndex === -1) {
			targetIndex = cups.indexOf(Math.max(...cups));
		}
		targetIndex++;

		cups.splice(targetIndex, 0, ...pickedUpCups);
		cupIndex = (cups.indexOf(currentCup) + 1) % cups.length;
	}

	console.log('Final cups', cups.join('').split('1').reverse().join(''));
})();


