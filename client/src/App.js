import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Details from './components/Details/Details';
import Favorites from './components/Favorites/Favorites';
import Footer from './components/Home/Footer/Footer';
import Header from './components/Home/Header/Header';
import Home from './components/Home/Home';
import Ranking from './components/Ranking/Ranking';
// import Landing from './components/common/Landing/Landing';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route exact path="/" element={<Landing/>} /> */}
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/favorites" element={<Favorites/>} />
        <Route exact path='/ranking' element={<Ranking/>} />
        <Route exact path='/details/:id' element={<Details/>} />
        {/* <Route exact path='/home/create' element={<CreatePokemon/>} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
