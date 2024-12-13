import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./CreateDocuments.module.css"

const CreateDocuments = () => {
  const [nombre, setNombre] = useState("");
  console.log(nombre);

  const handleName = (e) => {
    setNombre(e.target.value);
  };

  const generateDocument = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/fill",
        { nombre },
        {
          responseType: "blob", // Especificar que la respuesta es un blob
        }
      );

      // Crear un blob a partir del archivo recibido
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // Crear un enlace de descarga temporal
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `documento_${nombre || "generico"}.docx`; // Usar el nombre ingresado o un valor genérico
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
      if (!nombre) alert("Se debe ingresar un nombre para proceder");
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
          <Form.Label>Nombre: </Form.Label>
          <Form.Control
            type="nombre"
            placeholder="Ingrese un Nombre"
            value={nombre}
            onChange={handleName}
            className={styles.formControl}
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
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
