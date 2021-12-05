
export const parseVentInput = (ventData) => {
	const ventLines = ventData.split("\n")
	ventLines.pop()
	return ventLines.map(vent => {
		const points = vent.split("->")
		const startPoint = points[0].trim().split(",")
		const endPoint = points[1].trim().split(",")

		const start = {
			'x': parseInt(startPoint[0]),
			'y': parseInt(startPoint[1])
		}

		const end = {
			'x': parseInt(endPoint[0]),
			'y': parseInt(endPoint[1])
		}

		const isVerticalLine = start.x === end.x
		const isHorizontalLine = start.y === end.y
		const isDiagonal = start.x !== end.x && start.y !== end.y

		return {
			start,
			end,
			isHorizontalLine,
			isVerticalLine,
			isDiagonal
		}
	})
}

const expandPointsAll = (start, end) => {

	const xIncrement = ((startx, endx) => {
		if (startx === endx) {
			return 0
		}
		return startx < endx ? +1 : -1
	})(start.x, end.x)

	const yIncrement = ((starty, endy) => {
		if (starty === endy) {
			return 0
		}
		return starty < endy ? +1 : -1
	})(start.y, end.y)

	const points = []

	points.push({
		'x': start.x,
		'y': start.y
	})

	let currentX = start.x
	let currentY = start.y
	while (true) {
		currentX += xIncrement
		currentY += yIncrement

		if (currentX === end.x && currentY === end.y) {
			break
		}

		points.push({
			'x': currentX,
			'y': currentY
		})
	}

	points.push({
		'x': end.x,
		'y': end.y
	})

	return points
}


export const findIntersection = (vent) => {
	const map = Object.entries(vent.filter(v => v.isHorizontalLine || v.isVerticalLine)
		.reduce((acc, val) => {
			//const direction = val.isHorizontalLine ? "horizontal" : "vertical"
			const points = expandPointsAll(val.start, val.end)
			points.forEach(point => {
				const hash = `${point.x},${point.y}`
				acc[hash] = acc[hash] ? acc[hash] + 1 : 1
			})
			return acc
		}, {}))
	return map.reduce((acc, [_key, val]) => {
		if (val > 1) {
			acc++
		}
		return acc
	}, 0)
}

export const findAllIntersection = (vent) => {
	return Object.entries(vent.reduce((acc, val) => {
		const points = expandPointsAll(val.start, val.end)
		points.forEach(point => {
			const hash = `${point.x},${point.y}`
			acc[hash] = acc[hash] ? acc[hash] + 1 : 1
		})
		return acc
	}, {}))
		.reduce((acc, [_key, val]) => {
			if (val > 1) {
				acc++
			}
			return acc
		}, 0)
}
