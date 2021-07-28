import React from 'react'
import { IconContext, IconType } from "react-icons";

type Props = {
	Icon: IconType
	className?: string
	color?: string
}

export default function ReactIcon(props: Props) {

	const { Icon, className, color } = props

	return (
		<IconContext.Provider value={{ className,  color }}>
			<Icon />
		</IconContext.Provider>
	)
}