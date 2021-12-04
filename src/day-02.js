
export const parseInput = (input) => {
	return input.split("\n").map(v => {
		const vals = v.split(' ')
		return {
			"direction": vals[0],
			"value": parseInt(vals[1])
		}
	})
}

export const getFinalPosition = (movements) => {
	let depth = 0
	let horizontal = 0
	movements.forEach(({direction, value}) => {
		if (direction === "down") {
			depth += value
		}
		else if (direction === "up") {
			depth -= value
		}
		else if (direction === "forward") {
			horizontal += value
		}
	})
	return {
		depth,
		horizontal,
		position: depth * horizontal
	}
}

export const getFinalPositionWithAim = (movements) => {
	let aim = 0
	let depth = 0
	let horizontal = 0
	movements.forEach(({direction, value}) => {
		if (direction === "down") {
			aim += value
		}
		else if (direction === "up") {
			aim -= value
		}
		else if (direction === "forward") {
			horizontal += value
			depth += value * aim
		}
	})
	return {
		depth,
		horizontal,
		position: depth * horizontal
	}
}
