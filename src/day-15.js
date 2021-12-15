
export const parseChiton = (data) => {
	const lines = data.split('\n')
	lines.pop()
	return lines.map(l => l.split('').map(c => parseInt(c)))
}

export const getLowestRiskPath = (chiton) => {
	const cache = new Map()
	const solve = (row, col) => {
		const rc = `${row}${col}`
		if (cache.has(rc)) {
			return cache.get(rc)
		}
		if (row < 0 || row >= chiton.length || col < 0 || col >= chiton[row].length) {
			return 1e9
		}
		if (row === chiton.length - 1 && col === chiton[row].length - 1) {
			return chiton[row][col]
		}
		const a = solve(row + 1, col)
		const b = solve(row, col + 1)
		console.dir([a, b])
		const result = chiton[row][col] + Math.min(solve(row + 1, col), solve(row, col + 1))
		cache.set(rc, result)
		return result
	}

	return solve(0, 0) - chiton[0][0]
}
