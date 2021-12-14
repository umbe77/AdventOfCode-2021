
export const parsePolymerInput = (data) => {
	const inputLines = data.split('\n')
	inputLines.pop()
	const formulaTemplate = inputLines.shift().split('')
	inputLines.shift()
	const pairInsertion = inputLines.reduce((acc, l) => {
		const [pair, value] = l.split(' -> ')
		acc[pair] = value
		return acc
	}, {})

	return {
		formulaTemplate,
		pairInsertion
	}
}

export const getPolymerMostLeastElements = ({ formulaTemplate, pairInsertion }, stepCount = 10) => {
	let currentFormulaTemplate = formulaTemplate.slice()
	for (let step = 0; step < stepCount; ++step) {
		const newFormulaTemplate = []
		currentFormulaTemplate.forEach((element, i) => {
			if (i !== 0) {
				newFormulaTemplate.push(pairInsertion[`${currentFormulaTemplate[i - 1]}${element}`])
			}
			newFormulaTemplate.push(element)
		})

		currentFormulaTemplate = newFormulaTemplate.slice()
	}
	const elements = Object.entries(currentFormulaTemplate.reduce((acc, v) => {
		if (acc[v] === undefined) {
			acc[v] = 0
		}
		acc[v]++
		return acc
	}, {})).sort(([_k1, v1], [_k2, v2]) => v2 - v1).map(([_, count]) => count)
	return elements[0] - elements[elements.length - 1]
}
