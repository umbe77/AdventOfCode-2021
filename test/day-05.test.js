import { expect } from 'chai'
import { parseVentInput, findIntersection, findAllIntersection } from '../src/day-05.js'

const ventData = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`

describe("Advent Day 05", () => {
	it("Horizontal and vertical intersection", () => {
		const parsed = parseVentInput(ventData)
		const intersectionCount = findIntersection(parsed)
		expect(intersectionCount).to.be.equal(5)
	})

	it("all intersection", () => {
		const parsed = parseVentInput(ventData)
		const intersectioncount = findAllIntersection(parsed)
		expect(intersectioncount).to.be.equal(12)
	})
})
