import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      dateDue: "",
      priority: "low",
      isCompleted: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Données du formulaire:", data);
    reset();
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h1 className="mb-4">Formulaire de Tâche</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nom *</Form.Label>
              <Form.Control
                type="text"
                {...register("name", { required: "Le nom est requis" })}
                placeholder="Entrez le nom de la tâche"
                isInvalid={!!errors.name}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="dateDue">
              <Form.Label>Date *</Form.Label>
              <Form.Control
                type="date"
                {...register("dateDue", { required: "La date est requise" })}
                isInvalid={!!errors.dateDue}
              />
              {errors.dateDue && (
                <Form.Control.Feedback type="invalid">
                  {errors.dateDue.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="priority">
              <Form.Label>Priorité</Form.Label>
              <Form.Select {...register("priority")}>
                <option value="low">Basse</option>
                <option value="medium">Moyenne</option>
                <option value="high">Elevée</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="isCompleted">
              <Form.Check
                type="checkbox"
                {...register("isCompleted")}
                label="Tâche terminée"
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
