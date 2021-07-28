import { GameState } from "../App";

type Player = 'X' | 'O'
type GridIdx = [number, number]

export const getComputerMove = (gameState: GameState, user: Player, opponent: Player) => {
    
    let possibleMoves: Array<GridIdx> = []
    let bestScore = -1
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameState[i][j] === ' ') {

                gameState[i][j] = opponent

                const score = minimax(gameState, user, opponent, 1)
                if (score === bestScore) {
                    possibleMoves.push([i,j])
                } else if (score > bestScore) {
                    possibleMoves = [[i,j]]
                    bestScore = score
                }

                gameState[i][j] = ' '
            }
        }
    }
    return randomChoice(possibleMoves)
}

const minimax = (gameState: GameState, user: Player, opponent: Player, depth: number) => {
    
    const winner: Player | undefined = getWinner(gameState)
    if (winner) return winner === opponent ? 1 : -1

    const currentPlayer = depth % 2 ? user : opponent
    const childNodes: Array<number> = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameState[i][j] === ' ') {
                gameState[i][j] = currentPlayer
                childNodes.push(minimax(gameState, user, opponent, depth+1))
                gameState[i][j] = ' '
            }
        }
    }

    if (!childNodes.length) return 0

    return depth % 2
        ? Math.min(...childNodes) 
        : Math.max(...childNodes)

}

export const getWinner = (gameState: GameState) => {
    const paths = []
    for (let i = 0; i < 3; i++) {
        paths.push([gameState[i][0], gameState[i][1], gameState[i][2]])
        paths.push([gameState[0][i], gameState[1][i], gameState[2][i]])
    }
    paths.push([gameState[0][0], gameState[1][1], gameState[2][2]])
    paths.push([gameState[0][2], gameState[1][1], gameState[2][0]])

    const winningPath = paths.find(path => {
        return path[0] !== ' ' && path[0] === path[1] && path[0] === path[2]
    })

    return winningPath && (winningPath[0] as Player)
}

const randomChoice = (elems: Array<any>) => {
    const randomIdx = Math.floor(Math.random() * elems.length)
    return elems[randomIdx]
}