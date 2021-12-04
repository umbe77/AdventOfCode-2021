import { expect } from 'chai'
import { getIncreaseCount, getIncreaseGroupThreeCount } from '../src/day-01.js'

describe("Advent Day 01", () => {
	it("Number of Increase is 7", () => {

		const measurments = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]

		const count = getIncreaseCount(measurments)
		expect(count).to.be.equal(7)

	})

	it("Number of Increase group is 5", () => {

		const measurments = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]

		const count = getIncreaseGroupThreeCount(measurments)
		expect(count).to.be.equal(5)

	})
})
