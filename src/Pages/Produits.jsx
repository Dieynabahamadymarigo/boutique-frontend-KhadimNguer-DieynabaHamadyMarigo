import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


function Produits() {
  const [produits, SetProduits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/produits")
      .then((response) => response.json())
      .then((data) => SetProduits(data))

      .catch((error) =>
        console.error("Erreur lors du chargement des produits :", error),
      );
  }, []);

  // button modal start add produit
  const [show, setAddProduct] = useState(false);

  const handleClose = () => setAddProduct(false);
  const addProduct = () => setAddProduct(true);
  // button modal end add produit

  // button modal start detail  produit
  const [showDetail, setDetailProduct] = useState(false);
  const handleCloseProduct = () => setDetailProduct(false);
  const detailProduct = () => setDetailProduct(true);
  // selectionne la catégorie selectionnée
  const [selectedProduct, setSelectedProduct] = useState(null);
  // button modal end detail produit

  // Voir details
  const voirDetail = (id) => {
    axios
      .get(`http://localhost:8000/api/produits/${id}`)
      .then((response) => {
        // stocke la catégorie réçue
        setSelectedProduct(response.data);
        setDetailProduct(true);
      })
      .catch((error) => console.error("Erreur du chargement de detail", error));
  };

  return (
    <>
      {/* button product */}
      <div className="page-title container mt-5 mb-3">
        <h1 className="text-primary">
          <i className="bi bi-file-text me-2"></i>Produits
        </h1>
        {/* <Button type="button" className="btn btn-primary" onClick={addProduct}>
          <i className="bi bi-plus me-2"></i> Ajouter
        </Button> */}
      </div>

      {/* table of product */}
      <Table responsive bordered hover className="container mt-3">
        <thead className="table-light">
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th>Stock</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((produit) => (
            <tr key={produit.id}>
              <td>{produit.nom} </td>
              <td>{produit.prix} Frc</td>
              <td>{produit.stock}</td>
              <td>{produit.categorie?.nom ?? "😔 Aucune catégorie"}</td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => voirDetail(produit.id)}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  {/* <button type="button" className="btn btn-warning">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button type="button" className="btn btn-primary">
                    <i className="bi bi-trash"></i>
                  </button> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* modal detail */}
      <Modal
        show={showDetail}
        onHide={handleCloseProduct}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary fs-5">
            Détail du Catégorie
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div>
              <h1 className='text-secondary' >{selectedProduct.nom} </h1>
              <p>Prix : {selectedProduct.prix} Frc </p>
              <p>Stock : {selectedProduct.stock} </p>
              <p>Catégorie : {selectedProduct.categorie?.nom}  </p>
              <p>Description : {selectedProduct.description} </p>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProduct}>
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default Produits;
