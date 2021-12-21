export const parseInputImage = (data) => {
	const lines = data.split('\n')
	lines.pop()
	const enanchedAlg = lines[0].split('').map(v => v === "#" ? '1' : '0')
	// lines.shift()
	// lines.shift()
	const image = []
	lines.forEach((l, i) => {
		if (i > 1) {
			image.push([...new Array(2).fill(0), ...(l.split('').map(v => v === '#' ? '1' : '0')), ...new Array(2).fill(0)])
		}
	})
	for (let i = 0; i < 2; ++i) {
		image.unshift(new Array(image[0].length).fill('0'))
		image.push(new Array(image[0].length).fill('0'))
	}
	return [enanchedAlg, image]
}

const parseImage = (input, alg, on) => {
	const output = []
	input.forEach((row, rowIndex) => {
		output[rowIndex] = []
		row.forEach((_v, colIndex) => {
			// if (v === '0') {
			let bin = []
			for (let r = -1; r <= 1; ++r) {
				for (let c = -1; c <= 1; ++c) {
					const ri = rowIndex + r
					const ci = colIndex + c
					if (ri >= 0 && ri < input.length && ci >= 0 && ci < row.length) {
						if (input[ri][ci] === '1' && on) {
							bin.push('1')
						}
						else {
							bin.push('0')
						}
					}
					else {
						bin.push('0')
					}
				}
			}
			let pixel = '1'
			if (alg[parseInt(bin.join(''), 2)] === 1 && on) {}
			output[rowIndex][colIndex] = alg[parseInt(bin.join(''), 2)] === '#'&& !on ? '1' : '0'

			// }
		})
	})
	return output
}

const dump = (image) => {
	image.forEach(l => {
		console.log(l.map(c => c === '1' ? '#' : ' ').join(''))
	})
}

export const enanche = ([alg, image]) => {
	let output = image
	// dump(output)

	for (var i = 0; i < 2; ++i) {
		output = parseImage(output, alg, i % 2 === 0)
		output = output.map(l => [...new Array(2).fill(0), ...l, ...new Array(2).fill(0)])
		for (let j = 0; j < 2; ++j) {
			output.unshift(new Array(output[0].length).fill('0'))
			output.push(new Array(output[0].length).fill('0'))
		}
	}

	dump(output)

	const pixels = output.reduce((acc, l) => acc += l.reduce((accL, v) => accL += parseInt(v), 0), 0)

	return [pixels]
}
