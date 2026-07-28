import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Categories from "../Pages/Categories";



function DetailCategorie(){

    const {id} = useParams();
        console.log(id);

    const [deatilCategorie, setDetailCategorie] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/categories/${id}`)
        .then((response) =>{
            setDetailCategorie(response.data)
        })
        .catch((error) => console.log (error,`${id}`))
    },[id])

    return (
      <>
        <div className="container mt-5 d-flex justify-content-between flex-wrap p-4 card-detail">
          <h1 className="title">{deatilCategorie.nom}</h1>
          <div className="">
            <h3>{deatilCategorie.description}</h3>
            <p className="mt-2">Produits associés :</p>
            {deatilCategorie.produits && deatilCategorie.produits.length > 0 ? (
              <ul>
                {deatilCategorie.produits.map((produit) => (
                  <li className="list-style-none" key={produit.id} >
                    {produit.nom} - {produit.prix} Frc
                  </li>
                ))}
              </ul>
            ) : (
              <p>😔 Aucun produit associé</p>
            )}
          </div>
        </div>
      </>
    );
}


export default DetailCategorie;