import clsx from 'clsx'
import React from 'react'

type PlayerSymbol = 'X' | 'O'

type Props = {
    onSelectSymbol: (symbol: PlayerSymbol) => void
    onToggleFirstMove: () => void
    selectedSymbol: PlayerSymbol
    isUserFirstMove: boolean
}

export default function QuickSettingsMenu(props: Props) {

    const { 
        onSelectSymbol, 
        onToggleFirstMove,
        selectedSymbol,
        isUserFirstMove
    } = props

    return (
        <div className="quick-settings">
            <div className="symbol-select">
                <button 
                    onClick={() => onSelectSymbol('X')} 
                    className="symbol-select__X"
                >
                    <span className={selectedSymbol === 'X' 
                        ? 'symbol-select__X--selected'
                        : 'symbol-select__X--deselected'}
                    >
                        X
                    </span>
                </button>
                <button 
                    onClick={() => onSelectSymbol('O')} 
                    className="symbol-select__O"
                >
                    <span className={selectedSymbol === 'O' 
                        ? 'symbol-select__O--selected'
                        : 'symbol-select__O--deselected'}
                    >
                        O
                    </span>
                </button>
            </div>

            <div className="first-move-toggle">

            </div>
        </div>
    )
}
