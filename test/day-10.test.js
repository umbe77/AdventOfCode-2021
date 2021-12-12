import { expect } from 'chai'
import { parseInputCode, getCorruptedLines, getIncompleteLines } from '../src/day-10.js'

const inputs = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`

describe("Advent Day 10", () => {
	it("Corrupted Lines", () => {
		const code = parseInputCode(inputs)
		const corruptedLines = getCorruptedLines(code)
		expect(corruptedLines).to.be.equal(26397)
	})

	it("Incomplete Competition", () => {
		const code = parseInputCode(inputs)
		const incompleteLines = getIncompleteLines(code)
		expect(incompleteLines).to.be.equal(288957)
	})
})
