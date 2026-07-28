import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function CardCategories({titre, description, lien }) {
  return (
    <>
      <div className="">
        <Card className="card">
          <Link to={lien}>
            <Card.Body className="text-center">
              <Card.Title>
                <h6 className="card-title text-primary">{titre}</h6>
              </Card.Title>
              <Card.Text className="card-text">
                <small>{description}</small>
              </Card.Text>
            </Card.Body>
          </Link>
        </Card>
      </div>
    </>
  );
}

export default CardCategories