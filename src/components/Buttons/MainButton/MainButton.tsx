import React, { HTMLAttributes } from 'react'

export interface MainButtonProps extends HTMLAttributes<HTMLButtonElement> {

}

function MainButton(props: MainButtonProps) {
  return (
    <div>MainButton</div>
  )
}

export default MainButton