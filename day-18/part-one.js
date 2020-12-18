(() => {
	const input = document.querySelector('pre').innerText.trim().split('\n');

	const parseExpression = (expression) => {
		const operands = [];

		for (let i = 0; i < expression.length; i++) {
			const char = expression[i];

			if (char === ' ') {
				continue;
			}

			if (/\d/.test(char)) {
				operands.push(parseInt(char, 10));
				continue;
			}

			if (/[\*\+]/.test(char)) {
				operands.push(char);
				continue;
			}

			// other characters are (, we will parse things recursively until the )
			if (char === '(') {
				let closingIndex = i + 1;
				let parenthesis = 1;
				while (parenthesis > 0) { // insert checkup for max index if invalid expressions
					switch (expression[closingIndex]) {
						case '(':
							parenthesis++;
							break;
						case ')':
							parenthesis--;
							break;
					}
					closingIndex++;
				}

				const subExpression = expression.substr(i + 1, closingIndex - i - 2);

				operands.push(parseExpression(subExpression));
				i = closingIndex;
			}

		}

		return operands;
	}

	const calculateExpression = (operands) => {
		let value;
		if (!Array.isArray(operands[0])) {
			value = operands[0];
		} else {
			value = calculateExpression(operands[0]);
		}

		for (let i = 1; i < operands.length; i += 2) {
			const operator = operands[i];
			const secondOperand = operands[i + 1];

			let secondValue;
			if (!Array.isArray(secondOperand)) {
				secondValue = secondOperand;
			} else {
				secondValue = calculateExpression(secondOperand);
			}

			switch (operator) {
				case '+':
					value += secondValue;
					break;
				case '*':
					value *= secondValue;
					break;
			}
		}

		return value;
	}

	const finalSum = input.reduce((sum, expression) => sum + calculateExpression(parseExpression(expression)), 0);

	console.log(finalSum);
})();
