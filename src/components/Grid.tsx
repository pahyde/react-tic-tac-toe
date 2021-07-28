import React from 'react'
import clsx from 'clsx'
import { IoCloseSharp } from 'react-icons/io5'
import { FiCircle } from 'react-icons/fi'
import { GrClose } from 'react-icons/gr'
import { GameState } from '../App'
import ReactIcon from './ReactIcon'

type Props = {
    gameState: GameState
    onUserMove: (i: number, j: number) => void
    isGameStarted: boolean
}

export default function Grid({ gameState, onUserMove, isGameStarted }: Props) {
    return (
        <div className="grid-container">
            <div className="grid">
                {gameState.map((row,i) => {
                    return (
                        <div className={"grid__row"}>
                            {row.map((symbol,j) => {
                                return (
                                    <div   
                                        className={clsx(
                                            'grid__row__cell',
                                            i < 2 && 'bottom-border',
                                            i > 0 && 'top-border',
                                            j < 2 && 'right-border',
                                            j > 0 && 'left-border',
                                            !isGameStarted && 'disabled'
                                        )}
                                        onClick={() => onUserMove(i,j)}
                                    >
                                        {symbol !== ' ' && (
                                            <ReactIcon 
                                                className="grid__row__cell--icon"
                                                Icon={symbol === 'X' 
                                                    ? GrClose // IoCloseSharp
                                                    : FiCircle
                                                }
                                            />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
