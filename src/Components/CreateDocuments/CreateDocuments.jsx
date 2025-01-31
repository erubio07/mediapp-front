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
      adress: "",
      email: "",
      phoneNumber: "",
      letrado: {
        name: "",
        adress: "",
        email: "",
        phoneNumber: "",
      },
      mediador: {
        name: "",
        mat: "",
      },
    },
    requerido: {
      name: "",
      dni: "",
      adress: "",
      email: "",
      phoneNumber: "",
      letrado: {
        name: "",
        adress: "",
        email: "",
        phoneNumber: "",
      },
      mediador: {
        name: "",
        mat: "",
      },
    },
    tercero: {
      name: "",
      dni: "",
      adress: "",
      cp: "",
      phoneNumber: "",
      cellPhone: "",
    },
    adressMediacion: "",
    abogadoPatrocinante: "",
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

  const generateDocument10 = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/fill/template_10",
        input,
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
      link.download = `1-0-CONV.CONFIDENCIALIDAD JUD VIRTUAL1b.docx`; // Usar el nombre ingresado o un valor genérico
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Liberar el objeto URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error descargando el documento:", error);
    }
  };

  const handleCreate10 = async (e) => {
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
      await generateDocument10();
    } catch (error) {
      console.log(error.message);
    }
  };

  const generateDocument11 = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/fill/template_11",
        input,
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
      link.download = `1-0-CONV.CONFIDENCIALIDAD JUD VIRTUAL1b.docx`; // Usar el nombre ingresado o un valor genérico
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Liberar el objeto URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error descargando el documento:", error);
    }
  };

  const handleCreate11 = async (e) => {
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
      await generateDocument11();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.createDocuments}>
      <h1 className={styles.title}>Crear Documentos</h1>
      <Form onSubmit={handleCreate10} className={styles.form}>
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
          <Form.Label>Día de Audiencia: </Form.Label>
          <Form.Control
            type="text"
            name="date"
            placeholder="Ingrese la Fecha"
            value={input.date}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>Hora de Inicio: </Form.Label>
          <Form.Control
            type="text"
            name="start"
            placeholder="Ingrese la Hora de Inicio"
            value={input.start}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>Hora de Finalización: </Form.Label>
          <Form.Control
            type="text"
            name="end"
            placeholder="Ingrese la Hora de Finalización"
            value={input.end}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>Fecha y Hora de Próxima Reunión: </Form.Label>
          <Form.Control
            type="text"
            name="nextDate"
            placeholder="Ingrese fecha y hora proxima reunion"
            value={input.nextDate}
            onChange={handleInput}
            className={styles.formControl}
          />
          <h6>Datos Requirente</h6>
          <Form.Label>Nombre: </Form.Label>
          <Form.Control
            type="text"
            name="requirente.name"
            placeholder="Ingrese el nombre del Requirente"
            value={input.requirente.name}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>DNI: </Form.Label>
          <Form.Control
            type="text"
            name="requirente.dni"
            placeholder="Ingrese el DNI del Requirente"
            value={input.requirente.dni}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>Domicilio: </Form.Label>
          <Form.Control
            type="text"
            name="requirente.adress"
            placeholder="Ingrese el Domicilio del Requirente"
            value={input.requirente.adress}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="text"
            name="requirente.email"
            placeholder="Ingrese el Email del Requirente"
            value={input.requirente.email}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>N° Celular: </Form.Label>
          <Form.Control
            type="text"
            name="requirente.phoneNumber"
            placeholder="Ingrese el N° de Celular del Requirente"
            value={input.requirente.phoneNumber}
            onChange={handleInput}
            className={styles.formControl}
          />
          <h6>Letrado Requirente</h6>
          <Form.Label>Nombre: </Form.Label>
          <Form.Control
            type="text"
            name="requirente.letrado.name"
            placeholder="Ingrese el Nombre"
            value={input.requirente.letrado.dni}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>Domicilio: </Form.Label>
          <Form.Control
            type="text"
            name="requirente.letrado.adress"
            placeholder="Ingrese el Domicilio"
            value={input.requirente.letrado.adress}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="text"
            name="requirente.letrado.email"
            placeholder="Ingrese el Email"
            value={input.requirente.letrado.email}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>N° Celular: </Form.Label>
          <Form.Control
            type="text"
            name="requirente.letrado.phoneNumber"
            placeholder="Ingrese el N° de Celular"
            value={input.requirente.letrado.phoneNumber}
            onChange={handleInput}
            className={styles.formControl}
          />
          <h6>Mediador Requirente</h6>
          <Form.Label>Nombre: </Form.Label>
          <Form.Control
            type="text"
            name="requirente.mediador.name"
            placeholder="Ingrese el Nombre"
            value={input.requirente.mediador.name}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>Matricula: </Form.Label>
          <Form.Control
            type="text"
            name="requirente.mediador.mat"
            placeholder="Ingrese la Matricula"
            value={input.requirente.mediador.mat}
            onChange={handleInput}
            className={styles.formControl}
          />
          <h6>Datos de Requerido</h6>
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
          <Form.Label>Domicilio: </Form.Label>
          <Form.Control
            type="text"
            name="requerido.adress"
            placeholder="Ingrese el Domicilio del Requerido"
            value={input.requerido.adress}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="text"
            name="requerido.email"
            placeholder="Ingrese el Email del Requerido"
            value={input.requerido.email}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>N° Celular: </Form.Label>
          <Form.Control
            type="text"
            name="requerido.phoneNumber"
            placeholder="Ingrese el Número de Celular del Requirente"
            value={input.requerido.phoneNumber}
            onChange={handleInput}
            className={styles.formControl}
          />
          <h6>Letrado Requerido</h6>
          <Form.Label>Nombre: </Form.Label>
          <Form.Control
            type="text"
            name="requerido.letrado.name"
            placeholder="Ingrese el Nombre"
            value={input.requerido.letrado.dni}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>Domicilio: </Form.Label>
          <Form.Control
            type="text"
            name="requerido.letrado.adress"
            placeholder="Ingrese el Domicilio"
            value={input.requerido.letrado.adress}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="text"
            name="requerido.letrado.email"
            placeholder="Ingrese el Email"
            value={input.requerido.letrado.email}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>N° Celular: </Form.Label>
          <Form.Control
            type="text"
            name="requerido.letrado.phoneNumber"
            placeholder="Ingrese el N° de Celular"
            value={input.requerido.letrado.phoneNumber}
            onChange={handleInput}
            className={styles.formControl}
          />
          <h6>Mediador Requerido</h6>
          <Form.Label>Nombre: </Form.Label>
          <Form.Control
            type="text"
            name="requerido.mediador.name"
            placeholder="Ingrese el Nombre"
            value={input.requerido.mediador.name}
            onChange={handleInput}
            className={styles.formControl}
          />
          <Form.Label>Matricula: </Form.Label>
          <Form.Control
            type="text"
            name="requerido.mediador.mat"
            placeholder="Ingrese la Matricula"
            value={input.requerido.mediador.mat}
            onChange={handleInput}
            className={styles.formControl}
          />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button
          className={styles.btn}
          variant="primary"
          onClick={() => handleCreate10()}
        >
          CREAR CONV.CONF. JUD. VIRtUAL
        </Button>
        <Button
          className={styles.btn}
          variant="primary"
          onClick={() => handleCreate11()}
        >
          ACTA AUDIENCIA VIRTUAL CJM
        </Button>
      </Form>
    </div>
  );
};

export default CreateDocuments;
