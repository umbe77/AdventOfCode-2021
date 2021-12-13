
export const parseGraph = (data) => {
	const edges = data.split('\n')
	edges.pop()
	const graph = []
	edges.forEach(e => {
		const vertex = e.split('-')
		graph.push([vertex[0], vertex[1]], [vertex[1], vertex[0]])
	})
	return graph
}

const linkedNodes = (graph, node, cache) => {
	let cached = cache.get(node)
	if (cached) {
		return cached
	}
	cached = graph.reduce((acc, e) => {
		if (e[0] === node) {
			acc.push(e[1])
		}
		return acc
	}, [])

	cache.set(node, cached)
	return cached
}

const isEdgeJustInPath = ({ from, to, path }) => {
	if (to === 'start') {
		return true
	}
	if (path.some(v => v === to && /^[a-z]*$/.test(v))) {
		return true
	}
	return path.reduce((acc, v, i) => {
		if (v === from) {
			acc.push(i)
		}
		return acc
	}, []).some(v => path[v + 1] === to)
}

const isEdgeJustInPath2 = ({ from, to, path, smallVertex }) => {
	if (to === 'start') {
		return true
	}
	if (path.some(v => {
		if (v === to && /^[a-z]*$/.test(v)) {
			if (smallVertex.count === 2) {
				return true
			}
			smallVertex[v]++
			if (smallVertex[v] > 1) {
				smallVertex.count = 2
			}
		}
		return false
	})) {
		return true
	}

	return path.reduce((acc, v, i) => {
		if (v === from) {
			acc.push(i)
		}
		return acc
	}, []).some(v => path[v + 1] === to)
}

export const getAllPaths = (graph) => {
	const path = []
	const nodesCache = new Map()

	const explore = (currentNode, to, paths = []) => {

		path.push(currentNode)
		for (const linkedNode of linkedNodes(graph, currentNode, nodesCache)) {
			if (linkedNode === to) {
				const result = path.slice()
				result.push(to)
				paths.push(result)
				continue
			}
			if (!isEdgeJustInPath({
				from: currentNode,
				to: linkedNode,
				path
			})) {
				explore(linkedNode, to, paths)
			}
		}
		path.pop()
		return paths
	}

	return explore('start', 'end').length

}

const resetSmallVertex = (graph) => {
	const smallVertex = {
		count: 1
	}
	graph.forEach(e => {
		smallVertex[e[0]] = 0
	})
	return smallVertex
}

export const getAllPaths2 = (graph) => {
	const path = []
	let smallVertex = resetSmallVertex(graph)
	const nodesCache = new Map()

	const explore = (currentNode, to, paths = []) => {

		path.push(currentNode)
		for (const linkedNode of linkedNodes(graph, currentNode, nodesCache)) {
			if (linkedNode === to) {
				const result = path.slice()
				result.push(to)
				paths.push(result)
				console.dir(result.join())
				continue
			}
			if (!isEdgeJustInPath2({
				from: currentNode,
				to: linkedNode,
				path,
				smallVertex
			})) {
				explore(linkedNode, to, paths)
			}
		}
		path.pop()
		smallVertex = resetSmallVertex(graph)
		return paths
	}

	return explore('start', 'end').length
}
