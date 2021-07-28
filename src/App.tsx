import React, { useEffect } from 'react'
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

    const [isUserFirstMove, setisUserFirstMove] = useState(!true)
    const userSymbol     = isUserFirstMove ? 'X' : 'O' 
    const opponentSymbol = isUserFirstMove ? 'O' : 'X' 

    const [isOpponentMove, setIsOpponentMove] = useState(true)

    const [isGameStarted, setIsGameStarted] = useState(false)
    const [outcome, setOutcome] = useState<'X' | 'O' | 'tie' | undefined>()

    useEffect(() => {
        if (!outcome) return 

        (async () => {
            await sleep(2000)
            setOutcome(undefined)
        })()

    }, [outcome])

    useEffect(() => {
        const isTieGame = gameState.every(row => row.every(space => space !== ' '))

        if (isTieGame) setOutcome('tie')
    }, [gameState])

    const handleUserMove = (i: number, j: number) => {
        if (!isGameStarted) return
        if (isOpponentMove) return
        if (outcome) return
        if (gameState[i][j] !== ' ') return

        const nextState = handlePlayerMove(gameState,i,j,userSymbol)
        setGameState(nextState)

        const winner = getWinner(nextState)

        if (winner) {
            setOutcome(winner)
        } else {
            handleOpponentMove()
        }

    }

    const handleOpponentMove = async () => {
        setIsOpponentMove(true)

        await sleep(200)
        setGameState(prev => {
            const [i,j]  = getComputerMove(prev, userSymbol, opponentSymbol)
            const nextState = handlePlayerMove(prev,i,j, opponentSymbol)
            setOutcome(getWinner(nextState))
            
            return nextState
        })
        await sleep(100)
        setIsOpponentMove(false)
    }

    const handlePlayerMove = (prevState: GameState, i: number, j: number, symbol: string) => {
        return prevState.map((row,r) => {
            return row.map((value,c) => {
                return i === r && j === c ? symbol : value
            })
        }) as GameState
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

            {outcome && (
                <span className="winner-declaration">
                    {outcome === 'tie' 
                        ? 'CATZ (Tie Game)'
                        : `${outcome}s WIN!`}
                </span>
            )}

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
        </div>
    )
}

export default App;
