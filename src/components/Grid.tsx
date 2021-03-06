import React from 'react'
import clsx from 'clsx'
import { IoCloseSharp } from 'react-icons/io5'
import { AiOutlineClose} from 'react-icons/ai'
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
                        <div className={"grid__row"} key={i}>
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
                                        key={j}
                                    >
                                        {symbol !== ' ' && (
                                            <ReactIcon 
                                                className={clsx(
                                                    'grid__row__cell__icon',
                                                    symbol === 'X'
                                                        ? 'grid__row__cell__icon--X'
                                                        : 'grid__row__cell__icon--O'
                                                )}
                                                Icon={symbol === 'X' 
                                                    ? AiOutlineClose //GrClose // IoCloseSharp
                                                    : FiCircle
                                                }
                                                color={symbol === 'X' ? 'rgb(20, 100, 100)' : '#fff'}
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
 