import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { CreateRecordPage } from './pages/Create'
import { HomePage } from './pages/Home'
import { RecordsPage } from './pages/Records'
import loadConfig from './helpers/ConfigHelpers';
import { OpenAPI } from './api'

function App() {
  loadConfig().then((config) => {
    OpenAPI.BASE = config.API_BASE_URL
  })

  return (
    <div className="bg-stone-800">
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
