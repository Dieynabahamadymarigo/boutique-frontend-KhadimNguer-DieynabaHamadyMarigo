import './App.css';
import Navigation from './Component/Navbar';
import Acceuil from './Pages/Accueil';
import Categories from './Pages/Categories';
import Produits from "./Pages/Produits";
import Acheteurs from "./Pages/Acheteurs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailCategorie from './Component/DetailCategorie';


function App() {


  return (
    // <>
      <BrowserRouter>
      <Navigation />
        <Routes>

          <Route path="/" element={<Acceuil/>} />
          <Route path="/categories" element={<Categories/>} />
          <Route path="/produits" element={<Produits/>} />
          <Route path="/acheteurs" element={<Acheteurs/>} />
          <Route path="/categories/:id" element={<DetailCategorie/>}/>

        </Routes>
      </BrowserRouter>
    // </>
  );
}

export default App
