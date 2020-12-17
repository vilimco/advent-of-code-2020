(() => {
	const input = document.querySelector('pre').innerText.trim().split('\n').map((row) => row.split(''));

	const cycles = 6;

	const getKey = (x, y, z) => `${x},${y},${z}`;

	let activeSpace = new Map();

	for (let x = 0; x < input.length; x++) {
		for (let y = 0; y < input.length; y++) {
			if (input[x][y] === '#') {
				activeSpace.set(getKey(x, y, 0), 1);
			}
		}
	}

	const countActiveSpacesAround = (xStart, yStart, zStart, activeSpace) => {
		let sum = 0;

		for (let z = zStart - 1; z < zStart + 2; z++) {
			for (let x = xStart - 1; x < xStart + 2; x++) {
				for (let y = yStart - 1; y < yStart + 2; y++) {
					if (x === xStart && y === yStart && z === zStart) {
						continue;
					}

					sum += activeSpace.has(getKey(x, y, z)) ? 1 : 0;
				}
			}
		}

		return sum;
	}

	const cycleExpansion = 2 * cycles;
	const xSize = input.length;
	const ySize = input.length;

	for (let cycle = 0; cycle < cycles; cycle++) {
		const newSpace = new Map(activeSpace);

		for (let x = -cycleExpansion; x < xSize + cycleExpansion; x++) {
			for (let y = -cycleExpansion; y < ySize + cycleExpansion; y++) {
				for (let z = -cycleExpansion; z < cycleExpansion; z++) {
					const numberOfActiveSpacesAround = countActiveSpacesAround(x, y, z, activeSpace);

					const key = getKey(x, y, z);

					if (activeSpace.has(key)) {
						// active
						switch (numberOfActiveSpacesAround) {
							case 2:
							case 3:
								// stays the same, don't change it;
								break;
							default:
								newSpace.delete(key);
								break;
						}
					} else {
						// inactive
						switch (numberOfActiveSpacesAround) {
							case 3:
								newSpace.set(key, 1);
								break;
							default:
								// stays the same, don't change it;
								break;
						}
					}
				}
			}
		}

		activeSpace = newSpace;
	}

	const numberOfActives = activeSpace.size;

	console.log(numberOfActives);
})();
