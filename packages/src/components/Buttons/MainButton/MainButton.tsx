import React, { HTMLAttributes } from 'react'

export interface MainButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

function MainButton(props: MainButtonProps) {
  return (
    <button>{props.children}</button>
  )
}

export default MainButton