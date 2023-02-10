import { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { CreateRecordPage } from './pages/Create'
import { HomePage } from './pages/Home'
import { RecordsPage } from './pages/Records'

function App() {
  return (
    <div className="bg-stone-800 h-screen">
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<CreateRecordPage />} />
          <Route path="/records" element={<RecordsPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
