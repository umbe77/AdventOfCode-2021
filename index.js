import fs from 'fs'
import { getIncreaseCount, getIncreaseGroupThreeCount } from './src/day-01.js'
import { parseInput, getFinalPosition, getFinalPositionWithAim } from './src/day-02.js'

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
}

const args = process.argv.slice(2)

main(args[0], args[1])
