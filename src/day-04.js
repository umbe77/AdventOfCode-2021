
export const parseBingoInput = (bingodata) => {
	const lines = bingodata.split('\n')
	const bingo = {
		"drawn": [],
		"boards": []
	}
	let boardLineIndex = 0
	let currentBoard = {}
	lines.forEach((line, index) => {
		if (index == 0) {
			bingo.drawn = line.split(',')
			return
		}
		if (line === '') {
			if (index > 2) {
				bingo.boards.push(currentBoard)
			}

			boardLineIndex = 0
			currentBoard = {
				"lines": [[], [], [], [], []],
				"columns": [[], [], [], [], []],
				"drawnPerLine": [0, 0, 0, 0, 0],
				"drawnPerColumn": [0, 0, 0, 0, 0]
			}
			return
		}
		const boardLine = line.trim().split(/\s+/)
		boardLine.forEach((number, columnIndex) => {
			currentBoard["lines"][boardLineIndex].push({ "number": number, "isDrawn": false })
			currentBoard["columns"][columnIndex].push({ "number": number, "isDrawn": false })
		})
		boardLineIndex++
	})
	return bingo
}

const markBoard = (board, numbers, numberDrawn, drawnProperty) => {
	for (let i = 0; i < numbers.length; ++i) {
		const line = numbers[i]
		line.forEach((boardNumber, index) => {
			if (parseInt(boardNumber.number) === parseInt(numberDrawn)) {
				boardNumber.isDrawn = true
				board[drawnProperty][index]++
			}
		})
	}
}

const isWinner = (numbers) => {
	for (const count of numbers) {
		if (count === 5) {
			return true
		}
	}
	return false
}

export const getLastWinningBoard = ({ drawn, boards }) => {
	// let lastWinnigNumber = 0
	// let winningBoard = undefined
	const winningBoards = []
	for (const numberDrawn of drawn) {
		for (let boardIndex = 0; boardIndex < boards.length; ++boardIndex) {
			const board = boards[boardIndex]

			const { lines, columns } = board
			markBoard(board, lines, numberDrawn, "drawnPerLine")
			markBoard(board, columns, numberDrawn, "drawnPerColumn")

			const linesWinning = isWinner(board.drawnPerLine)
			const columnsWinning = isWinner(board.drawnPerColumn)

			if (linesWinning || columnsWinning) {
				if (!winningBoards.find(v => v.boardIndex === boardIndex)) {
					let boardUnmarked = 0
					board.lines.forEach(line => {
						line.forEach(({ number, isDrawn }) => {
							if (!isDrawn) {
								boardUnmarked += parseInt(number)
							}
						})
					})
					winningBoards.push({
						boardIndex,
						lastWinningCall: parseInt(numberDrawn),
						unmarked: boardUnmarked,
						lastWinningScore: boardUnmarked * numberDrawn
					})
				}
			}
		}
	}

	// console.log(winningBoards[winningBoards.length - 1].boardIndex)
	return winningBoards[winningBoards.length - 1]
}

export const playBingo = ({ drawn, boards }) => {
	let lastWinnigNumber = 0
	let winningBoard = undefined
	for (const numberDrawn of drawn) {
		for (const board of boards) {
			const { lines, columns } = board
			markBoard(board, lines, numberDrawn, "drawnPerLine")
			markBoard(board, columns, numberDrawn, "drawnPerColumn")

			const linesWinning = isWinner(board.drawnPerLine)
			const columnsWinning = isWinner(board.drawnPerColumn)

			if (linesWinning || columnsWinning) {
				winningBoard = board
				lastWinnigNumber = numberDrawn
				break
			}
		}
		if (lastWinnigNumber > 0) {
			break
		}
	}

	let unmarked = 0
	winningBoard.lines.forEach(line => {
		line.forEach(({ number, isDrawn }) => {
			if (!isDrawn) {
				unmarked += parseInt(number)
			}
		})
	})

	return {
		lastWinningCall: parseInt(lastWinnigNumber),
		unmarked: unmarked,
		score: unmarked * lastWinnigNumber
	}
}
