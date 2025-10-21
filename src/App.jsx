import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    dateDue: "",
    priority: "low",
    isCompleted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données du formulaire:", formData);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h1 className="mb-4">Formulaire de Tâche</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nom *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Entrez le nom de la tâche"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dateDue">
              <Form.Label>Date *</Form.Label>
              <Form.Control
                type="date"
                name="dateDue"
                value={formData.dateDue}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="priority">
              <Form.Label>Priorité</Form.Label>
              <Form.Select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Basse</option>
                <option value="medium">Moyenne</option>
                <option value="high">Elevée</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="isCompleted">
              <Form.Check
                type="checkbox"
                name="isCompleted"
                label="Tâche terminée"
                checked={formData.isCompleted}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Envoyer
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
