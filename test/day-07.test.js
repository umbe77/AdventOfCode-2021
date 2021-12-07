import { expect } from 'chai'
import { alignCrabSubmarines, alignCrabSubmarines2 } from '../src/day-07.js'

const submarines = "16,1,2,0,4,2,7,1,2,14".split(",").map(e => parseInt(e))

describe("Advent Day 07", () => {
	it("Align Cramp Submarines", () => {
		const fuelConsumption = alignCrabSubmarines(submarines)
		expect(fuelConsumption).to.be.equal(37)
	})
	it("Align Cramp Submarins Part 2", () => {
		const fuelConsumption = alignCrabSubmarines2(submarines)
		expect(fuelConsumption).to.be.equal(168)
	})
})
