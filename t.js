const measurments = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]

const lastGoodIndex = measurments.length - 2

measurments.forEach((v, index) => {
	if (index >= lastGoodIndex) {
		console.log(`result undefined`)
		return
	}
	const a = measurments.slice(index, index + 3).reduce((acc, v) => acc + v, 0)
	console.log(a)
})
