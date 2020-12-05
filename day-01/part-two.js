/*
Just brute force for the solution with three for loops.

Different solution as a proposal: recursion with level depth and target value
 */
(() => {
	const data = document.querySelector('pre').innerText.trim().split('\n').map((i) => parseInt(i));

	for (let i = 0; i < data.length; i++) {
		for (let j = i; j < data.length; j++) {
			for (let k = j; k < data.length; k++) {
				const x = data[i];
				const y = data[j];
				const z = data[k];
				if (x + y + z === 2020) {
					console.log(x * y * z);
				}
			}
		}
	}
})();
