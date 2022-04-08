import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MusicList from './components/MusicList'
import AddMusic from './components/AddMusic'
import About from './components/About'
import MusicDetails from './components/MusicDetails'
import { Provider } from 'react-redux'
import { store } from './app/store'

const App = () => {
  const [showAddMusic, setShowAddMusic] = useState(false)
  
  return (
    <Provider store={store}>
      <Router>
        <div className='container'>
          <Header onAdd={() => setShowAddMusic(!showAddMusic)} showAdd={showAddMusic} />
          <Routes>
            <Route path='/' element={
              <>
                {showAddMusic && <AddMusic />}
                <MusicList />
              </>
            } />
            <Route path='/about' element={<About />} />
            <Route path='/music/:id' element={<MusicDetails />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  )
}

export default App