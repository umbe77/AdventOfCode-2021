import { expect } from 'chai'
import { getLanternfishTotal } from '../src/day-06.js'

const starting = "3,4,3,1,2".split(',').map(e => parseInt(e))

describe("Advent Day 06", () => {
	it("Number of lanternfish after 18 days", () => {
		const number = getLanternfishTotal(starting, 18)
		expect(number).to.be.equal(26)
	})

	it("Number of lanternfish after 80 days", () => {
		const number = getLanternfishTotal(starting, 80)
		expect(number).to.be.equal(5934)
	})

	it("Number of lanternfish after 256 days", () => {
		const number = getLanternfishTotal(starting, 256)
		expect(number).to.be.equal(26984457539)
	})
})

