
export const parseBits = (data) => {
	if (data.endsWith("\n")) {
		data = data.split('\n')[0]
	}
	return data.split('').map(hex => parseInt(hex, 16).toString(2).padStart(4, '0')).join('').split('')
}

const readBinary = (bits, len) => {
	const result = (new Array(len)).fill('0')
	for (let i = 0; i < len; ++i) {
		result[i] = bits.shift()
	}

	return parseInt(result.join(''), 2)
}

const readLiteralValue = (bits, parentPacket, packet) => {
	const values = []
	let bit = 0
	do {
		bit = parseInt(bits.shift())
		for (let i = 0; i < 4; ++i) {
			values.push(bits.shift())
		}
	} while (bit === 1)

	packet.value = parseInt(values.join(''), 2)
	parentPacket.packets.push(packet)
	// console.dir([parentPacket.typeId, parentPacket.packets])
}

const readOperatorLengthTypeId1 = (bits, packets, parentPacket, packet) => {
	const totalSubpacket = readBinary(bits, 11)
	for (let i = 0; i < totalSubpacket; ++i) {
		const child = parsePacket(bits, packets, packet)
		if (parentPacket) {
			parentPacket.packets.push(child)
		}
		// console.dir([parentPacket.typeId, parentPacket.packets])
	}
}

const copyBits = (bits, len) => {
	const newBits = []
	for (let i = 0; i < len; ++i) {
		newBits.push(bits.shift())
	}
	return newBits
}
const readOperatorLengthTypeId0 = (bits, packets, parentPacket, packet) => {
	const length = readBinary(bits, 15)

	const bitsOperator = copyBits(bits, length)

	while (bitsOperator.length > 0) {
		const child = parsePacket(bitsOperator, packets, packet)
		if (parentPacket) {
			parentPacket.packets.push(child)
		}
		// console.dir([parentPacket.typeId, parentPacket.packets])
	}
}

const readOperator = (bits, packets, parentPacket, packet) => {
	const lengthTypeId = bits.shift()
	if (lengthTypeId === '0') {
		readOperatorLengthTypeId0(bits, packets, parentPacket, packet)
	}
	else {
		readOperatorLengthTypeId1(bits, packets, parentPacket, packet)
	}
}

const parsePacket = (bits, packets, parentPacket = null) => {
	const version = readBinary(bits, 3)
	const typeId = readBinary(bits, 3)
	const packet = {
		version, typeId, value: 0, packets: []
	}
	packets.push(packet)

	if (typeId !== 4) {
		readOperator(bits, packets, parentPacket, packet)
		switch (typeId) {
			case 0:
				// console.dir([0, packet.packets])
				packet.value = packet.packets.reduce((acc, { value }) => acc += value, 0)
				break
			case 1:
				// console.dir([1, packet.packets])
				packet.value = packet.packets.reduce((acc, { value }) => acc *= value, 1)
				break
			case 2:
				packet.value = Math.min(...packet.packets.map(({ value }) => value))
				break
			case 3:
				packet.value = Math.max(...packet.packets.map(({ value }) => value))
				break
			case 5:
				packet.value = (packet.packets[0].value > packet.packets[1].value) ? 1 : 0
				break
			case 6:
				packet.value = (packet.packets[0].value < packet.packets[1].value) ? 1 : 0
				break
			case 7:
				packet.value = (packet.packets[0].value === packet.packets[1].value) ? 1 : 0
				break
		}
	}
	else {
		readLiteralValue(bits, parentPacket, packet)
	}
	return packet
}

export const convertMessage = (bits) => {
	const message = bits.slice()
	const packets = []

	parsePacket(message, packets)

	return [packets.reduce((acc, p) => acc += p.version, 0), packets[0].value]
}
