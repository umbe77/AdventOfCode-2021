
const nextDay = (daysTo) => {
	const next = [0, 0, 0, 0, 0, 0, 0, 0, 0]
	next[8] += daysTo[0]
	next[6] += daysTo[0]

	for (let i = 1; i < 9; ++i) {
		next[i - 1] += daysTo[i]
	}
	return next.slice()
}


export const getLanternfishTotal = (starting, days) => {
	let daysTo = [0, 0, 0, 0, 0, 0, 0, 0, 0]
	starting.forEach(lantern => {
		daysTo[lantern]++
	})

	for (let i = 0; i < days; ++i) {
		daysTo = nextDay(daysTo)
	}

	return daysTo.reduce((acc, val) => acc += val, 0)
}

