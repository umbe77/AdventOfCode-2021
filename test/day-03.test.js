import { expect } from 'chai'
import { getMostCommon, getLessCommon, getConsumption, getLifeSupport, parseDiagnostics } from '../src/day-03.js'

const diagnostics = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`

describe("Advent Day 03", () => {
	it("Find Most common", () => {
		const arr1 = ["0", "1", "1", "1", "1", "0", "0", "1", "1", "1", "0", "0"]
		const arr2 = ["0", "1", "0", "0", "0", "1", "0", "1", "0", "1", "0", "1"]
		const mc1 = getMostCommon(arr1)
		expect(mc1).to.be.equal("1")
		const mc2 = getMostCommon(arr2)
		expect(mc2).to.be.equal("0")
	})

	it("Find Less common", () => {
		const arr1 = ["0", "1", "1", "1", "1", "0", "0", "1", "1", "1", "0", "0"]
		const arr2 = ["0", "1", "0", "0", "0", "1", "0", "1", "0", "1", "0", "1"]
		const mc1 = getLessCommon(arr1)
		expect(mc1).to.be.equal("0")
		const mc2 = getLessCommon(arr2)
		expect(mc2).to.be.equal("1")
	})

	it("Find Most common even", () => {
		const arr = ["0", "1"]
		const mc = getMostCommon(arr)
		expect(mc).to.be.equal('1')
	})

	it("Consumption is 198", () => {
		const res = getConsumption(parseDiagnostics(diagnostics))
		const { gammaRate, epsilonRate, consumption } = res
		expect(gammaRate).to.be.equal(22)
		expect(epsilonRate).to.be.equal(9)
		expect(consumption).to.be.equal(198)
	})

	it("Life support is 230", () => {
		const res = getLifeSupport(parseDiagnostics(diagnostics))
		const {oxygenGeneratorRating, co2ScrubberRate, lifeSupportRate} = res
		expect(oxygenGeneratorRating).to.be.equal(23)
		expect(co2ScrubberRate).to.be.equal(10)
		expect(lifeSupportRate).to.be.equal(230)
	})
})
