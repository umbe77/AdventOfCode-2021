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

const arr = ["1", "1", "1", "1"]
const res = Object.entries(
	arr.reduce((acc, val) => {
		acc[val] = acc[val] ? acc[val] + 1 : 1
		return acc
	}, {})
)
console.dir(res)
const r = res.reduce((acc, val) => val[1] > acc[1] ? val : acc, [null, 0])
console.dir(r)

const s = res.sort(([_ka, va], [_kb, vb]) => {
	return vb - va
})
console.dir(s)

if (s[0][1] === s[1][1] ) {
	console.log('1')
}
else {
	console.log(s[0][0])
}
