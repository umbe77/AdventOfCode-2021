import { expect } from 'chai'
import { parseChiton, getLowestRiskPath } from '../src/day-15.js'

const input = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`

describe("Advent Day 15", () => {
	it("Lowest Risk Path", () => {
		const chiton = parseChiton(input)
		const lowestRisk = getLowestRiskPath(chiton)
		expect(lowestRisk).to.be.equal(40)
	})
})
