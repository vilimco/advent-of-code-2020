(() => {
	// const players = document.querySelector('pre').innerText.trim().split('\n\n');
	const players = `Player 1:
17
19
30
45
25
48
8
6
39
36
28
5
47
26
46
20
18
13
7
49
34
23
43
22
4

Player 2:
44
10
27
9
14
15
24
16
3
33
21
29
11
38
1
31
50
41
40
32
42
35
37
2
12`.trim().split('\n\n');

	let [deck1, deck2] = players.map((rawDecks) => {
		const [, ...deck] = rawDecks.split('\n');

		return deck.map(Number);
	});

	const globalGames = new Map();

	const generateDecksKey = (deck1, deck2) => `${deck1.join('-')},${deck2.join('-')}`;

	const playGame = (deck1, deck2, game) => {

		const gameKey = generateDecksKey(deck1, deck2);

		if (globalGames.has(gameKey)) {
			return [globalGames.get(gameKey), deck1, deck1];
		}

		let card1, card2;
		const configurations = new Set();

		let winner = null;

		let round = 1;
		while (deck1.length > 0 && deck2.length > 0) {

			const key = generateDecksKey(deck1, deck2);
			if (configurations.has(key)) {
				winner = 1;
				break;
			}
			configurations.add(key);

			[card1, ...deck1] = deck1;
			[card2, ...deck2] = deck2;


			let roundWinner = null;

			if (deck1.length >= card1 && deck2.length >= card2) {
				[roundWinner] = playGame(deck1.slice(0, card1), deck2.slice(0, card2), game + 1);
			} else {
				roundWinner = card1 > card2 ? 1 : 2;
			}

			if (roundWinner === 1) {
				deck1.push(card1, card2);
			} else {
				deck2.push(card2, card1);
			}

			round++;
		}

		if (winner === null) {
			winner = deck1.length === 0 ? 2 : 1;
		}

		globalGames.set(gameKey, winner);

		return [winner, deck1, deck2];
	}

	const [winner, finalDeck1, finalDeck2] = playGame(deck1, deck2, 1);
	const winnerDeck = winner === 1 ? finalDeck1 : finalDeck2;

	const finalScore = winnerDeck
		.reverse()
		.reduce((sum, card, index) => sum + card * (index + 1), 0);

	console.log(finalScore);
})();
