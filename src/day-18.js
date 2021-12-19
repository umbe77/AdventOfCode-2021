
const checkExplode = ([left, right], deep) => {
	if (deep >= 4) {
		return true
	}
	let newDeep = ++deep
	let hasToExplode = false
	if (Array.isArray(left)) {
		hasToExplode = checkExplode(left, newDeep)
	}
	if (!hasToExplode) {
		if (Array.isArray(right)) {
			hasToExplode = checkExplode(right, newDeep)
		}
	}
	return hasToExplode
}

const explode = ([l, r], d) => {
	let deep = d
	const stack = []
	stack.unshift([l, null])
	while (stack.length > 1) {
		deep++
		const [[left, right], parent] = stack.shift()
		if (deep >= 4) {
			
		}
		if (Array.isArray(left)) {
			stack.unsifth([left, [left, right]])
		}
		if (Array.isArray(right)) {
			stack.unshift([right, [left, right]])
		}
	}

}

const checkSplit = ([left, right]) => {
	let hasToSplit = false
	if (!Array.isArray(left)) {
		hasToSplit = left > 9
	}
	else {
		hasToSplit = checkSplit(left)
	}
	if (!hasToSplit) {
		if (!Array.isArray(right)) {
			hasToSplit = right > 9
		}
		else {
			hasToSplit = checkSplit(right)
		}
	}
	return hasToSplit
}

export const reduce = ([left, right]) => {
	console.dir([left, right])
	let hasToExplode = true
	let hasToSplit = true
	console.log(JSON.stringify([left, right], null, 2))
	[left, right].reduce((acc, v, i) => {

	}, [])
	// while (hasToExplode || hasToSplit) {
	// 	hasToExplode = checkExplode([left, right], 1)
	// 	console.dir(hasToExplode)
	// 	if (hasToExplode) {
	// 		// TODO: Explode
	// 		continue
	// 	}
	// 	hasToSplit = checkSplit([left,right])
	// 	if (hasToSplit) {
	// 		// TODO: Split
	// 		continue
	// 	}
	// }
	return [left, right]
}

export const magnitude = (number) => {
	return 1
}

export const sum = (buffer) => {
	return 1
}
