
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
	let pairs = {}
	formulaTemplate.forEach((e, i, arr) => {
		if (i > 0) {
			if (pairs[`${arr[i - 1]}${e}`] === undefined) {
				pairs[`${arr[i - 1]}${e}`] = 0
			}
			pairs[`${arr[i - 1]}${e}`] += 1
		}
	})


	for (let step = 0; step < stepCount; ++step) {
		const tmp = {}

		Object.entries(pairs).forEach(([k, v]) => {
			if (tmp[`${k[0]}${pairInsertion[k]}`] === undefined) {
				tmp[`${k[0]}${pairInsertion[k]}`] = 0
			}
			tmp[`${k[0]}${pairInsertion[k]}`] += v

			if (tmp[`${pairInsertion[k]}${k[1]}`] === undefined) {
				tmp[`${pairInsertion[k]}${k[1]}`] = 0
			}
			tmp[`${pairInsertion[k]}${k[1]}`] += v
		})

		pairs = { ...tmp }
	}

	const elements = {}
	Object.entries(pairs).forEach(([k, v]) => {
		const elem = k[0]
		if (elements[elem] === undefined) {
			elements[elem] = 0
		}
		elements[elem] += v
	})
	if (elements[formulaTemplate[formulaTemplate.length - 1]] === undefined) {
		elements[formulaTemplate[formulaTemplate.length - 1]] = 0
	}
	elements[formulaTemplate[formulaTemplate.length - 1]] += 1


	const result = Object.entries(elements).sort(([_k1, v1], [_k2, v2]) => v2 - v1).map(([_, v]) => v)

	return result[0] - result[result.length - 1]
}

// Brute force algorithm not good for part 2 Consuming a lot of memory
// export const getPolymerMostLeastElements = ({ formulaTemplate, pairInsertion }, stepCount = 10) => {
// 	let currentFormulaTemplate = formulaTemplate.slice()
// 	for (let step = 0; step < stepCount; ++step) {
// 		const newFormulaTemplate = []
// 		currentFormulaTemplate.forEach((element, i) => {
// 			if (i !== 0) {
// 				newFormulaTemplate.push(pairInsertion[`${currentFormulaTemplate[i - 1]}${element}`])
// 			}
// 			newFormulaTemplate.push(element)
// 		})
// 
// 		currentFormulaTemplate = newFormulaTemplate.slice()
// 	}
// 	const elements = Object.entries(currentFormulaTemplate.reduce((acc, v) => {
// 		if (acc[v] === undefined) {
// 			acc[v] = 0
// 		}
// 		acc[v]++
// 		return acc
// 	}, {})).sort(([_k1, v1], [_k2, v2]) => v2 - v1).map(([_, count]) => count)
// 	return elements[0] - elements[elements.length - 1]
// }
