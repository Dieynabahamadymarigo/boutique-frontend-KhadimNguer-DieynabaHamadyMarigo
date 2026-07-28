import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'


function Acheteurs() {
  const [acheteurs, SetAcheteurs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/acheteurs")
      .then((response) => response.json())
      .then((data) => SetAcheteurs(data))

      .catch((error) =>
        console.error("Erreur lors du chargement des acheteurs :", error),
      );
  }, []);

  // button modal start
  const [show, setAddPAcheteur] = useState(false);

  const handleClose = () => setAddPAcheteur(false);
  const addAcheteur = () => setAddPAcheteur(true);
  // button modal end

  return (
    <>
      {/* button add acheteurs */}
      <div className="page-title container mt-3 mb-3">
        <h1 className="text-primary">
          <i className="bi bi-person me-2"></i>Acheteurs
        </h1>
        <Button type="button" className="btn btn-primary" onClick={addAcheteur}>
          <i className="bi bi-plus me-2"></i> Ajouter
        </Button>
      </div>

      {/* table of acheteurs */}
      <Table responsive bordered hover className="container">
        <thead className="table-light">
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {acheteurs.map((acheteur) => (
            <tr key={acheteur.id}>
              <td>{acheteur.nom} </td>
              <td>{acheteur.email}</td>
              <td>{acheteur.telephone ?? "Non renseigné"}</td>
              <td>
                <div className="d-flex gap-2">
                  <button type="button" className="btn btn-info">
                    <i className="bi bi-eye"></i>
                  </button>
                  <button type="button" className="btn btn-warning">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button type="button" className="btn btn-primary">
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* modal add acheteurs */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary fs-5">
            Ajouter un acheteur
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicNom">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" placeholder="Entrer le nom" required />
              {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="description" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" type="submit">
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Acheteurs
