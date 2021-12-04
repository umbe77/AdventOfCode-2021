
export const getIncreaseCount = (measurments) => {
	return measurments.reduce((prev, curr, index) => {
		if (prev === -1) {
			return 0
		}
		return curr > measurments[index - 1] ? ++prev : prev
	}, -1)
}

export const getIncreaseGroupThreeCount = (mesaurments) => {
	const lastGoodIndex = mesaurments.length - 2
	return getIncreaseCount(mesaurments.map((_m, index) => {
		if (index >= lastGoodIndex) {
			return undefined
		}
		const r = mesaurments.slice(index, index + 3).reduce((acc, v) => acc + v)
		return r
	}).filter(v => v !== undefined))
}

