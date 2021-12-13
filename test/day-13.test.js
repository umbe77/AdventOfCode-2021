import { expect } from 'chai'
import { Readable } from 'stream'
import { parsePasswordSheet, getPasswordDots } from '../src/day-13.js'

const inputs = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`

const createStream = (input) => {
	const stream = new Readable()
	stream.push(inputs)
	stream.push(null)
	return stream
}

describe("Advent Day 13", () => {
	it("Points in sheet", async () => {
		const data = await parsePasswordSheet(createStream(inputs))
		const dots = getPasswordDots(data)
		expect(dots).to.be.equal(17)
	})
})
