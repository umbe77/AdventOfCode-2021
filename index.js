import fs from 'fs'
import { getIncreaseCount, getIncreaseGroupThreeCount } from './src/day-01.js'
import { parseInput, getFinalPosition, getFinalPositionWithAim } from './src/day-02.js'
import { getConsumption, getLifeSupport, parseDiagnostics } from './src/day-03.js'
import { parseBingoInput, playBingo, getLastWinningBoard } from './src/day-04.js'

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
		const bingo = parseBingoInput(fs.readFileSync(file).toString())
		const { score } = playBingo(bingo)
		console.log(score)
		const { lastWinningScore, lastWinningCall, unmarked } = getLastWinningBoard(bingo)
		console.log(lastWinningCall)
		console.log(unmarked)
		console.log(lastWinningScore)
	}
}

const args = process.argv.slice(2)

main(args[0], args[1])
