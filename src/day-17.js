
export const parseAreaCoordinates = (data) => {
	const input = (data.split("\n")[0]).replace("target area: ", "")
	const ranges = input.split(',').map(r => r.trim())
	const [x1, x2] = ranges[0].replace("x=", "").split('..')
	const [y1, y2] = ranges[1].replace("y=", "").split('..')
	return { x1, x2, y1, y2 }
}

export const getMaxHeight = ({ x1, x2, y1, y2 }) => {
	// console.dir([x1, x2, y1, y2])
	let max = 0
	let hit = 0
	for (let svx = 0; svx <= 300; ++svx) {
		for (let svy = -100; svy <= 100; ++svy) {
			let x = 0
			let y = 0
			let max_y = 0
			let vx = svx
			let vy = svy
			for (let i = 0; i <= 150; ++i) {
				x += vx
				y += vy
				// console.dir([x, y, vx, vy, x1, x2, y1, y2])
				max_y = Math.max(max_y, y)
				if (vx > 0) {
					vx--
				}
				else if (vx < 0) {
					vx++
				}
				vy--
				if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
					// console.log([svx, svy, max_y])
					max = Math.max(max, max_y)
					hit++
					break
				}
			}
		}
	}
	// console.log(hit)
	return {max, hit}
}
