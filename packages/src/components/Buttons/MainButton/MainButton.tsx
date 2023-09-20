import React, { HTMLAttributes } from 'react'
import './index.css'

export interface MainButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

function MainButton(props: MainButtonProps) {
  return (
    <button className='main-button-container' {...props}>{props.children}</button>
  )
}

export default MainButton