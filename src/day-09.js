
const isLowestPoint = (heightmap, lineIndex, line, columnIndex, column) => {
	const adjacents = []
	if (columnIndex - 1 >= 0) {
		adjacents.push(line[columnIndex - 1])
	}
	if (columnIndex + 1 < line.length) {
		adjacents.push((line[columnIndex + 1]))
	}
	if (lineIndex - 1 >= 0) {
		adjacents.push(heightmap[lineIndex - 1][columnIndex])
	}
	if (lineIndex + 1 < heightmap.length) {
		adjacents.push(heightmap[lineIndex + 1][columnIndex])
	}
	return adjacents.every(a => column < a)
}

export const parseHeightmap = (data) => {
	const map = data.split('\n')
	map.pop()
	return map.map(l => l.split('').map(c => parseInt(c)))
}

export const getLowestPoints = (heightmap) => {
	return heightmap.reduce((acc, line, lineIndex) => {
		line.forEach((column, columnIndex) => {
			acc += isLowestPoint(heightmap, lineIndex, line, columnIndex, column) ? column + 1 : 0
		})
		return acc
	}, 0)
}

const horizontalScan = (heightmap, horizontalLength, x, y) => {
	let horizontalDown = [{ x, y }]
	let isGetAllHorizontal = false
	let leftX = x
	let rightX = x
	while (!isGetAllHorizontal) {
		leftX--
		rightX++
		if (leftX >= 0 && heightmap[y][leftX] < 9) {
			horizontalDown.push({ x: leftX, y })
		}
		else {
			leftX = -1
		}
		if (rightX < horizontalLength && heightmap[y][rightX] < 9) {
			horizontalDown.push({ x: rightX, y })
		}
		else {
			rightX = horizontalLength
		}
		if (leftX < 0 && rightX >= horizontalLength)
			isGetAllHorizontal = true
	}
	return horizontalDown
}

const verticalScan = (heightmap, x, y) => {
	const verticalDown = [{ x, y }]
	let isGetAllVertical = false
	let upY = y
	let downY = y
	while (!isGetAllVertical) {
		upY--
		downY++
		if (upY >= 0 && heightmap[upY][x] < 9) {
			verticalDown.push(({ x, y: upY }))
		}
		else {
			upY = -1
		}
		if (downY < heightmap.length && heightmap[downY][x] < 9) {
			verticalDown.push(({ x, y: downY }))
		}
		else {
			downY = heightmap.length
		}
		if (upY < 0 && downY >= heightmap.length) {
			isGetAllVertical = true
		}
	}
	return verticalDown
}

const getBasinArea = (heightmap, horizontalLength, x, y) => {
	const currentXs = horizontalScan(heightmap, horizontalLength, x, y)
	const points = currentXs.reduce((acc, { x: hx, y: hy }) => {
		if (acc[`${hx}${hy}`] === undefined) {
			acc[`${hx}${hy}`] = 1
		}
		return acc
	}, {})

	currentXs.forEach(({ x: hx, y: hy }) => {
		const verticalsPoints = verticalScan(heightmap, hx, hy)
		verticalsPoints.forEach(({ x: vx, y: vy }) => {
			if (points[`${vx}${vy}`] === undefined) {
				const horizontalpoints = horizontalScan(heightmap, horizontalLength, vx, vy)
				horizontalpoints.forEach(({ x: hx1, y: hy1 }) => {
					if (points[`${hx1}${hy1}`] === undefined) {
						points[`${hx1}${hy1}`] = 1
					}
				})
			}
		})
	})

	return Object.entries(points).reduce((acc, [_k, v]) => acc += v, 0)
}

export const getLargestBasins = (heightmap) => {
	const basinsAreas = heightmap.reduce((acc, line, lineIndex) => {
		line.forEach((column, columnIndex) => {
			if (isLowestPoint(heightmap, lineIndex, line, columnIndex, column)) {
				acc.push(getBasinArea(heightmap, line.length, columnIndex, lineIndex))
			}
		})
		return acc
	}, [])
	// const areas = basinsAreas.sort((a, b) => b - a)
	// console.dir({areas, length: areas.length})
	return basinsAreas.sort((a, b) => b - a).reduce((acc, e, index) => index < 3 ? [...acc, [e]] : acc, []).reduce((acc, e) => acc * e, 1)
}
