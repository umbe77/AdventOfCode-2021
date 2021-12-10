
const getFuelConsumptionByPosition = (submarines, alignPosition) => {
	return submarines.reduce((acc, position) => acc += Math.abs(alignPosition - position), 0)
}

export const alignCrabSubmarines = (submarines) => {
	const fuelConsumptionsByPosition = []
	const positionComputed = {}
	submarines.forEach(submarine => {
		if (!positionComputed[submarine]) {
			positionComputed[submarine] = true
			fuelConsumptionsByPosition.push(getFuelConsumptionByPosition(submarines, submarine))
		}
	})
	return Math.min(...fuelConsumptionsByPosition)
}

const getFuelConsumptionByDistance = (distance) => {
	// let consumption = 0
	// for (let i = 1; i <= distance; ++i) {
	// 	consumption += i
	// }
	// return consumption
	return ((1 + distance) * distance) / 2
}

const getFuelConsumptionByPosition2 = (submarines, alignPosition) => {
	return submarines.reduce((acc, position) => acc += getFuelConsumptionByDistance(Math.abs(alignPosition - position)), 0)
}

export const alignCrabSubmarines2 = (submarines) => {
	const fuelConsumptionsByPosition = []
	const positionComputed = {}
	const maxPosition = Math.max(...submarines)
	const minPosition = Math.min(...submarines)
	const submarinePositions = []
	for (let i = minPosition; i <= maxPosition; ++i) {
		submarinePositions.push(i)
	}
	submarinePositions.forEach(submarine => {
		if (!positionComputed[submarine]) {
			positionComputed[submarine] = true
			fuelConsumptionsByPosition.push(getFuelConsumptionByPosition2(submarines, submarine))
		}
	})
	return Math.min(...fuelConsumptionsByPosition)
}
