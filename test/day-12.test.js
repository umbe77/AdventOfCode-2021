import { expect } from 'chai'
import { parseGraph, getAllPaths, getAllPaths2 } from '../src/day-12.js'

const input1 = `start-A
start-b
A-c
A-b
b-d
A-end
b-end
`

const input2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`

const input3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`

describe("Advent Day 12", () => {
	it("All Path input1", () => {
		const graph = parseGraph(input1)
		const paths = getAllPaths(graph)
		expect(paths).to.be.equal(10)
	})
	it("All Path input2", () => {
		const graph = parseGraph(input2)
		const paths = getAllPaths(graph)
		expect(paths).to.be.equal(19)
	})
	it("All Path input3", () => {
		const graph = parseGraph(input3)
		const paths = getAllPaths(graph)
		expect(paths).to.be.equal(226)
	})
	// it("All Path input2-1", () => {
	// 	const graph = parseGraph(input1)
	// 	const paths = getAllPaths2(graph)
	// 	expect(paths).to.be.equal(36)
	// })
	// it("All Path input2-2", () => {
	// 	const graph = parseGraph(input2)
	// 	const paths = getAllPaths2(graph)
	// 	expect(paths).to.be.equal(103)
	// })
	// it("All Path input2-3", () => {
	// 	const graph = parseGraph(input3)
	// 	const paths = getAllPaths2(graph)
	// 	expect(paths).to.be.equal(3509)
	// })
})
