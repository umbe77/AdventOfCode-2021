
export const parseInput = (input) => {
	const lines = input.split("\n")
	lines.pop()
	return lines.map(e => {
		const vals = e.split("|").map(v => v.trim())
		return {
			"inputs": vals[0].split(" "),
			"outputs": vals[1].split(" ")
		}
	})
}

// 1, 4, 7, and 8
const simpleDigits = [
	2, // 1
	4, // 4
	3, // 7
	7  // 8
]

export const countSimpleDigits = (data) => {
	return data.reduce((acc, val) => {
		val.outputs.forEach(o => {
			acc = simpleDigits.includes(o.length) ? ++acc : acc
		})
		return acc
	}, 0)
}

const numbers = [
	[0, 1, 2, 3, 4, 5], // 0
	[5, 4], // 1
	[0, 5, 6, 2, 3], // 2
	[0, 5, 4, 3, 6], // 3
	[1, 6, 5, 4], // 4
	[0, 1, 6, 4, 3], // 5
	[0, 1, 2, 3, 4, 6], // 6
	[0, 5, 4], // 7
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 8
	[0, 1, 6, 5, 4, 3], // 9
]

const getPositions = (inputs, number, positions) => {
	switch (number) {
		case 1:
			inputs.forEach(input => {
				if (input.length == 2) {
					const letters = input.split('')
					positions[letters[0]] = 4
					positions[letters[1]] = 5
				}
			})
			break
		case 7:
			inputs.forEach(input => {
				if (input.length == 3) {
					input.split('')
						.forEach(l => {
							if (positions[l] === undefined) {
								positions[l] = 0
							}
						})
				}
			})
			break
		case 4:
			inputs.forEach(input => {
				if (input.length == 4) {
					const newLetters = []
					input.split('')
						.forEach(l => {
							if (positions[l] === undefined) {
								newLetters.push(l)
							}
						})
					positions[newLetters[0]] = 1
					positions[newLetters[1]] = 6
				}
			})
			break
		case 8:
			inputs.forEach(input => {
				if (input.length == 7) {
					const newLetters = []
					input.split('')
						.forEach(l => {
							if (positions[l] === undefined) {
								newLetters.push(l)
							}
						})
					positions[newLetters[0]] = 2
					positions[newLetters[1]] = 3
				}
			})
			break
	}
}


export const getAllSignalMappings = (data) => {
	return data.reduce((acc, { inputs, outputs }) => {
		const positions = {}

		getPositions(inputs, 1, positions)
		getPositions(inputs, 7, positions)
		getPositions(inputs, 4, positions)
		getPositions(inputs, 8, positions)

		console.dir(positions)
		console.log('===========')

		return acc
	}, 0)
}
