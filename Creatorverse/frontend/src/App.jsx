import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg
import ShowCreators from './pages/ShowCreators'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (

    <>
      <Routes>
        <Route path="/" element={<ShowCreators />} />
        <Route path="/ShowCreators" element={<ShowCreators />} />
      </Routes>
  
    </>
  )
}

export default App
