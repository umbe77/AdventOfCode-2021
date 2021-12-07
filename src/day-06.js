
const Node = (element) => {
	return {
		value: element,
		next: undefined
	}
}

const LinkedSet = (initVals) => {
	let header = undefined
	let lastNode = undefined
	let _size = 0

	//methods
	const add = (value) => {
		if (!header) {
			header = Node(value)
			lastNode = header
			_size++
			return
		}
		lastNode.next = Node(value)
		lastNode = lastNode.next
		_size++
	}

	const forEach = (forEachCallback) => {
		let currentNode = header
		if (!currentNode) {
			return
		}
		do {
			forEachCallback(currentNode)
			currentNode = currentNode.next
		} while (currentNode)
	}

	const printAll = () => {
		let currentNode = header
		if (!currentNode) {
			return
		}
		do {
			console.dir(currentNode)
			currentNode = currentNode.next
		} while (currentNode)
	}

	const size = () => _size

	//constructor
	if (initVals) {
		initVals.forEach(v => {
			add(v)
		})
	}

	return {
		printAll,
		add,
		forEach,
		size
	}
}

export const getLanternfishNumber = (starting, days) => {
	const lanternFishes = LinkedSet(starting.slice())
	for (let day = 0; day < days; ++day) {
		const bornLanternfish = []
		lanternFishes.forEach((lanternFish) => {
			lanternFish.value--
			if (lanternFish.value < 0) {
				lanternFish.value = 6
				bornLanternfish.push(8)
			}
		})
		bornLanternfish.forEach(e => {
			lanternFishes.add(e)
		})
	}
	return lanternFishes.size()
}

const childrenCountOfChildren = (childrenCount, firstBornDate, days) => {
	let totalChildren = 0
	for (let i = 1; i <= childrenCount; ++i) {
		const bornDate = (firstBornDate + (i * 7) + 1)
		if (bornDate >= days) {
			continue
		}
		const children = parseInt(bornDate / 7)
		// console.dir({
		// 	bornDate,
		// 	days,
		// 	firstBornDate,
		// 	childrenCount,
		// 	children
		// })
		totalChildren += children
		totalChildren += childrenCountOfChildren(children, bornDate, days)
	}
	return totalChildren
}

const childrenCountNoRec = (childrenCount, firstBornDate, days) => {
	let totalChildren = 0
	const queue = []
	queue.push({ childrenCount, firstBornDate })
	while (queue.length !== 0) {
		const current = queue.pop()
		for (let i = 1; i <= current.childrenCount; ++i) {
			const bornDate = (current.firstBornDate + (i * 7) + 1)
			if (bornDate >= days) {
				continue
			}
			const children = parseInt(bornDate / 7)
			if (children <= 0) {
				continue
			}
			// console.dir({
			// 	bornDate,
			// 	days,
			// 	firstBornDate,
			// 	childrenCount,
			// 	children
			// })
			totalChildren += children
			// totalChildren += childrenCountOfChildren(children, bornDate, days)
			queue.push({ childrenCount: children, firstBornDate: bornDate })
		}
	}
	return totalChildren
}

export const getLanternfishNumberPart2 = (starting, days) => {
	let totalLantern = 0
	for (const lfCounter of starting) {
		const firstBornDate = lfCounter
		const children = parseInt(((days - lfCounter) / 7) + 1)
		const childreCount = childrenCountNoRec(children, firstBornDate, days) //childrenCountOfChildren(children, firstBornDate, days)
		totalLantern += children + childreCount
	}
	// console.log(totalLantern)
	return totalLantern
}
