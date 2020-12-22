(() => {
	const players = document.querySelector('pre').innerText.trim().split('\n\n');

	let [deck1, deck2] = players.map((rawDecks) => {
		const [, ...deck] = rawDecks.split('\n');

		return deck.map(Number);
	});

	let card1, card2;

	while (deck1.length > 0 && deck2.length > 0) {
		[card1, ...deck1] = deck1;
		[card2, ...deck2] = deck2;

		if (card1 > card2) {
			deck1.push(card1, card2);
		} else {
			deck2.push(card2, card1);
		}
	}

	const winnerDeck = deck1.length === 0 ? deck2 : deck1;

	const finalScore = winnerDeck
		.reverse()
		.reduce((sum, card, index) => sum + card * (index + 1), 0);

	console.log(finalScore);
})();
