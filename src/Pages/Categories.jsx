import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from 'axios';


function Categories() {
  const [categories, SetCategories] = useState([]);

    //liste des catégorie
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((response) => SetCategories(response.data))
      .catch((error) =>
        console.error("Erreur lors du chargement des categories :", error),
      );
  }, []);

  // button modal start add categorie
  const [show, setAddCategory] = useState(false);
  const handleClose = () => setAddCategory(false);
  const addCategory = () => setAddCategory(true);
  // button modal end add categorie

  // Enregistrer un achat
  const [formData, SetFormData] = useState({
    nom: "",
    description: "",
  });

  const ajouterCategorie = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/categories", formData)
      .then((response) => {
        SetCategories([...categories, response.data]);
        // 2. Vider les champs du formulaire après ajout
        SetFormData({ nom: "", description: "" });
        // 3. Fermer la modale après insertion
        handleClose();
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout", error);
      });
  };

    // button modal start detail categorie
    const [showDetail, setDetailCategory] = useState(false);
    const handleCloseDetail = () => setDetailCategory(false);
    const detailCategory = () => setDetailCategory(true);
    // selectionne la catégorie selectionnée  
    const [selectedCategorie, setSelectedCategorie] = useState(null); 
    // button modal end detail categorie

    // Voir details
    const voirDetail = (id) => {
        axios.get(`http://localhost:8000/api/categories/${id}`)
        .then((response) => {
            // stocke la catégorie réçue
            setSelectedCategorie(response.data)
            setDetailCategory(true)
        })
        .catch((error) => console.error('Erreur du chargement de detail', error));
    }


  return (
    <>
      {/* button add category */}
      <div className="page-title container mt-5 mb-3">
        <h1 className="text-primary">
          <i className="bi bi-person me-2"></i>Categories
        </h1>
        {/* <Button type="button" className="btn btn-primary" onClick={addCategory}>
          <i className="bi bi-plus me-2"></i> Ajouter
        </Button> */}
      </div>

      {/* table of category */}
      <Table responsive bordered hover className="container mt-3">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((categorie, index) => (
            <tr key={categorie.id || index}>
              <td>{index + 1} </td>
              <td>{categorie.nom} </td>
              <td>
                {categorie.description ?? "😞 Aucune description disponible"}
              </td>
              {/* <td> */}
                {/* <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => voirDetail(categorie.id)}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button type="button" className="btn btn-warning">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button type="button" className="btn btn-primary">
                    <i className="bi bi-trash"></i>
                  </button>
                </div> */}
              {/* </td> */}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* modal add category */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary fs-5">
            Ajouter une Catégorie
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={ajouterCategorie}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicNom">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer le nom"
                value={formData.nom}
                onChange={(e) =>
                  SetFormData({ ...formData, nom: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="description"
                value={formData.description}
                onChange={(e) =>
                  SetFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="primary" type="submit">
              Enregistrer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* modal detail */}
      <Modal
        show={showDetail}
        onHide={handleCloseDetail}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary fs-5">
            Détail du Catégorie
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCategorie && (
            <div>
              <h1>{selectedCategorie.nom} </h1>
              <p>{selectedCategorie.description ?? "😔 Aucune description"} </p>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetail}>
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Categories;
