import { Routes, Route } from "react-router-dom";
import Welcome from './pages/Welcome'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Create from './pages/Create'
import ProtectedRoute from './components/ProtectedRoute'
import Sent from "./pages/Sent"
import Draft from './pages/Draft'
import Trash from './pages/Trash'
import Message from "./pages/Message";

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

        <Route path="/sent" element={
            <ProtectedRoute>
              <Sent />
            </ProtectedRoute>
        } />

        <Route path="/draft" element={
            <ProtectedRoute>
              <Draft />
            </ProtectedRoute>
        } />

        <Route path="/trash" element={
            <ProtectedRoute>
              <Trash />
            </ProtectedRoute>
        } />
          
        <Route path="/message/:id" element={
          <ProtectedRoute>
            <Message />
          </ProtectedRoute>
        } />

      </Routes>
    </>
  )
}

export default App
