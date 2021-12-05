
export const getMostCommon = (arr) => {
	const entryCounter = Object.entries(
		arr.reduce((acc, val) => {
			acc[val] = acc[val] ? acc[val] + 1 : 1
			return acc
		}, {})
	)
	//.reduce((acc, val) => val[1] > acc[1] ? val : acc, [null, 0])[0]
	const entrySorted = entryCounter.sort(([_ka, va], [_kb, vb]) => {
		return vb - va
	})

	if (entrySorted.length === 1) {
		return entrySorted[0][0]
	}
	return entrySorted[0][1] === entrySorted[1][1] ? "1" : entrySorted[0][0]
}

export const getLessCommon = (arr) => {
	const entryCounter = Object.entries(
		arr.reduce((acc, val) => {
			acc[val] = acc[val] ? acc[val] + 1 : 1
			return acc
		}, {})
	)
	//.reduce((acc, val) => !acc[0] || val[1] < acc[1] ? val : acc, [null, 0])[0]
	const entrySorted = entryCounter.sort(([_ka, va], [_kb, vb]) => {
		return va - vb
	})

	if (entrySorted.length === 1) {
		return entrySorted[0][0]
	}
	return entrySorted[0][1] === entrySorted[1][1] ? "0" : entrySorted[0][0]

}

export const parseDiagnostics = (diagnostics) => {
	const data = diagnostics.split('\n').map(bit => bit.split(''))
	data.pop()
	return data
}

const getDiagnosticRate = (diagnosticData, callback) => {
	return parseInt(diagnosticData.reduce((acc, val) => {
		val.forEach((b, index) => {
			if (!acc[index]) {
				acc[index] = []
			}
			acc[index].push(b)
		})
		return acc
	}, [])
		.map(callback)
		.join(''), 2)
}

export const getConsumption = (diagnosticData) => {
	const gammaRate = getDiagnosticRate(diagnosticData, getMostCommon)
	const epsilonRate = getDiagnosticRate(diagnosticData, getLessCommon)
	return {
		gammaRate,
		epsilonRate,
		consumption: gammaRate * epsilonRate
	}
}

const getRowsByIndex = (diagnosticData, index, callback) => {
	const lookForVal = callback(diagnosticData.reduce((acc, val) => {
		acc.push(val[index])
		return acc
	}, []))

	const res = diagnosticData.reduce((acc, val) => {
		if (val[index] === lookForVal) {
			acc.push(val)
		}
		return acc
	}, [])
	return res
}

const getLifeSupportRate = (diagnosticData, callback) => {
	let index = 0
	let data = diagnosticData
	while (true) {
		data = getRowsByIndex(data, index, callback)
		if (data.length === 1) {
			break
		}
		index++
	}
	return parseInt(data[0].join(''), 2)
}

export const getLifeSupport = (diagnosticData) => {
	const oxygenGeneratorRating = getLifeSupportRate(diagnosticData, getMostCommon)
	const co2ScrubberRate = getLifeSupportRate(diagnosticData, getLessCommon)
	const lifeSupportRate = oxygenGeneratorRating * co2ScrubberRate
	return {
		oxygenGeneratorRating,
		co2ScrubberRate,
		lifeSupportRate
	}
}
