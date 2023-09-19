import { useState } from 'react'
import MainButton from '../../packages/src/components/Buttons/index'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MainButton />
  )
}

export default App
