import { expect } from 'chai'
import { getLowestPoints, getLargestBasins, parseHeightmap } from '../src/day-09.js'

const inputs = `2199943210
3987894921
9856789892
8767896789
9899965678
`

describe("Advent Day 09 ", () => {
	it("Get Lowest points", () => {
		const heightMap = parseHeightmap(inputs)
		const lowest = getLowestPoints(heightMap)
		expect(lowest).to.be.equal(15)
	})
	it("Get Largest Basins", () => {
		const heightMap = parseHeightmap(inputs)
		const largest = getLargestBasins(heightMap)
		expect(largest).to.be.equal(1134)
	})
})
