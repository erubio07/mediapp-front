import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./CreateDocuments.module.css";

const CreateDocuments = () => {
  const [input, setInput] = useState({
    expediente: "",
    number: "",
    date: "",
    hour: "",
    start: "",
    end: "",
    nextDate: "",
    requirente: {
      name: "",
      dni: "",
    },
    requerido: {
      name: "",
      dni: "",
    },
  });
  console.log(input);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setInput((prevState) => {
      // Verificamos si el campo pertenece a 'requirente' o 'requerido'
      if (name.includes("requirente.") || name.includes("requerido.")) {
        const [parent, field] = name.split(".");
        return {
          ...prevState,
          [parent]: {
            ...prevState[parent],
            [field]: value,
          },
        };
      }

      return { ...prevState, [name]: value };
    });
  };

  const generateDocument = async () => {
    try {
      const response = await axios.post("http://localhost:3000/fill", input, {
        responseType: "blob", // Especificar que la respuesta es un blob
      });

      // Crear un blob a partir del archivo recibido
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // Crear un enlace de descarga temporal
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `documento_${"generico"}.docx`; // Usar el nombre ingresado o un valor genérico
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Liberar el objeto URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error descargando el documento:", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (
        !input.expediente ||
        !input.number ||
        !input.date ||
        !input.requirente.name ||
        !input.requirente.dni ||
        !input.requerido.name ||
        !input.requerido.dni
      )
        alert("Se debe ingresar un nombre para proceder");
      await generateDocument();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.createDocuments}>
      <h1 className={styles.title}>Crear Documentos</h1>
      <Form onSubmit={handleCreate} className={styles.form}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Carátula de Expediente: </Form.Label>
          <Form.Control
            type="text"
            name="expediente"
            placeholder="Ingrese una Carátula"
            value={input.expediente}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>Número: </Form.Label>
          <Form.Control
            type="text"
            name="number"
            placeholder="Ingrese el Número del Expediente"
            value={input.number}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>Fecha: </Form.Label>
          <Form.Control
            type="text"
            name="date"
            placeholder="Ingrese la Fecha"
            value={input.date}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>Hora: </Form.Label>
          <Form.Control
            type="text"
            name="hour"
            placeholder="Ingrese la Hora"
            value={input.hour}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>Nombre del Requirente: </Form.Label>
          <Form.Control
            type="text"
            name="requirente.name"
            placeholder="Ingrese el nombre del Requirente"
            value={input.requirente.name}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>DNI Requirente: </Form.Label>
          <Form.Control
            type="text"
            name="requirente.dni"
            placeholder="Ingrese el DNI del Requirente"
            value={input.requirente.dni}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>Nombre del Requerido: </Form.Label>
          <Form.Control
            type="text"
            name="requerido.name"
            placeholder="Ingrese el nombre del Requerido"
            value={input.requerido.name}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>DNI: </Form.Label>
          <Form.Control
            type="text"
            name="requerido.dni"
            placeholder="Ingrese el DNI del Requerido"
            value={input.requerido.dni}
            onChange={handleInput}
            className={styles.formControl}
          />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button className={styles.btn} variant="primary" type="submit">
          Crear Documento
        </Button>
      </Form>
    </div>
  );
};

export default CreateDocuments;
