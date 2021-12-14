import { expect } from 'chai'
import { parsePolymerInput, getPolymerMostLeastElements } from '../src/day-14.js'

const input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`
describe("Advent Day 14", () => {

	it("Get Max and Min", () => {
		const polymerFormula = parsePolymerInput(input)
		const result = getPolymerMostLeastElements(polymerFormula)
		expect(result).to.be.equal(1588)
	})

	// it("Get Max After 40", () => {
	// 	const polymerFormula = parsePolymerInput(input)
	// 	const result = getPolymerMostLeastElements(polymerFormula, 40)
	// 	expect(result).to.be.equal(1588)
	// })
})
