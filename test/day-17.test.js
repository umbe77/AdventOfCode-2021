import {expect} from 'chai'
import {parseAreaCoordinates, getMaxHeight} from '../src/day-17.js'

const input = `target area: x=20..30, y=-10..-5
`

describe("Advent Day 17", () => {
	it("Get MAx Height", () => {
		const area = parseAreaCoordinates(input)
		const {max} = getMaxHeight(area)
		expect(max).to.be.equal(45)
	})
	it("Get Total Hit", () => {
		const area = parseAreaCoordinates(input)
		const {hit} = getMaxHeight(area)
		expect(hit).to.be.equal(112)
	})
})
