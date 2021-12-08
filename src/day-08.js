
export const parseInput = (input) => {
	const lines = input.split("\n")
	lines.pop()
	return lines.map(e => {
		const vals = e.split("|").map(v => v.trim())
		return {
			"inputs": vals[0].split(" "),
			"outputs": vals[1].split(" ")
		}
	})
}

// 1, 4, 7, and 8
const simpleDigits = [
	2, // 1
	4, // 4
	3, // 7
	7  // 8
]

export const countSimpleDigits = (data) => {
	return data.reduce((acc, val) => {
		val.outputs.forEach(o => {
			acc = simpleDigits.includes(o.length) ? ++acc : acc
		})
		return acc
	}, 0)
}

const sortSequence = (sequence) => {
	return sequence.split('').sort().join('')
}

const mapNumber = (inputs, mapping, numbers, input, index, number) => {
	const seq = sortSequence(input)
	mapping[seq] = number
	numbers[number] = seq
	inputs.splice(index, 1)
}

const match = (source, compare) => {

	return source.split('').every(v => compare.split('').includes(v))

}

export const getAllSignalMappings = (data) => {
	return data.reduce((acc, { inputs: orig, outputs }) => {

		const numbers = {}
		const mapping = {}

		const inputs = orig.slice()

		//get 1, 7, 4, 8 mapping
		for (let index = inputs.length-1;index>=0;--index) {
			const input = inputs[index]
			switch (input.length) {
				case 2:
					mapNumber(inputs, mapping, numbers, input, index, 1)
					break
				case 3:
					mapNumber(inputs, mapping, numbers, input, index, 7)
					break
				case 4:
					mapNumber(inputs, mapping, numbers, input, index, 4)
					break
				case 7:
					mapNumber(inputs, mapping, numbers, input, index, 8)
					break
			}
		}

		for (let index = inputs.length-1;index>=0;--index) {
			const input = inputs[index]
			if (input.length === 5) {
				if (match(numbers["1"], input)) {
					mapNumber(inputs, mapping, numbers, input, index, 3)
				}
			}
			else {
				if (!match(numbers["1"], input)) {
					mapNumber(inputs, mapping, numbers, input, index, 6)
				}
				if (match(numbers["4"], input)) {
					mapNumber(inputs, mapping, numbers, input, index, 9)
				}
			}
		}

		for (let index = inputs.length-1;index>=0;--index) {
			const input = inputs[index]
			if (input.length === 5) {
				if (match(input, numbers["9"])) {
					mapNumber(inputs, mapping, numbers, input, index, 5)
				}
			}
			else {
				mapNumber(inputs, mapping, numbers, input, index, 0)
			}
		}
		mapNumber(inputs, mapping, numbers, inputs[0], 0, 2)

		return acc += parseInt(outputs.map(o => mapping[sortSequence(o)]).join(''))

	}, 0)
}
