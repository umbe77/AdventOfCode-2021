import { expect } from 'chai'
import { parseInput, getFinalPosition, getFinalPositionWithAim } from '../src/day-02.js'

		const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`

describe("Advent Day 02", () => {
	it ("Parse input data", () => {
		const parsedArray = parseInput(input)
		expect(parsedArray).to.be.an("array").of.length(6)
		expect(parsedArray[3]).to.deep.equal({"direction": "up", "value": 3})
	})

	it ("Position is 150", () => {
		const pos = getFinalPosition(parseInput(input))
		expect(pos.depth).to.be.equal(10)
		expect(pos.horizontal).to.be.equal(15)
		expect(pos.position).to.be.equal(150)
	})

	it ("Position is 900", () => {
		const pos = getFinalPositionWithAim(parseInput(input))
		expect(pos.depth).to.be.equal(60)
		expect(pos.horizontal).to.be.equal(15)
		expect(pos.position).to.be.equal(900)
	})
})

