import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/Home'

function App() {
  return (
    <div className="bg-stone-800 h-screen">
      <Navbar />
      <HomePage />
    </div>
  )
}

export default App
