import React from 'react'

type Props = {
    onStartGame: () => void
    onResetGame: () => void
    isGameStarted: boolean
}

export default function StartResetPanel(props: Props) {

    const { onStartGame, onResetGame, isGameStarted } = props

    return (
        <div className="start-reset-panel">
            <button className="start-reset-btn btn" onClick={onStartGame}>
                <span>New Game</span>
            </button>

            <button className="start-reset-btn btn" onClick={onResetGame}>
                <span>Reset Game</span>
            </button>      
        </div>
    )
}
