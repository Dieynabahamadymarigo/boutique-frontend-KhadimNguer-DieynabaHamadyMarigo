import Banner from "../assets/banner.png"
import Card from "react-bootstrap/Card";
import CardCategories from "../Component/CardCategories";
import axios from 'axios'
import { useEffect, useState } from "react";


function Acceuil(){

  const [categories, setCategories] = useState([]);
  //liste des catégorie
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) =>
        console.error("Erreur lors du chargement des categories :", error),
      );
  }, []);


    return (
      <>
        {/* banner */}
        <div>
          <img src={Banner} alt="banner" className="banner pt-4" />
        </div>

        {/* cards */}
        <h2 className="container mt-5 mb-5 text-primary"><i class="bi bi-columns-gap me-2"></i>Categories</h2>
        <div className=" container mt-4 mb-5 mx-auto justify-content-evenly group-cards">
          {categories.map((categorie) => (
            // <div className="" key={index}>
            <CardCategories
              key={categorie.id}
              titre={categorie.nom}
              description={categorie.description}
              lien={`/categories/${categorie.id}`}
            />
            //  </div>
          ))}
        </div>

        {/* contact us */}
        <div className="container contactUs mb-5">
          <div>
            <h4>
              <i className="bi bi-geo-alt me-2"></i>
              Pikine, Dakar
            </h4>
          </div>
          <div>
            <h4>
              <i className="bi bi-telephone me-2"></i>
              +221 77 676 76 77
            </h4>
          </div>
          <div>
            <h4>
              <i className="bi bi-envelope-at me-2"></i>
              hamadymarigo09@kitchen.sn
            </h4>
          </div>
          <div>
            <h4>
              <i className="bi bi-facebook me-2"></i>
              <i className="bi bi-instagram me-2"></i>
              <i className="bi bi-tiktok me-2"></i>
              <i className="bi bi-whatsapp"></i>
            </h4>
          </div>
        </div>
      </>
    );
}

export default Acceuil