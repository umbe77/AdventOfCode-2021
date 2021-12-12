import { expect } from 'chai'
import { parseInputEnergyLevels, getTotalFlashes, getAllFlashesStep } from '../src/day-11.js'

const inputs = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`

describe("Advent Day 11", () => {
	it("Get Flashes", () => {
		const energyLevels = parseInputEnergyLevels(inputs)
		const total = getTotalFlashes(energyLevels, 100)
		expect(total).to.be.equal(1656)
	})

	it("All Flashes", () => {
		const energyLevels = parseInputEnergyLevels(inputs)
		const total = getAllFlashesStep(energyLevels)
		expect(total).to.be.equal(195)
	})
})
