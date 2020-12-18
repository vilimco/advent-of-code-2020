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
		// first pass for addition
		let initialOperands = [...operands];

		for (let i = 0; i < initialOperands.length - 2; i += 2) {
			const operand = initialOperands[i];
			const operator = initialOperands[i + 1];
			const secondOperand = initialOperands[i + 2];

			const operandValue = Array.isArray(operand) ? calculateExpression(operand) : operand;
			const secondOperandValue = Array.isArray(secondOperand) ? calculateExpression(secondOperand) : secondOperand;

			if (operator === '*') {
				initialOperands[i] = operandValue;
				initialOperands[i + 2] = secondOperandValue;
				continue;
			}

			// the rest is +
			initialOperands.splice(i, 3, operandValue + secondOperandValue);

			i = i - 2;
		}

		let value = initialOperands[0];
		for (let i = 1; i < initialOperands.length; i += 2) {
			const secondOperand = initialOperands[i + 1];
			value *= secondOperand;
		}

		return value;
	}

	const finalSum = input.reduce((sum, expression) => sum + calculateExpression(parseExpression(expression)), 0);

	console.log(finalSum);
})();
