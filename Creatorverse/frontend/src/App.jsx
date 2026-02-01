import { Routes, Route } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators'
// import AddCreator from './pages/AddCreator'
// import EditCreator from './pages/EditCreator'
import ViewCreator from './pages/ViewCreator'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ShowCreators />} />
        <Route path="/creators" element={<ShowCreators />} />
        {/* <Route path="/add" element={<AddCreator />} /> */}
        {/* <Route path="/edit/:id" element={<EditCreator />} /> */}
        <Route path="/view/:id" element={<ViewCreator />} />
      </Routes>
    </>
  )
}

export default App
