import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Le nom est requis")
    .min(8, "Le nom doit contenir au moins 8 caractères")
    .max(15, "Le nom ne peut pas dépasser 15 caractères"),
  dateDue: yup
    .string()
    .required("La date est requise")
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "La date doit être au format jj/mm/AAAA"
    )
    .test("date-valid", "La date doit être valide", function (value) {
      if (!value) return false;
      const [day, month, year] = value.split("/").map(Number);
      const date = new Date(year, month - 1, day);
      return (
        date.getDate() === day &&
        date.getMonth() === month - 1 &&
        date.getFullYear() === year
      );
    })
    .test(
      "date-not-past",
      "La date ne peut pas être antérieure à aujourd'hui",
      function (value) {
        if (!value) return false;
        const [day, month, year] = value.split("/").map(Number);
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return inputDate >= today;
      }
    ),
  priority: yup
    .string()
    .oneOf(
      ["low", "medium", "high"],
      "La priorité doit être basse, moyenne ou élevée"
    )
    .required("La priorité est requise"),
  isCompleted: yup.boolean(),
});

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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
                {...register("name")}
                placeholder="Nom de la tâche (8-15 caractères)"
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
                type="text"
                {...register("dateDue")}
                placeholder="JJ/MM/AAAA"
                isInvalid={!!errors.dateDue}
              />
              {errors.dateDue && (
                <Form.Control.Feedback type="invalid">
                  {errors.dateDue.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="priority">
              <Form.Label>Priorité *</Form.Label>
              <Form.Select
                {...register("priority")}
                isInvalid={!!errors.priority}
              >
                <option value="low">Basse</option>
                <option value="medium">Moyenne</option>
                <option value="high">Elevée</option>
              </Form.Select>
              {errors.priority && (
                <Form.Control.Feedback type="invalid">
                  {errors.priority.message}
                </Form.Control.Feedback>
              )}
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
