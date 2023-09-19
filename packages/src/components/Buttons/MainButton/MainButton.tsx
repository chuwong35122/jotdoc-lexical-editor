import React, { HTMLAttributes } from 'react'

export interface MainButtonProps extends HTMLAttributes<HTMLButtonElement> {

}

function MainButton(props: MainButtonProps) {
  return (
    <button>MainButton</button>
  )
}

export default MainButton