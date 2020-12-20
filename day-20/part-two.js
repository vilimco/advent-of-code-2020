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

			if (this.left === null && this.leftBorder === otherTile.rightBorder) {
				this.left = otherTile;
				otherTile.right = this;
				return true;
			}

			if (this.right === null && this.rightBorder === otherTile.leftBorder) {
				this.right = otherTile;
				otherTile.left = this;
				return true;
			}

			if (this.top === null && this.topBorder === otherTile.bottomBorder) {
				this.top = otherTile;
				otherTile.bottom = this;
				return true;
			}

			if (this.bottom === null && this.bottomBorder === otherTile.topBorder) {
				this.bottom = otherTile;
				otherTile.top = this;
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

			const newContent = [];
			for (let i = 0; i < this.content.length; i++) {
				let row = '';
				for (let j = 0; j < this.content.length; j++) {
					row += this.content[this.content.length - 1 - j][i];
				}
				newContent.push(row);
			}

			this.content = newContent;
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

			const newContent = [];
			for (let i = 0; i < this.content.length; i++) {
				let row = '';
				for (let j = 0; j < this.content.length; j++) {
					row += this.content[i][this.content.length - 1 - j];
				}
				newContent.push(row);
			}

			this.content = newContent;
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

	class SeaMonster {
		constructor () {
			this.content = `                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `.split('\n').map((row) => row.split(''));
			console.log(this.content);
		}

		rotate () {
			const newContent = new Array(this.content[0].length).fill('').map(() => new Array(this.content.length));
			for (let i = 0; i < this.content.length; i++) {
				for (let j = 0; j < this.content[0].length; j++) {
					newContent[this.content[0].length - 1 - j][i] = this.content[i][j]
				}
			}

			this.content = newContent;
		}

		flip () {
			const newContent = new Array(this.content.length).fill('').map(() => new Array(this.content[0].length));
			for (let i = 0; i < this.content.length; i++) {
				for (let j = 0; j < this.content[0].length; j++) {
					newContent[i][this.content[0].length - 1 - j] = this.content[i][j];
				}
			}

			this.content = newContent;
		}

		isMatchOn (xStart, yStart, map) {
			if (xStart + this.content.length >= map.length || yStart + this.content[0].length >= map[0].length) {
				return false;
			}

			for (let x = 0; x < this.content.length; x++) {
				for (let y = 0; y < this.content[0].length; y++) {
					if (this.content[x][y] === ' ') {
						continue;
					}

					switch (map[xStart + x][yStart + y]) {
						case '0':
						case '#':
							// ok, don't do anything
							break;
						default:
							return false;
					}
				}
			}

			return true;
		}


		replaceOn (xStart, yStart, map) {
			for (let x = 0; x < this.content.length; x++) {
				for (let y = 0; y < this.content[0].length; y++) {
					if (this.content[x][y] === ' ') {
						continue;
					}

					map[xStart + x][yStart + y] = '0';
				}
			}
		}
	}


	const rawTiles = document.querySelector('pre').innerText.trim().split('\n\n');
// 	const rawTiles = `Tile 2311:
// ..##.#..#.
// ##..#.....
// #...##..#.
// ####.#...#
// ##.##.###.
// ##...#.###
// .#.#.#..##
// ..#....#..
// ###...#.#.
// ..###..###
//
// Tile 1951:
// #.##...##.
// #.####...#
// .....#..##
// #...######
// .##.#....#
// .###.#####
// ###.##.##.
// .###....#.
// ..#.#..#.#
// #...##.#..
//
// Tile 1171:
// ####...##.
// #..##.#..#
// ##.#..#.#.
// .###.####.
// ..###.####
// .##....##.
// .#...####.
// #.##.####.
// ####..#...
// .....##...
//
// Tile 1427:
// ###.##.#..
// .#..#.##..
// .#.##.#..#
// #.#.#.##.#
// ....#...##
// ...##..##.
// ...#.#####
// .#.####.#.
// ..#..###.#
// ..##.#..#.
//
// Tile 1489:
// ##.#.#....
// ..##...#..
// .##..##...
// ..#...#...
// #####...#.
// #..#.#.#.#
// ...#.#.#..
// ##.#...##.
// ..##.##.##
// ###.##.#..
//
// Tile 2473:
// #....####.
// #..#.##...
// #.##..#...
// ######.#.#
// .#...#.#.#
// .#########
// .###.#..#.
// ########.#
// ##...##.#.
// ..###.#.#.
//
// Tile 2971:
// ..#.#....#
// #...###...
// #.#.###...
// ##.##..#..
// .#####..##
// .#..####.#
// #..#.#..#.
// ..####.###
// ..#.#.###.
// ...#.#.#.#
//
// Tile 2729:
// ...#.#.#.#
// ####.#....
// ..#.#.....
// ....#..#.#
// .##..##.#.
// .#.####...
// ####.#.#..
// ##.####...
// ##..#.##..
// #.##...##.
//
// Tile 3079:
// #.#.#####.
// .#..######
// ..#.......
// ######....
// ####.#..#.
// .#...#.##.
// #.#####.##
// ..#.###...
// ..#.......
// ..#.###...`.trim().split('\n\n');

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

	let top = matchedTiles[0].getMostTop().getMostLeft();
	const length = 12 * (top.content.length - 2); // number of tiles per row
	let map = new Array(length).fill('');

	let counter = 0;
	while (top !== null) {
		let left = top;
		while (left !== null) {
			for (let i = 1; i < left.content.length - 1; i++) {
				map[counter * (left.content.length - 2) + i - 1] += left.content[i].substring(1, left.content[i].length - 1);
			}

			left = left.right;
		}

		top = top.bottom;
		counter++;
	}

	map = map.map((row) => row.split(''));


	const monster = new SeaMonster();
	for (let i = 0; i < 4; i++) {

		for (let x = 0; x < map.length; x++) {
			for (let y = 0; y < map[0].length; y++) {
				if (monster.isMatchOn(x, y, map)) {
					monster.replaceOn(x, y, map);
				}
			}
		}

		monster.rotate();
	}

	monster.flip();

	for (let i = 0; i < 4; i++) {
		for (let x = 0; x < map.length; x++) {
			for (let y = 0; y < map[0].length; y++) {
				if (monster.isMatchOn(x, y, map)) {
					monster.replaceOn(x, y, map);
				}
			}
		}

		monster.rotate();
	}

	console.log(map.toString().replace(/[^#]/g, '').length);
})();
