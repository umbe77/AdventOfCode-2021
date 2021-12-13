import readline from 'readline'

export const parsePasswordSheet = (stream) => {
	return new Promise((resolve, _) => {

		const lineReader = readline.createInterface({
			input: stream
		})
		const data = {
			dots: [],
			folds: []
		}
		let isProcessingFolds = false
		lineReader.on("line", (line) => {
			if (line === '') {
				isProcessingFolds = true
				return
			}
			if (isProcessingFolds) {
				const fold = line.replace("fold along ", "").split('=')
				data.folds.push({ direction: fold[0], qty: parseInt(fold[1]) })
			}
			else {
				const point = line.split(',').map(coord => parseInt(coord))
				if (data.dots[point[1]] === undefined) {
					data.dots[point[1]] = []
				}
				data.dots[point[1]][point[0]] = '#'
			}
		})

		lineReader.on("close", () => {
			resolve(data)
		})

	})
}

const foldVertical = (dots, qty) => {
	const result = []
	//Itero la meta superiore
	for (let i = 0; i < qty; ++i) {
		const line = dots[i]
		if (line) {
			for (let colIdx = 0; colIdx < line.length; ++colIdx) {
				if (line[colIdx] === '#') {
					if (result[i] === undefined) {
						result[i] = []
					}
					result[i][colIdx] = '#'
				}
			}
		}
	}
	// fold up la meta inferiore
	for (let i = qty + 1; i < dots.length; ++i) {
		const line = dots[i]
		if (line) {
			for (let colIdx = 0; colIdx < line.length; ++colIdx) {
				if (line[colIdx] === '#') {
					const newIdx = (dots.length - 1) - i
					if (result[newIdx] === undefined) {
						result[newIdx] = []
					}
					result[newIdx][colIdx] = '#'
				}
			}
		}
	}
	return result
}
const foldHorizontal = (dots, qty) => {
	const result = []
	//Itern la meta sinistra
	for (let i = 0; i < dots.length; ++i) {
		const line = dots[i]
		if (line) {
			for (let colIdx = 0; colIdx < qty; ++colIdx) {
				if (line[colIdx] === '#') {
					if (result[i] === undefined) {
						result[i] = []
					}
					result[i][colIdx] = '#'
				}
			}
		}
	}
	//fold left la meta destra
	for (let i = 0; i < dots.length; ++i) {
		const line = dots[i]
		if (line) {
			for (let colIdx = qty + 1; colIdx < line.length; ++colIdx) {
				if (line[colIdx] === '#') {
					if(result[i] === undefined) {
						result[i] = []
					}
					const newColIdx = (qty * 2) - colIdx
					result[i][newColIdx] = '#'
				}
			}
		}
	}
	return result
}

const countDots = (dots) => {
	return dots.reduce((acc, l) => (l !== undefined) ? acc += l.reduce((cAcc, v) => (v === '#') ? ++cAcc : cAcc, 0) : 0, 0)
}

export const getPasswordDots = ({ dots, folds }) => {
	let result = dots.slice()
	const { direction, qty } = folds[0]
	if (direction === 'x') {
		result = foldHorizontal(result, qty)
	}
	else {
		result = foldVertical(result, qty)
	}

	// folds.forEach(({ direction, qty }) => {
	// 	if (direction === 'x') {
	// 		result = foldHorizontal(result, qty)
	// 	}
	// 	else {
	// 		result = foldVertical(result, qty)
	// 	}
	// })
	return countDots(result)
}
