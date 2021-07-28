import React from 'react'
import { useState } from 'react'
import './App.scss'
import Grid from './components/Grid'
import { minimax } from './algorithms'
import StartResetPanel from './components/StartResetPanel'
import { sleep } from './aux'


type PositionState = 'X' | 'O' | ' '

export type GameState = [
    [PositionState, PositionState, PositionState],
    [PositionState, PositionState, PositionState],
    [PositionState, PositionState, PositionState]
]

function App() {

    const [gameState, setGameState] = useState<GameState>([
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ])

    const [isUserFirstMove, setisUserFirstMove] = useState(true)
    const userSymbol     = isUserFirstMove ? 'X' : 'O' 
    const opponentSymbol = isUserFirstMove ? 'O' : 'X' 

    const [isOpponentMove, setIsOpponentMove] = useState(false)

    const [isGameStarted, setIsGameStarted] = useState(false)
    const [winner, setWinner] = useState<'X' | 'O' | undefined>()

    const handleUserMove = (i: number, j: number) => {
        if (!isGameStarted) return
        if (isOpponentMove) return
        if (gameState[i][j] !== ' ') return

        updateGameState(i, j, userSymbol)
        handleOpponentMove()
    }

    const handleOpponentMove = () => {
        setIsOpponentMove(true)
        // const [i,j] = minimax(gameState, userSymbol, opponentSymbol)
        // sleep(1000)
        // updateGameState(i, j, opponentSymbol)
        setIsOpponentMove(false)
    }

    const updateGameState = (i: number, j: number, symbol: 'X' | 'O') => {
        const gameStateCopy = gameState.map(row => row.map(symbol => symbol)) as GameState
        gameStateCopy[i][j] = symbol
        setGameState(gameStateCopy)
    }

    const handleStartGame = () => {
        handleResetGame()

        setIsGameStarted(true)

        if (!isUserFirstMove) {
            handleOpponentMove()
        }
    }

    const handleResetGame = () => {
        setGameState([
            ['X', ' ', ' '],
            [' ', 'O', ' '],
            ['O', 'X', ' ']
        ])
        setIsGameStarted(false)
    }

    return (
        <div className="app">
            <div className="game-container">
                <Grid 
                    gameState={gameState}
                    onUserMove={handleUserMove}
                    isGameStarted={isGameStarted}
                />
                <StartResetPanel
                    onStartGame={handleStartGame}
                    onResetGame={handleResetGame}
                    isGameStarted={isGameStarted}  
                />
            </div>

            {winner && (
                <></>
            )}
        </div>
    )
}

export default App;
