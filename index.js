import fs from 'fs'
import { getIncreaseCount, getIncreaseGroupThreeCount } from './src/day-01.js'
import { parseInput, getFinalPosition, getFinalPositionWithAim } from './src/day-02.js'
import { getConsumption, getLifeSupport, parseDiagnostics } from './src/day-03.js'
import { parseBingoInput, playBingo, getLastWinningBoard } from './src/day-04.js'
import { parseVentInput, findIntersection, findAllIntersection } from './src/day-05.js'
import { getLanternfishTotal } from './src/day-06.js'
import { alignCrabSubmarines, alignCrabSubmarines2 } from './src/day-07.js'
import { parseInput as parseInput08, countSimpleDigits, getAllSignalMappings } from './src/day-08.js'
import { parseHeightmap, getLowestPoints, getLargestBasins } from './src/day-09.js'
import { parseInputCode, getCorruptedLines, getIncompleteLines } from './src/day-10.js'
import { parseInputEnergyLevels, getTotalFlashes, getAllFlashesStep } from './src/day-11.js'
import { parseGraph, getPaths } from './src/day-12.js'
import { parsePasswordSheet, getPasswordDots, getActivationCode } from './src/day-13.js'

const days = {
	"01": (file) => {
		const measurments = fs.readFileSync(file).toString().split("\n").map(val => parseInt(val))

		const count = getIncreaseCount(measurments)
		console.log(`Single count ${count}`)

		const countGroup = getIncreaseGroupThreeCount(measurments)
		console.log(`Group cuont ${countGroup}`)
	},
	"02": (file) => {
		const movements = parseInput(fs.readFileSync(file).toString())
		const finalPosition = getFinalPosition(movements)
		console.log(finalPosition.position)
		const finalPositionWithAim = getFinalPositionWithAim(movements)
		console.log((finalPositionWithAim.position))
	},
	"03": (file) => {
		const diagnostics = parseDiagnostics(fs.readFileSync(file).toString())
		const { consumption } = getConsumption(diagnostics)
		console.log(consumption)
		const { lifeSupportRate } = getLifeSupport(diagnostics)
		console.log(lifeSupportRate)
	},
	"04": (file) => {
		const bingo_1 = parseBingoInput(fs.readFileSync(file).toString())
		const { score } = playBingo(bingo_1)
		console.log(score)
		const bingo_2 = parseBingoInput(fs.readFileSync(file).toString())
		const { lastWinningScore } = getLastWinningBoard(bingo_2)
		console.log(lastWinningScore)
	},
	"05": (file) => {
		const vent = parseVentInput(fs.readFileSync(file).toString())
		const intersectionCount = findIntersection(vent)
		console.log(intersectionCount)
		const allIntersectionCount = findAllIntersection(vent)
		console.log(allIntersectionCount)
	},
	"06": (file) => {
		const lanternFishes = fs.readFileSync(file).toString().split(",").map(e => parseInt(e))
		const lanternFishesAfter80Days = getLanternfishTotal(lanternFishes, 80)
		console.log(lanternFishesAfter80Days)
		const lanternFishAfter256Days = getLanternfishTotal(lanternFishes, 256)
		console.log(lanternFishAfter256Days)
	},
	"07": (file) => {
		const submarines = fs.readFileSync(file).toString().split(",").map(e => parseInt(e))
		const fuelConsumption = alignCrabSubmarines(submarines)
		console.log(fuelConsumption)
		const fuelConsumptionByDistance = alignCrabSubmarines2(submarines)
		console.log(fuelConsumptionByDistance)
	},
	"08": (file) => {
		const data = parseInput08(fs.readFileSync(file).toString())
		const countSimple = countSimpleDigits(data)
		console.log(countSimple)
		const countAllMappings = getAllSignalMappings(data)
		console.log(countAllMappings)
	},
	"09": (file) => {
		const heightMap = parseHeightmap(fs.readFileSync(file).toString())
		const lowest = getLowestPoints(heightMap)
		console.log(lowest)
		const largest = getLargestBasins(heightMap)
		console.log(largest)
	},
	"10": (file) => {
		const code = parseInputCode(fs.readFileSync(file).toString())
		const corrupted = getCorruptedLines(code)
		console.log(corrupted)
		const incomplete = getIncompleteLines(code)
		console.log(incomplete)
	},
	"11": (file) => {
		const energyLevels = parseInputEnergyLevels(fs.readFileSync(file).toString())
		const flashes = getTotalFlashes(energyLevels, 100)
		console.log(flashes)
		const energyLevels1 = parseInputEnergyLevels(fs.readFileSync(file).toString())
		const allFlashesStep = getAllFlashesStep(energyLevels1)
		console.log(allFlashesStep)
	},
	"12": (file) => {
		const graph = parseGraph(fs.readFileSync(file).toString())
		const allPaths = getPaths(graph)
		console.log(allPaths)
		const path_part2 = getPaths(graph, true)
		console.log(path_part2)
	},
	"13": async (file) => {
		const dots = await parsePasswordSheet(fs.createReadStream(file))
		const countFirstFold = getPasswordDots(dots)
		console.log(countFirstFold)
		const dots2 = await parsePasswordSheet(fs.createReadStream(file))
		getActivationCode(dots2)
	}
}

const day = process.argv.slice(2)

const main = async () => {
	await days[day](`input-${day}.txt`)

}
main()

