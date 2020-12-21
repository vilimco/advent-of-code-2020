(() => {
	const ingredientLists = document.querySelector('pre').innerText.trim().split('\n');

	const alergenOptions = new Map();
	const ingredientAppearances = {};

	for (let ingredientList of ingredientLists) {
		const [rawIngredients, rawAlergens] = ingredientList.split(' (contains ');

		const newIngredientOptions = rawIngredients.split(' ');
		const newAlergenOptions = rawAlergens.substr(0, rawAlergens.length - 1).split(', ');

		for (let alergen of newAlergenOptions) {
			if (alergenOptions.has(alergen)) {
				alergenOptions.set(
					alergen,
					alergenOptions.get(alergen).filter(i => newIngredientOptions.includes(i))
				);
			} else {
				alergenOptions.set(alergen, newIngredientOptions);
			}
		}

		// track appearances
		for (let ingredient of newIngredientOptions) {
			ingredientAppearances[ingredient] = (ingredientAppearances[ingredient] || 0) + 1;
		}
	}

	while (true) {
		let changeMade = false;

		for (let alergen of alergenOptions.keys()) {
			if (alergenOptions.get(alergen).length > 1) {
				continue;
			}

			const fixedIngredient = alergenOptions.get(alergen)[0];

			for (let subKey of alergenOptions.keys()) {
				if (subKey === alergen) {
					continue;
				}

				const currentOptions = alergenOptions.get(subKey);
				const newOptions = currentOptions.filter(i => i !== fixedIngredient);
				alergenOptions.set(subKey, newOptions);
				changeMade = changeMade || newOptions.length !== currentOptions.length;
			}
		}

		if (!changeMade) {
			break;
		}
	}

	const foundIngredients = [...alergenOptions.values()].map(ing => ing[0]);
	const finalSum = Object.keys(ingredientAppearances).reduce((sum, ing) => {
		if (foundIngredients.includes(ing)) {
			return sum;
		}

		return sum + ingredientAppearances[ing];
	}, 0);

	console.log(finalSum);
})();
