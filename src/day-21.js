
export const parsePlayers = (data) => {
	const players = data.split('\n')
	const player1 = parseInt(players[0].split(' ').pop().trim())
	const player2 = parseInt(players[1].split(' ').pop().trim())
	return {
		player1,
		player2
	}
}

export const playWithDeterministicDie = ({ player1, player2 }) => {
	const roll = (() => {
		let lastRoll = 1
		return () => {
			if (lastRoll > 100) {
				lastRoll = 1
			}
			return lastRoll++
		}
	})()

	const playerRoll = (pos) => {
		let diceResult = pos
		for (let i = 0; i < 3; ++i) {
			diceResult += roll()
		}
		return diceResult % 10 === 0 ? 10 : diceResult % 10
	}

	let player1Score = 0,
		player2Score = 0,
		player1Pos = player1,
		player2Pos = player2

	let rollCount = 0

	while (true) {
		player1Pos = playerRoll(player1Pos)
		player2Pos = playerRoll(player2Pos)
		player1Score += player1Pos
		rollCount += 3
		if (player1Score >= 1000) {
			break
		}
		player2Score += player2Pos
		rollCount += 3
		if (player2Score >= 1000) {
			break
		}
	}

	console.dir([rollCount, player1Score, player2Score])
	return Math.min(player1Score, player2Score) * rollCount
}
