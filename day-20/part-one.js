(() => {
	class Tile {
		left = null;
		right = null;
		top = null;
		bottom = null;

		constructor (id, content) {
			this.id = id;
			this.content = content;
			this.initFrom(content);
		}

		initFrom (rows) {
			this.topBorder = parseInt(rows[0].replace(/#/g, '1').replace(/\./g, '0'), 2);
			this.bottomBorder = parseInt(rows[rows.length - 1].replace(/#/g, '1').replace(/\./g, '0'), 2);

			this.leftBorder = parseInt(
				rows.map((row) => row[0] === '#' ? '1' : '0')
					.join('')
				, 2
			)
			this.rightBorder = parseInt(
				rows.map((row) => row[row.length - 1] === '#' ? '1' : '0')
					.join('')
				, 2
			)
		}

		matchWith (otherTile) {
			if (this.id === otherTile.id) {
				return false;
			}

			if (this.right === null && this.leftBorder === otherTile.rightBorder) {
				this.right = otherTile;
				otherTile.left = this;
				return true;
			}

			if (this.left === null && this.rightBorder === otherTile.leftBorder) {
				this.left = otherTile;
				otherTile.right = this;
				return true;
			}

			if (this.bottom === null && this.topBorder === otherTile.bottomBorder) {
				this.bottom = otherTile;
				otherTile.top = this;
				return true;
			}

			if (this.top === null && this.bottomBorder === otherTile.topBorder) {
				this.top = otherTile;
				otherTile.bottom = this;
				return true;
			}

			return false;
		}

		rotate () {
			const temp = this.rightBorder;

			this.rightBorder = this.topBorder;

			this.topBorder = parseInt(
				this.leftBorder
					.toString(2)
					.padStart(this.content.length, '0')
					.split('')
					.reverse()
					.join('')
				, 2);

			this.leftBorder = this.bottomBorder;

			this.bottomBorder = parseInt(
				temp
					.toString(2)
					.padStart(this.content.length, '0')
					.split('')
					.reverse()
					.join('')
				, 2);
		}

		flip () {
			let temp = this.leftBorder;
			this.leftBorder = this.rightBorder;
			this.rightBorder = temp;

			this.bottomBorder = parseInt(
				this.bottomBorder
					.toString(2)
					.padStart(this.content.length, '0')
					.split('')
					.reverse()
					.join('')
				, 2);

			this.topBorder = parseInt(
				this.topBorder
					.toString(2)
					.padStart(this.content.length, '0')
					.split('')
					.reverse()
					.join('')
				, 2);
		}

		getMostLeft () {
			let left = this;

			while (left.left !== null) {
				left = left.left;
			}

			return left;
		}

		getMostRight () {
			let right = this;

			while (right.right !== null) {
				right = right.right;
			}

			return right;
		}

		getMostTop () {
			let top = this;

			while (top.top !== null) {
				top = top.top;
			}

			return top;
		}

		getMostBottom () {
			let bottom = this;

			while (bottom.bottom !== null) {
				bottom = bottom.bottom;
			}

			return bottom;
		}
	}


	const rawTiles = document.querySelector('pre').innerText.trim().split('\n\n');

	let tiles = [];
	for (const rawTile of rawTiles) {
		const [id, ...rows] = rawTile.split('\n');
		tiles.push(new Tile(
			parseInt(id.match(/\d+/)[0], 10),
			rows
		));
	}

	const isMatch = (targetTile, tile) => {
		// try without flipping
		for (let i = 0; i < 4; i++) {
			if (targetTile.matchWith(tile)) {
				return true;
			}

			tile.rotate();
		}

		tile.flip();

		// recheck after flipping
		for (let i = 0; i < 4; i++) {
			if (targetTile.matchWith(tile)) {
				return true;
			}

			tile.rotate();
		}

		return false;
	}


	const getMatchedTiles = (tiles) => {
		let lastTile = tiles.splice(0, 1)[0];
		const matchedTiles = new Map();
		matchedTiles.set(lastTile.id, lastTile);

		let iterations = 0;
		while (tiles.length > 0 && iterations < 2) {

			for (let i = 0; i < tiles.length; i++) {
				const tile = tiles[i];
				for (let key of matchedTiles.keys()) {
					const matchedTile = matchedTiles.get(key);

					if (isMatch(matchedTile, tile)) {
						matchedTiles.set(tile.id, tile);

						for (let prevTile of matchedTiles.values()) {
							prevTile.matchWith(tile);
						}

						tiles.splice(i, 1);
						iterations = 0;
						break;
					}
				}

				if (matchedTiles.has(tile.id)) {
					break;
				}

			}

			iterations++;
		}

		return [...matchedTiles.values()];
	}

	let matchedTiles = getMatchedTiles(tiles);

	const topLeft = matchedTiles[0].getMostTop().getMostLeft();
	const topRight = topLeft.getMostRight();
	const bottomRight = topRight.getMostBottom();
	const bottomLeft = bottomRight.getMostLeft();

	console.log(
		topLeft.id *
		topRight.id *
		bottomRight.id *
		bottomLeft.id
	);


})();
