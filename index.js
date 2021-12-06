import fs from 'fs'
import { getIncreaseCount, getIncreaseGroupThreeCount } from './src/day-01.js'
import { parseInput, getFinalPosition, getFinalPositionWithAim } from './src/day-02.js'
import { getConsumption, getLifeSupport, parseDiagnostics } from './src/day-03.js'
import { parseBingoInput, playBingo, getLastWinningBoard } from './src/day-04.js'
import { parseVentInput, findIntersection, findAllIntersection } from './src/day-05.js'

const main = (day, file) => {
	if (day === "01") {
		const measurments = fs.readFileSync(file).toString().split("\n").map(val => parseInt(val))

		const count = getIncreaseCount(measurments)
		console.log(`Single count ${count}`)

		const countGroup = getIncreaseGroupThreeCount(measurments)
		console.log(`Group cuont ${countGroup}`)
	}
	else if (day == "02") {
		const movements = parseInput(fs.readFileSync(file).toString())
		const finalPosition = getFinalPosition(movements)
		console.log(finalPosition.position)
		const finalPositionWithAim = getFinalPositionWithAim(movements)
		console.log((finalPositionWithAim.position))
	}
	else if (day === "03") {
		const diagnostics = parseDiagnostics(fs.readFileSync(file).toString())
		const { consumption } = getConsumption(diagnostics)
		console.log(consumption)
		const { lifeSupportRate } = getLifeSupport(diagnostics)
		console.log(lifeSupportRate)
	}
	else if (day == "04") {
		const bingo_1 = parseBingoInput(fs.readFileSync(file).toString())
		const { score } = playBingo(bingo_1)
		console.log(score)
		const bingo_2 = parseBingoInput(fs.readFileSync(file).toString())
		const { lastWinningScore } = getLastWinningBoard(bingo_2)
		console.log(lastWinningScore)
	}
	else if (day === "05") {
		const vent = parseVentInput(fs.readFileSync(file).toString())
		const intersectionCount = findIntersection(vent)
		console.log(intersectionCount)
		const allIntersectionCount = findAllIntersection(vent)
		console.log(allIntersectionCount)
	}
}

const args = process.argv.slice(2)

main(args[0], args[1])
