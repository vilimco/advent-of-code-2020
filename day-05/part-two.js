/*
Use binary replacements and calculate the rest with that.
 */
(() => {
	const dataInput = document.querySelector('pre').innerText.trim().split('\n');

	const allSeats = dataInput
		.map(
			(value) => parseInt(
				value
					.replace(/[FL]/g, '0')
					.replace(/[BR]/g, '1'),
				2
			)
		).sort((f, s) => f - s);

	let target = allSeats[0];

	for (const id of allSeats) {
		if (id !== target) {
			console.log(`Missing id ${target}, found ${id}`);
			target = id;
		}

		target++;
	}
})();
