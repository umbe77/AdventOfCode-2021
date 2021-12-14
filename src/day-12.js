
export const parseGraph = (data) => {
	const graph = new Map()
	const dataLines = data.split('\n')
	dataLines.pop()
	dataLines.forEach(dataLine => {
		const [a, b] = dataLine.split('-')
		if (!graph.has(a)) {
			graph.set(a, [])
		}
		if (!graph.has(b)) {
			graph.set(b, [])
		}
		graph.get(a).push(b)
		graph.get(b).push(a)
	})
	return graph
}

export const getPaths = (graph, p2 = false) => {
	const start = ['start', ['start'], null]
	let total = 0
	const stack = [start]
	while (stack.length > 0) {
		const [v, small, twice] = stack.pop()
		if (v === 'end') {
			total++
			continue
		}
		for (const link of graph.get(v)) {
			if (small.find(e => e === link) === undefined) {
				const new_small = small.slice()
				if (/^[a-z]*$/.test(link)) {
					new_small.push(link)
				}
				stack.push([link, new_small, twice])
			}
			else if (p2 && link !== 'start' && link !== 'end' && small.find(e => e === link) !== undefined && twice === null) {
				stack.push([link, small, link])
			}
		}
	}
	return total
}


