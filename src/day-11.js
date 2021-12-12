
export const parseInputEnergyLevels = (data) => {
	const lines = data.split('\n')
	lines.pop()
	return lines.map(l => l.split(''))
}

const colDir = 0
const rowDir = 1

const directions = [
	[-1, 0],
	[-1, -1],
	[0, -1],
	[1, -1],
	[1, 0],
	[1, 1],
	[0, 1],
	[-1, 1]
]

const incrementEnergyLevel = (energyLevels, maxedOut, currentRow, currentCol, colCount) => {
	if (maxedOut[`${currentCol}${currentRow}`]) {
		if (energyLevels[currentRow][currentCol] !== 0) {
			console.dir(energyLevels[currentRow][currentCol])
		}
		return 0
	}
	let flashes = 0
	const currentLevel = ++energyLevels[currentRow][currentCol]
	if (currentLevel > 9) {
		flashes++
		maxedOut[`${currentCol}${currentRow}`] = true
		energyLevels[currentRow][currentCol] = 0
		directions.forEach(direction => {
			const newRow = currentRow + direction[rowDir]
			const newCol = currentCol + direction[colDir]
			if (
				0 <= newRow && newRow < energyLevels.length &&
				0 <= newCol && newCol < colCount
			) {
				flashes += incrementEnergyLevel(energyLevels, maxedOut, newRow, newCol, colCount)
			}
		})
	}
	return flashes
}

const getTotalFlahesPerStep = (energyLevels) => {
	const justMaxedOut = {}
	let flashes = 0
	for (let rowIndex = 0; rowIndex < energyLevels.length; ++rowIndex) {
		const col = energyLevels[rowIndex]
		const colCount = col.length
		for (let colIndex = 0; colIndex < col.length; ++colIndex) {
			flashes += incrementEnergyLevel(energyLevels, justMaxedOut, rowIndex, colIndex, colCount)
		}
	}
	return flashes
}

export const getTotalFlashes = (energyLevels, stepCount) => {

	const currentEnergy = energyLevels.slice()

	let totalFalshes = 0
	for (let i = 0; i < stepCount; ++i) {
		totalFalshes += getTotalFlahesPerStep(currentEnergy)
		// console.log({i, c: count0(currentEnergy)})
		// dump(currentEnergy)
		// console.log("\n=========================\n")
	}

	return totalFalshes
}

export const getAllFlashesStep = (energyLevels) => {
	const currentEnergy = energyLevels.slice()

	let allFlashesStep = -1

	let step = 0
	while (allFlashesStep === -1) {
		step++
		const flashes = getTotalFlahesPerStep(currentEnergy)
		allFlashesStep = flashes === (energyLevels.length * 10) ? step : -1
	}

	return allFlashesStep
}
