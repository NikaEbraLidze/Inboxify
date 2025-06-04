import { Routes, Route } from "react-router-dom";
import Welcome from './pages/Welcome'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Create from './pages/Create'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/create" element={<Create />} />
        <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
      </Routes>
    </>
  )
}

export default App
