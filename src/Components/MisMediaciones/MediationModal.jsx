import { useEffect } from "react";
import {
  TfiClose,
  TfiPencil,
  TfiPrinter,
  TfiUser,
  TfiLocationPin,
} from "react-icons/tfi";
import styles from "./MediationModal.module.css";

const MediationModal = ({ mediation, onClose }) => {
  useEffect(() => {
    if (!mediation) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [mediation, onClose]);

  if (!mediation) return null;

  const formatDate = (date) => {
    if (!date) return "—";

    const [year, month, day] = date.split("-");

    if (!year || !month || !day) return date;

    return `${day}/${month}/${year}`;
  };

  const getFullName = (person) => {
    if (!person) return "—";

    return `${person.name || ""} ${person.surname || ""}`.trim() || "—";
  };

  const getStatusLabel = (status) => {
    const labels = {
      draft: "Borrador",
      in_progress: "En progreso",
      completed: "Finalizada",
      archived: "Archivada",
    };

    return labels[status] || status || "—";
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const PersonCard = ({ title, person }) => (
    <div className={styles.personCard}>
      <div className={styles.personHeader}>
        <div className={styles.personIcon}>
          <TfiUser />
        </div>

        <div>
          <span>{title}</span>
          <h3>{getFullName(person)}</h3>
        </div>
      </div>

      <div className={styles.personData}>
        <div>
          <span>DNI</span>
          <strong>{person?.dni || "—"}</strong>
        </div>

        <div>
          <span>Teléfono</span>
          <strong>{person?.phone || "—"}</strong>
        </div>

        <div>
          <span>Localidad</span>
          <strong>{person?.localidad || "—"}</strong>
        </div>

        <div>
          <span>Código postal</span>
          <strong>{person?.cp || "—"}</strong>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={styles.backdrop}
      onMouseDown={handleBackdropClick}
      role="presentation"
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mediation-modal-title"
      >
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Detalle de mediación</span>

            <div className={styles.titleRow}>
              <h2 id="mediation-modal-title">
                {mediation.expediente || "Mediación"}
              </h2>

              <span
                className={`${styles.status} ${
                  styles[`status_${mediation.status}`] || ""
                }`}
              >
                {getStatusLabel(mediation.status)}
              </span>
            </div>

            <p>{mediation.number || "Sin número de mediación"}</p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Cerrar"
            title="Cerrar"
          >
            <TfiClose />
          </button>
        </header>

        <div className={styles.body}>
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <span>Datos de la mediación</span>
            </div>

            <div className={styles.generalCard}>
              <div className={styles.dataGrid}>
                <div className={styles.dataItem}>
                  <span>Expediente</span>
                  <strong>{mediation.expediente || "—"}</strong>
                </div>

                <div className={styles.dataItem}>
                  <span>Número</span>
                  <strong>{mediation.number || "—"}</strong>
                </div>

                <div className={styles.dataItem}>
                  <span>Fecha</span>
                  <strong>{formatDate(mediation.date)}</strong>
                </div>

                <div className={styles.dataItem}>
                  <span>Hora</span>
                  <strong>{mediation.hour || "—"}</strong>
                </div>
              </div>

              <div className={styles.location}>
                <TfiLocationPin />

                <div>
                  <span>Lugar de mediación</span>
                  <strong>{mediation.adressMediacion || "—"}</strong>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <span>Partes intervinientes</span>
            </div>

            <div className={styles.peopleGrid}>
              <PersonCard title="Requirente" person={mediation.requirente} />

              <PersonCard title="Requerido" person={mediation.requerido} />
            </div>
          </section>

          {mediation.tercero && Object.keys(mediation.tercero).length > 0 && (
            <section className={styles.section}>
              <div className={styles.sectionTitle}>
                <span>Tercero</span>
              </div>

              <PersonCard
                title="Tercero interviniente"
                person={mediation.tercero}
              />
            </section>
          )}

          {(mediation.abogadoPatrocinante ||
            mediation.abogadoPatrocinanteMat) && (
            <section className={styles.section}>
              <div className={styles.sectionTitle}>
                <span>Abogado patrocinante</span>
              </div>

              <div className={styles.lawyerCard}>
                <div>
                  <span>Nombre</span>
                  <strong>{mediation.abogadoPatrocinante || "—"}</strong>
                </div>

                <div>
                  <span>Matrícula</span>
                  <strong>{mediation.abogadoPatrocinanteMat || "—"}</strong>
                </div>
              </div>
            </section>
          )}

          <section className={styles.documentsSection}>
            <div>
              <span className={styles.documentsEyebrow}>Documentación</span>

              <h3>Documentos de la mediación</h3>

              <p>
                Desde aquí vas a poder generar e imprimir los documentos
                correspondientes a esta mediación.
              </p>
            </div>

            <button type="button" className={styles.documentsButton}>
              <TfiPrinter />
              Generar documentos
            </button>
          </section>
        </div>

        <footer className={styles.footer}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cerrar
          </button>

          <button type="button" className={styles.editButton}>
            <TfiPencil />
            Editar mediación
          </button>
        </footer>
      </div>
    </div>
  );
};

export default MediationModal;
