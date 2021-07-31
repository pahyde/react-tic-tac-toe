import React, { useEffect } from 'react'
import { useState } from 'react'
import './App.scss'
import Grid from './components/Grid'
import { getComputerMove, getWinner } from './algorithms'
import StartResetPanel from './components/StartResetPanel'
import { sleep } from './aux'
import { useMemo } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import SettingsMenu from './components/SettingsMenu'
import ReactIcon from './components/ReactIcon'
import { Route, Link, useLocation } from 'react-router-dom' 
import QuickSettingsMenu from './components/QuickSettingsMenu'


type PositionState = 'X' | 'O' | ' '

export type GameState = [
    [PositionState, PositionState, PositionState],
    [PositionState, PositionState, PositionState],
    [PositionState, PositionState, PositionState]
]

type GameOutcome = 'X' | 'O' | 'TIE' | undefined
type OutcomeMessage =
    | 'X\'s WIN!'
    | 'O\'s WIN!'
    | 'TIE GAME'
    | null

type TurnNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

function App() {

    const { pathname } = useLocation()

    const [gameState, setGameState] = useState<GameState>([
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ])

    const gameOutcome = useMemo<GameOutcome>(() => {
        const winner = getWinner(gameState)
        if (winner) return winner

        const isTie = gameState.every(row => row.every(space => space !== ' '))
        if (isTie) return 'TIE'
    }, [gameState])

    const [outcomeMessage, setOutcomeMessage] = useState<OutcomeMessage>(null)


    const [isUserFirstMove, setisUserFirstMove] = useState(!true)
    const [userSymbol, setUserSymbol] = useState<'X' | 'O'>('X')
    const opponentSymbol = userSymbol === 'X' ? 'O' : 'X'

    const [turn, setTurn] = useState<TurnNumber>(0)
    const isUserMove = turn % 2 ? !isUserFirstMove : isUserFirstMove 
    const [isGameStarted, setIsGameStarted] = useState(false)
    const [newGameBtnEnabled, setNewGameBtnEnabled] = useState(true)

    useEffect(() => {
        if (turn < 1) return

        setNewGameBtnEnabled(true)
        
        if (gameOutcome) {
            displayOutcomeMessage()
        } else if (!isUserMove) {
            handleOpponentMove()
        }
    }, [turn])


    const displayOutcomeMessage = async () => {
        let message: OutcomeMessage = null
        if (gameOutcome === 'X')   message = 'X\'s WIN!'
        if (gameOutcome === 'O')   message = 'O\'s WIN!'
        if (gameOutcome === 'TIE') message = 'TIE GAME'
        setOutcomeMessage(message)
        await sleep(2000)
        setOutcomeMessage(null)
    }

    const handleOpponentMove = async () => {
        await sleep(200)
        setGameState(prev => {
            const [i,j]  = getComputerMove(prev, userSymbol, opponentSymbol)
            const nextState = handlePlayerMove(prev,i,j, opponentSymbol)
            return nextState
        })
        setTurn(prev => prev + 1 as TurnNumber)
    }

    const handleUserMove = (i: number, j: number) => {
        if (!isUserMove) return
        if (gameOutcome) return
        if (gameState[i][j] !== ' ') return

        const nextState = handlePlayerMove(gameState,i,j,userSymbol)
        setGameState(nextState)
        setTurn(prev => prev + 1 as TurnNumber)
    }

    const handlePlayerMove = (prevState: GameState, i: number, j: number, symbol: string) => {
        return prevState.map((row,r) => {
            return row.map((value,c) => {
                return i === r && j === c ? symbol : value
            })
        }) as GameState
    }


    const handleStartGame = () => {
        if (!newGameBtnEnabled) return

        handleResetGame()
        setIsGameStarted(true)

        if (!isUserFirstMove) {
            setNewGameBtnEnabled(false)
            handleOpponentMove()
        }
    }

    const handleResetGame = () => {
        setIsGameStarted(false)
        setGameState([
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ])
        setTurn(0)
    }

    const handleSelectSymbol = (symbol: 'X' | 'O') => {
        setUserSymbol(symbol)
    }

    return (
        <div className="app">

            <Route exact path="/settings">
                <SettingsMenu />
            </Route>
            

            {outcomeMessage && (
                <span className="winner-declaration">
                    {outcomeMessage}
                </span>
            )}

            <Link   
                to={pathname === '/' ? '/settings' : '/'}
                className="menu-btn"
            >
                <ReactIcon
                    Icon={GiHamburgerMenu}
                    className={'menu-btn__icon'}
                    color={'#fff'}
                />
            </Link>

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
            
            <QuickSettingsMenu 
                onSelectSymbol={handleSelectSymbol}
                onToggleFirstMove={() => {}}
                selectedSymbol={userSymbol}
                isUserFirstMove={isUserFirstMove}
            />
        </div>
    )
}

export default App;
