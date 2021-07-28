import React from 'react'
import { useState } from 'react'
import './App.scss'
import Grid from './components/Grid'
import { getComputerMove, getWinner } from './algorithms'
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

    console.log(getWinner(gameState))

    const [isUserFirstMove, setisUserFirstMove] = useState(!true)
    const userSymbol     = isUserFirstMove ? 'X' : 'O' 
    const opponentSymbol = isUserFirstMove ? 'O' : 'X' 

    const [isOpponentMove, setIsOpponentMove] = useState(false)

    const [isGameStarted, setIsGameStarted] = useState(false)
    const [winner, setWinner] = useState<'X' | 'O' | undefined>()

    const handleUserMove = (i: number, j: number) => {
        if (!isGameStarted) return
        if (isOpponentMove) return
        if (gameState[i][j] !== ' ') return

        setGameState(prev => {
            return prev.map((row,r) => {
                return row.map((value,c) => {
                    return i === r && j === c ? userSymbol : value
                })
            }) as GameState
        })

        handleOpponentMove()
    }

    const handleOpponentMove = async () => {
        setIsOpponentMove(true)

        await sleep(200)
        setGameState(prev => {
            const [i,j]  = getComputerMove(prev, userSymbol, opponentSymbol)
            return prev.map((row,r) => {
                return row.map((value,c) => {
                    return i === r && j === c ? opponentSymbol : value
                })
            }) as GameState
        })
        setIsOpponentMove(false)
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
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
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
