import {expect} from 'chai'
import { parseBits, convertMessage} from '../src/day-16.js'

describe("Advent Day 16", () => {
	it("Conver Bits Part 1 - 16", () => {
		const bits = parseBits('8A004A801A8002F478')
		const [msg] = convertMessage(bits)
		expect(msg).to.be.equal(16)
	})
	it("Conver Bits Part 1 - 12", () => {
		const bits = parseBits('620080001611562C8802118E34')
		const [msg] = convertMessage(bits)
		expect(msg).to.be.equal(12)
	})
	it("Conver Bits Part 1 - 23", () => {
		const bits = parseBits('C0015000016115A2E0802F182340')
		const [msg] = convertMessage(bits)
		expect(msg).to.be.equal(23)
	})
	it("Conver Bits Part 1 - 31", () => {
		const bits = parseBits('A0016C880162017C3686B18A3D4780')
		const [msg] = convertMessage(bits)
		expect(msg).to.be.equal(31)
	})
	it("Conver Bits Part 2 - 3", () => {
		const bits = parseBits('C200B40A82')
		const [_, evaluate] = convertMessage(bits)
		expect(evaluate).to.be.equal(3)
	})
	it("Conver Bits Part 2 - 54", () => {
		const bits = parseBits('04005AC33890')
		const [_, evaluate] = convertMessage(bits)
		expect(evaluate).to.be.equal(54)
	})
	it("Conver Bits Part 2 - 7", () => {
		const bits = parseBits('880086C3E88112')
		const [_, evaluate] = convertMessage(bits)
		expect(evaluate).to.be.equal(7)
	})
	it("Conver Bits Part 2 - 9", () => {
		const bits = parseBits('CE00C43D881120')
		const [_, evaluate] = convertMessage(bits)
		expect(evaluate).to.be.equal(9)
	})
	it("Conver Bits Part 2 - less", () => {
		const bits = parseBits('D8005AC2A8F0')
		const [_, evaluate] = convertMessage(bits)
		expect(evaluate).to.be.equal(1)
	})
	it("Conver Bits Part 2 - greater", () => {
		const bits = parseBits('F600BC2D8F')
		const [_, evaluate] = convertMessage(bits)
		expect(evaluate).to.be.equal(0)
	})
	it("Conver Bits Part 2 - equal", () => {
		const bits = parseBits('9C005AC2F8F0')
		const [_, evaluate] = convertMessage(bits)
		expect(evaluate).to.be.equal(0)
	})
	it("Conver Bits Part 2 - complex", () => {
		const bits = parseBits('9C0141080250320F1802104A08')
		const [_, evaluate] = convertMessage(bits)
		expect(evaluate).to.be.equal(1)
	})
})
