import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import About from './pages/About'
import Contacts from './pages/Contacts'
import Projects from './pages/Projects'
import Services from './pages/Services'
import Homes from './pages/Homes.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'




function App() {


  return (
    <div>
      <Router>
        <Header/>
       <Routes>
          <Route path='/' element={<Homes/> } />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contacts/>} />
        <Route path="/project" element={<Projects/>} />
        <Route path="/service" element={<Services/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
