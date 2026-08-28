import { useState } from "react";
import styles from "./CreateDocuments.module.css";
import api from "../../services/api";

const initialState = {
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
    localidad: "",
    cp: "",
    email: "",
    phoneNumber: "",
    phoneFixed: "",

    letrado: {
      name: "",
      mat: "",
      adress: "",
      localidad: "",
      cp: "",
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
    localidad: "",
    cp: "",
    email: "",
    phoneNumber: "",
    phoneFixed: "",

    letrado: {
      name: "",
      mat: "",
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
    localidad: "",
    cp: "",
    phoneNumber: "",
    cellPhone: "",
  },

  adressMediacion: "",

  abogadoPatrocinante: "",
  abogadoPatrocinanteMat: "",
};

/* =====================================================
   CONFIGURACIÓN DE SECCIONES
===================================================== */

const sectionsConfiguration = {
  expediente: {
    required: ["expediente", "number", "date"],
    total: ["expediente", "number", "date", "start", "end", "nextDate"],
  },

  requirente: {
    required: ["requirente.name", "requirente.dni"],

    total: [
      "requirente.name",
      "requirente.dni",
      "requirente.adress",
      "requirente.localidad",
      "requirente.cp",
      "requirente.email",
      "requirente.phoneFixed",
      "requirente.phoneNumber",
      "requirente.letrado.name",
      "requirente.letrado.mat",
      "requirente.letrado.adress",
      "requirente.letrado.localidad",
      "requirente.letrado.cp",
      "requirente.letrado.email",
      "requirente.letrado.phoneNumber",
      "requirente.mediador.name",
      "requirente.mediador.mat",
    ],
  },

  requerido: {
    required: ["requerido.name", "requerido.dni"],

    total: [
      "requerido.name",
      "requerido.dni",
      "requerido.adress",
      "requerido.localidad",
      "requerido.cp",
      "requerido.email",
      "requerido.phoneFixed",
      "requerido.phoneNumber",
      "requerido.letrado.name",
      "requerido.letrado.mat",
      "requerido.letrado.adress",
      "requerido.letrado.email",
      "requerido.letrado.phoneNumber",
      "requerido.mediador.name",
      "requerido.mediador.mat",
    ],
  },

  adicionales: {
    required: [],

    total: [
      "tercero.name",
      "tercero.dni",
      "tercero.adress",
      "tercero.localidad",
      "tercero.cp",
      "tercero.phoneNumber",
      "tercero.cellPhone",
      "adressMediacion",
      "abogadoPatrocinante",
      "abogadoPatrocinanteMat",
    ],
  },
};

/* =====================================================
   CAMPOS OBLIGATORIOS
===================================================== */

const requiredFields = [
  {
    path: "expediente",
    label: "Carátula del expediente",
    section: "expediente",
  },

  {
    path: "number",
    label: "Número de expediente",
    section: "expediente",
  },

  {
    path: "date",
    label: "Día de audiencia",
    section: "expediente",
  },

  {
    path: "requirente.name",
    label: "Nombre del requirente",
    section: "requirente",
  },

  {
    path: "requirente.dni",
    label: "DNI del requirente",
    section: "requirente",
  },

  {
    path: "requerido.name",
    label: "Nombre del requerido",
    section: "requerido",
  },

  {
    path: "requerido.dni",
    label: "DNI del requerido",
    section: "requerido",
  },
];

/* =====================================================
   FUNCIONES AUXILIARES
===================================================== */

function getNestedValue(object, path) {
  return path.split(".").reduce((currentValue, key) => {
    return currentValue?.[key];
  }, object);
}

function setNestedValue(object, path, value) {
  const keys = path.split(".");
  const result = structuredClone(object);

  let currentLevel = result;

  keys.forEach((key, index) => {
    const isLastKey = index === keys.length - 1;

    if (isLastKey) {
      currentLevel[key] = value;
    } else {
      currentLevel = currentLevel[key];
    }
  });

  return result;
}

function isCompletedValue(value) {
  return String(value ?? "").trim() !== "";
}

/* =====================================================
   ICONOS
===================================================== */

const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M6 2h8l4 4v16H6V2Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <path
      d="M14 2v5h4M9 12h6M9 16h6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle
      cx="12"
      cy="8"
      r="4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <path
      d="M4.5 21c.7-4.7 3.2-7 7.5-7s6.8 2.3 7.5 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle
      cx="9"
      cy="8"
      r="3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <circle
      cx="17"
      cy="9"
      r="2.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <path
      d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6M14 15c3.5-.3 5.7 1.4 6.5 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="m5 12 4.2 4.2L19 6.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronIcon = ({ isOpen }) => (
  <svg
    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="m7 9 5 5 5-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* =====================================================
   FIELD
===================================================== */

const Field = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  fullWidth = false,
  autoComplete = "off",
}) => (
  <div className={`${styles.fieldGroup} ${fullWidth ? styles.fullWidth : ""}`}>
    <label className={styles.label} htmlFor={name}>
      {label}

      {required && (
        <>
          <span className={styles.requiredMark}>*</span>
          <span className={styles.srOnly}> obligatorio</span>
        </>
      )}
    </label>

    <input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={styles.input}
      autoComplete={autoComplete}
    />
  </div>
);

/* =====================================================
   SUBSECCIÓN
===================================================== */

const Subsection = ({ title, description, children }) => (
  <section className={styles.subsection}>
    <div className={styles.subsectionHeader}>
      <h3 className={styles.subsectionTitle}>{title}</h3>

      {description && (
        <p className={styles.subsectionDescription}>{description}</p>
      )}
    </div>

    <div className={styles.fieldsGrid}>{children}</div>
  </section>
);

/* =====================================================
   ACORDEÓN
===================================================== */

const AccordionSection = ({
  id,
  number,
  title,
  description,
  icon,
  status,
  progress,
  isOpen,
  onToggle,
  children,
}) => (
  <section
    className={`${styles.accordionSection} ${
      isOpen ? styles.accordionSectionOpen : ""
    }`}
  >
    <button
      type="button"
      className={styles.accordionHeader}
      onClick={() => onToggle(id)}
      aria-expanded={isOpen}
      aria-controls={`${id}-content`}
    >
      <span className={styles.sectionIdentity}>
        <span className={styles.sectionNumber}>{number}</span>

        <span className={styles.sectionIcon}>{icon}</span>

        <span className={styles.sectionHeading}>
          <span className={styles.sectionTitle}>{title}</span>

          <span className={styles.sectionDescription}>{description}</span>

          <span className={styles.sectionProgressText}>
            {progress.completed} de {progress.total} campos completos
          </span>
        </span>
      </span>

      <span className={styles.sectionMeta}>
        <span
          className={`${styles.statusBadge} ${styles[`status${status.type}`]}`}
        >
          {status.type === "Complete" && (
            <span className={styles.statusIcon}>
              <CheckIcon />
            </span>
          )}

          {status.label}
        </span>

        <ChevronIcon isOpen={isOpen} />
      </span>
    </button>

    <div
      id={`${id}-content`}
      className={`${styles.accordionContent} ${
        isOpen ? styles.accordionContentOpen : ""
      }`}
    >
      <div className={styles.accordionInner}>{children}</div>
    </div>
  </section>
);

/* =====================================================
   COMPONENTE
===================================================== */

const CreateDocuments = ({ embedded = true }) => {
  const [input, setInput] = useState(initialState);
  const [openSection, setOpenSection] = useState("expediente");
  const [formError, setFormError] = useState("");
  const [loadingDocument, setLoadingDocument] = useState("");

  const [mediationId, setMediationId] = useState(null);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  /* =====================================================
     INPUT
  ===================================================== */

  const handleInput = (event) => {
    const { name, value } = event.target;

    setInput((currentInput) => setNestedValue(currentInput, name, value));

    if (formError) {
      setFormError("");
    }

    setHasUnsavedChanges(true);
    setSaveStatus("pending");
  };

  /* =====================================================
     ACORDEÓN
  ===================================================== */

  const handleToggleSection = (sectionId) => {
    setOpenSection((currentSection) =>
      currentSection === sectionId ? "" : sectionId,
    );
  };

  /* =====================================================
     PROGRESO
  ===================================================== */

  const getSectionProgress = (sectionId) => {
    const configuration = sectionsConfiguration[sectionId];

    const completed = configuration.total.filter((path) =>
      isCompletedValue(getNestedValue(input, path)),
    ).length;

    return {
      completed,
      total: configuration.total.length,
    };
  };

  /* =====================================================
     ESTADO SECCIÓN
  ===================================================== */

  const getSectionStatus = (sectionId) => {
    const configuration = sectionsConfiguration[sectionId];

    const requiredCompleted = configuration.required.filter((path) =>
      isCompletedValue(getNestedValue(input, path)),
    ).length;

    const totalCompleted = configuration.total.filter((path) =>
      isCompletedValue(getNestedValue(input, path)),
    ).length;

    const allRequiredCompleted =
      configuration.required.length > 0 &&
      requiredCompleted === configuration.required.length;

    const allFieldsCompleted =
      configuration.total.length > 0 &&
      totalCompleted === configuration.total.length;

    if (configuration.required.length > 0) {
      if (allRequiredCompleted) {
        return {
          label: "Completo",
          type: "Complete",
        };
      }

      if (totalCompleted > 0) {
        return {
          label: "En progreso",
          type: "Progress",
        };
      }

      return {
        label: "Pendiente",
        type: "Pending",
      };
    }

    if (allFieldsCompleted) {
      return {
        label: "Completo",
        type: "Complete",
      };
    }

    if (totalCompleted > 0) {
      return {
        label: "En progreso",
        type: "Progress",
      };
    }

    return {
      label: "Opcional",
      type: "Optional",
    };
  };

  /* =====================================================
     PROGRESO GENERAL
  ===================================================== */

  const getOverallProgress = () => {
    const allPaths = Object.values(sectionsConfiguration).flatMap(
      (section) => section.total,
    );

    const completed = allPaths.filter((path) =>
      isCompletedValue(getNestedValue(input, path)),
    ).length;

    const percentage =
      allPaths.length === 0
        ? 0
        : Math.round((completed / allPaths.length) * 100);

    return {
      completed,
      total: allPaths.length,
      percentage,
    };
  };

  /* =====================================================
     VALIDACIÓN GENERAL
  ===================================================== */

  const validateForm = () => {
    const missingField = requiredFields.find((field) => {
      const value = getNestedValue(input, field.path);

      return !isCompletedValue(value);
    });

    if (!missingField) {
      setFormError("");
      return true;
    }

    setFormError(
      `Falta completar el campo obligatorio: ${missingField.label}.`,
    );

    setOpenSection(missingField.section);

    window.requestAnimationFrame(() => {
      document.getElementById(missingField.path)?.focus();
    });

    return false;
  };

  /* =====================================================
     DESCARGAR DOCUMENTO
  ===================================================== */

  const downloadDocument = async ({ endpoint, fileName, documentType }) => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoadingDocument(documentType);
      setFormError("");

      const response = await api.post(endpoint, input, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);

      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error descargando el documento:", error);

      setFormError(
        error.response?.data?.error ||
          "No fue posible generar el documento. Verificá la conexión e intentá nuevamente.",
      );
    } finally {
      setLoadingDocument("");
    }
  };

  /* =====================================================
     GENERAR CONVENIO
  ===================================================== */

  const handleCreateAgreement = () => {
    downloadDocument({
      endpoint: "/fill",
      fileName: "convenio-confidencialidad-judicial-virtual.docx",
      documentType: "agreement",
    });
  };

  /* =====================================================
     GENERAR ACTA AUDIENCIA
  ===================================================== */

  const handleCreateHearingRecord = () => {
    downloadDocument({
      endpoint: "/fill/actaAudienciaVirtual",
      fileName: "acta-audiencia-virtual.docx",
      documentType: "hearing",
    });
  };

  /* =====================================================
     GENERAR ACTA CIERRE
  ===================================================== */

  const handleCreateClosingRecord = () => {
    downloadDocument({
      endpoint: "/fill/actaCierre",
      fileName: "acta-cierre-mediacion.docx",
      documentType: "closing",
    });
  };

  /* =====================================================
     GUARDAR MEDIACIÓN
  ===================================================== */

  const handleSaveDraft = async () => {
    if (!input.expediente.trim()) {
      setFormError(
        "Debe completar la carátula del expediente antes de guardar.",
      );

      setOpenSection("expediente");

      window.requestAnimationFrame(() => {
        document.getElementById("expediente")?.focus();
      });

      return;
    }

    if (!input.number.trim()) {
      setFormError("Debe completar el número de expediente antes de guardar.");

      setOpenSection("expediente");

      window.requestAnimationFrame(() => {
        document.getElementById("number")?.focus();
      });

      return;
    }

    if (!input.date) {
      setFormError("Debe seleccionar la fecha de audiencia antes de guardar.");

      setOpenSection("expediente");

      window.requestAnimationFrame(() => {
        document.getElementById("date")?.focus();
      });

      return;
    }

    try {
      setIsDraftSaving(true);
      setSaveStatus("saving");
      setFormError("");

      if (!mediationId) {
        const response = await api.post("/mediation", {
          ...input,
          status: "draft",
        });

        setMediationId(response.data.mediation.id);
      } else {
        await api.patch(`/mediation/${mediationId}`, {
          ...input,
          status: "draft",
        });
      }

      setSaveStatus("saved");
      setLastSavedAt(new Date());
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error guardando la mediación:", error);

      setSaveStatus("error");

      setFormError(
        error.response?.data?.error ||
          "No fue posible guardar la mediación. Verificá la conexión e intentá nuevamente.",
      );
    } finally {
      setIsDraftSaving(false);
    }
  };

  const overallProgress = getOverallProgress();

  const isGenerating = Boolean(loadingDocument);

  return (
    <main className={`${styles.page} ${embedded ? styles.embedded : ""}`}>
      <div className={styles.container}>
        {/* ===============================
            HEADER
        =============================== */}

        <header className={styles.pageHeader}>
          <div className={styles.headerInformation}>
            <span className={styles.eyebrow}>Gestión documental</span>

            <h1 className={styles.pageTitle}>Crear documentos de mediación</h1>

            <p className={styles.pageDescription}>
              Complete la información necesaria para generar la documentación
              correspondiente a la audiencia.
            </p>
          </div>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={`${styles.draftButton} ${
                isDraftSaving ? styles.draftButtonSaving : ""
              }`}
              onClick={handleSaveDraft}
              disabled={isDraftSaving || !hasUnsavedChanges}
              aria-busy={isDraftSaving}
            >
              <span className={styles.draftButtonContent}>
                {isDraftSaving
                  ? "Guardando..."
                  : mediationId
                    ? "Guardar cambios"
                    : "Guardar borrador"}
              </span>

              {isDraftSaving && (
                <span className={styles.draftButtonLoader} aria-hidden="true" />
              )}
            </button>

            <div className={styles.documentMark}>
              <DocumentIcon />
            </div>
          </div>
        </header>

        {/* ===============================
            PROGRESO
        =============================== */}

        <section
          className={styles.progressPanel}
          aria-label="Progreso general del documento"
        >
          <div className={styles.progressInformation}>
            <div>
              <span className={styles.progressLabel}>
                Progreso del documento
              </span>

              <strong className={styles.progressValue}>
                {overallProgress.percentage}% completado
              </strong>
            </div>

            <span className={styles.progressCounter}>
              {overallProgress.completed} de {overallProgress.total} campos
            </span>
          </div>

          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={overallProgress.percentage}
          >
            <span
              className={styles.progressBar}
              style={{
                width: `${overallProgress.percentage}%`,
              }}
            />
          </div>
        </section>

        {/* ===============================
            RESUMEN
        =============================== */}

        <section
          className={styles.summaryPanel}
          aria-label="Resumen del formulario"
        >
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Expediente</span>

            <strong className={styles.summaryValue}>
              {input.number || "Sin completar"}
            </strong>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Audiencia</span>

            <strong className={styles.summaryValue}>
              {input.date || "Fecha pendiente"}
            </strong>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Requirente</span>

            <strong className={styles.summaryValue}>
              {input.requirente.name || "Sin completar"}
            </strong>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Requerido</span>

            <strong className={styles.summaryValue}>
              {input.requerido.name || "Sin completar"}
            </strong>
          </div>

          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Estado</span>

            <span className={styles.draftBadge}>En edición</span>
          </div>
        </section>

        {/* ===============================
            AYUDA
        =============================== */}

        <div className={styles.helpMessage}>
          <span className={styles.helpIcon}>i</span>

          <p>
            Los campos señalados con{" "}
            <strong className={styles.requiredMark}>*</strong> son obligatorios.
            Puede abrir y cerrar las secciones sin perder la información cargada
            durante esta sesión.
          </p>
        </div>

        {formError && (
          <div className={styles.errorAlert} role="alert">
            <span className={styles.errorIcon}>!</span>

            <span>{formError}</span>
          </div>
        )}

        {/* ===============================
            ACORDEONES
        =============================== */}

        <div className={styles.accordion}>
          {/* =============================
              EXPEDIENTE
          ============================= */}

          <AccordionSection
            id="expediente"
            number="1"
            title="Datos del expediente"
            description="Carátula, número, fecha y horarios de la audiencia"
            icon={<DocumentIcon />}
            status={getSectionStatus("expediente")}
            progress={getSectionProgress("expediente")}
            isOpen={openSection === "expediente"}
            onToggle={handleToggleSection}
          >
            <div className={styles.fieldsGrid}>
              <Field
                label="Carátula del expediente"
                name="expediente"
                value={input.expediente}
                onChange={handleInput}
                placeholder="Ej.: Pérez c/ Gómez"
                required
                fullWidth
              />

              <Field
                label="Número de expediente"
                name="number"
                value={input.number}
                onChange={handleInput}
                placeholder="Ej.: EXP-12345/2026"
                required
              />

              <Field
                label="Día de audiencia"
                name="date"
                value={input.date}
                onChange={handleInput}
                type="date"
                required
              />

              <Field
                label="Hora de inicio"
                name="start"
                value={input.start}
                onChange={handleInput}
                type="time"
              />

              <Field
                label="Hora de finalización"
                name="end"
                value={input.end}
                onChange={handleInput}
                type="time"
              />

              <Field
                label="Próxima reunión"
                name="nextDate"
                value={input.nextDate}
                onChange={handleInput}
                type="datetime-local"
                fullWidth
              />
            </div>
          </AccordionSection>

          {/* =============================
              REQUIRENTE
          ============================= */}

          <AccordionSection
            id="requirente"
            number="2"
            title="Parte requirente"
            description="Datos personales, letrado y mediador interviniente"
            icon={<PersonIcon />}
            status={getSectionStatus("requirente")}
            progress={getSectionProgress("requirente")}
            isOpen={openSection === "requirente"}
            onToggle={handleToggleSection}
          >
            <Subsection
              title="Datos personales"
              description="Información de la persona requirente."
            >
              <Field
                label="Nombre y apellido"
                name="requirente.name"
                value={input.requirente.name}
                onChange={handleInput}
                placeholder="Nombre completo"
                required
              />

              <Field
                label="DNI"
                name="requirente.dni"
                value={input.requirente.dni}
                onChange={handleInput}
                placeholder="Ej.: 30.123.456"
                required
              />

              <Field
                label="Domicilio"
                name="requirente.adress"
                value={input.requirente.adress}
                onChange={handleInput}
                placeholder="Calle y número"
                fullWidth
              />

              <Field
                label="Localidad"
                name="requirente.localidad"
                value={input.requirente.localidad}
                onChange={handleInput}
                placeholder="Ej.: Córdoba"
              />

              <Field
                label="Código postal"
                name="requirente.cp"
                value={input.requirente.cp}
                onChange={handleInput}
                placeholder="Ej.: 5000"
              />

              <Field
                label="Correo electrónico"
                name="requirente.email"
                value={input.requirente.email}
                onChange={handleInput}
                type="email"
                placeholder="nombre@correo.com"
                fullWidth
              />

              <Field
                label="Teléfono fijo"
                name="requirente.phoneFixed"
                value={input.requirente.phoneFixed}
                onChange={handleInput}
                type="tel"
                placeholder="Ej.: 351 4234567"
              />

              <Field
                label="Número de celular"
                name="requirente.phoneNumber"
                value={input.requirente.phoneNumber}
                onChange={handleInput}
                type="tel"
                placeholder="Ej.: 351 555-0000"
              />
            </Subsection>

            <Subsection
              title="Letrado de la parte requirente"
              description="Complete estos datos cuando corresponda."
            >
              <Field
                label="Nombre y apellido"
                name="requirente.letrado.name"
                value={input.requirente.letrado.name}
                onChange={handleInput}
                placeholder="Nombre completo"
              />

              <Field
                label="Matrícula"
                name="requirente.letrado.mat"
                value={input.requirente.letrado.mat}
                onChange={handleInput}
                placeholder="Ej.: 1-35318"
              />

              <Field
                label="Domicilio"
                name="requirente.letrado.adress"
                value={input.requirente.letrado.adress}
                onChange={handleInput}
                placeholder="Calle y número"
                fullWidth
              />

              <Field
                label="Localidad"
                name="requirente.letrado.localidad"
                value={input.requirente.letrado.localidad}
                onChange={handleInput}
                placeholder="Ej.: Córdoba"
              />

              <Field
                label="Código postal"
                name="requirente.letrado.cp"
                value={input.requirente.letrado.cp}
                onChange={handleInput}
                placeholder="Ej.: 5000"
              />

              <Field
                label="Correo electrónico"
                name="requirente.letrado.email"
                value={input.requirente.letrado.email}
                onChange={handleInput}
                type="email"
                placeholder="profesional@correo.com"
              />

              <Field
                label="Número de celular"
                name="requirente.letrado.phoneNumber"
                value={input.requirente.letrado.phoneNumber}
                onChange={handleInput}
                type="tel"
                placeholder="Ej.: 351 555-0000"
              />
            </Subsection>

            <Subsection
              title="Mediador de la parte requirente"
              description="Datos profesionales del mediador."
            >
              <Field
                label="Nombre y apellido"
                name="requirente.mediador.name"
                value={input.requirente.mediador.name}
                onChange={handleInput}
                placeholder="Nombre completo"
              />

              <Field
                label="Matrícula"
                name="requirente.mediador.mat"
                value={input.requirente.mediador.mat}
                onChange={handleInput}
                placeholder="Número de matrícula"
              />
            </Subsection>
          </AccordionSection>

          {/* =============================
              REQUERIDO
          ============================= */}

          <AccordionSection
            id="requerido"
            number="3"
            title="Parte requerida"
            description="Datos personales, letrado y mediador interviniente"
            icon={<PersonIcon />}
            status={getSectionStatus("requerido")}
            progress={getSectionProgress("requerido")}
            isOpen={openSection === "requerido"}
            onToggle={handleToggleSection}
          >
            <Subsection
              title="Datos personales"
              description="Información de la persona requerida."
            >
              <Field
                label="Nombre y apellido"
                name="requerido.name"
                value={input.requerido.name}
                onChange={handleInput}
                placeholder="Nombre completo"
                required
              />

              <Field
                label="DNI"
                name="requerido.dni"
                value={input.requerido.dni}
                onChange={handleInput}
                placeholder="Ej.: 30.123.456"
                required
              />

              <Field
                label="Domicilio"
                name="requerido.adress"
                value={input.requerido.adress}
                onChange={handleInput}
                placeholder="Calle y número"
                fullWidth
              />

              <Field
                label="Localidad"
                name="requerido.localidad"
                value={input.requerido.localidad}
                onChange={handleInput}
                placeholder="Ej.: Villa Carlos Paz"
              />

              <Field
                label="Código postal"
                name="requerido.cp"
                value={input.requerido.cp}
                onChange={handleInput}
                placeholder="Ej.: 5152"
              />

              <Field
                label="Correo electrónico"
                name="requerido.email"
                value={input.requerido.email}
                onChange={handleInput}
                type="email"
                placeholder="nombre@correo.com"
                fullWidth
              />

              <Field
                label="Teléfono fijo"
                name="requerido.phoneFixed"
                value={input.requerido.phoneFixed}
                onChange={handleInput}
                type="tel"
                placeholder="Ej.: 3541 423344"
              />

              <Field
                label="Número de celular"
                name="requerido.phoneNumber"
                value={input.requerido.phoneNumber}
                onChange={handleInput}
                type="tel"
                placeholder="Ej.: 3541 556677"
              />
            </Subsection>

            <Subsection
              title="Letrado de la parte requerida"
              description="Complete estos datos cuando corresponda."
            >
              <Field
                label="Nombre y apellido"
                name="requerido.letrado.name"
                value={input.requerido.letrado.name}
                onChange={handleInput}
                placeholder="Nombre completo"
              />

              <Field
                label="Matrícula"
                name="requerido.letrado.mat"
                value={input.requerido.letrado.mat}
                onChange={handleInput}
                placeholder="Ej.: 1-34567"
              />

              <Field
                label="Domicilio"
                name="requerido.letrado.adress"
                value={input.requerido.letrado.adress}
                onChange={handleInput}
                placeholder="Calle, número y localidad"
                fullWidth
              />

              <Field
                label="Correo electrónico"
                name="requerido.letrado.email"
                value={input.requerido.letrado.email}
                onChange={handleInput}
                type="email"
                placeholder="profesional@correo.com"
              />

              <Field
                label="Número de celular"
                name="requerido.letrado.phoneNumber"
                value={input.requerido.letrado.phoneNumber}
                onChange={handleInput}
                type="tel"
                placeholder="Ej.: 351 555-0000"
              />
            </Subsection>

            <Subsection
              title="Mediador de la parte requerida"
              description="Datos profesionales del mediador."
            >
              <Field
                label="Nombre y apellido"
                name="requerido.mediador.name"
                value={input.requerido.mediador.name}
                onChange={handleInput}
                placeholder="Nombre completo"
              />

              <Field
                label="Matrícula"
                name="requerido.mediador.mat"
                value={input.requerido.mediador.mat}
                onChange={handleInput}
                placeholder="Número de matrícula"
              />
            </Subsection>
          </AccordionSection>

          {/* =============================
              TERCERO / ADICIONALES
          ============================= */}

          <AccordionSection
            id="adicionales"
            number="4"
            title="Terceros y datos adicionales"
            description="Información complementaria para la documentación"
            icon={<UsersIcon />}
            status={getSectionStatus("adicionales")}
            progress={getSectionProgress("adicionales")}
            isOpen={openSection === "adicionales"}
            onToggle={handleToggleSection}
          >
            <Subsection
              title="Tercero interviniente"
              description="Complete esta sección solamente si participa un tercero."
            >
              <Field
                label="Nombre y apellido"
                name="tercero.name"
                value={input.tercero.name}
                onChange={handleInput}
                placeholder="Nombre completo"
              />

              <Field
                label="DNI"
                name="tercero.dni"
                value={input.tercero.dni}
                onChange={handleInput}
                placeholder="Ej.: 30.123.456"
              />

              <Field
                label="Domicilio"
                name="tercero.adress"
                value={input.tercero.adress}
                onChange={handleInput}
                placeholder="Calle y número"
                fullWidth
              />

              <Field
                label="Localidad"
                name="tercero.localidad"
                value={input.tercero.localidad}
                onChange={handleInput}
                placeholder="Ej.: Alta Gracia"
              />

              <Field
                label="Código postal"
                name="tercero.cp"
                value={input.tercero.cp}
                onChange={handleInput}
                placeholder="Ej.: 5186"
              />

              <Field
                label="Teléfono fijo"
                name="tercero.phoneNumber"
                value={input.tercero.phoneNumber}
                onChange={handleInput}
                type="tel"
                placeholder="Teléfono fijo"
              />

              <Field
                label="Número de celular"
                name="tercero.cellPhone"
                value={input.tercero.cellPhone}
                onChange={handleInput}
                type="tel"
                placeholder="Número de celular"
              />
            </Subsection>

            <Subsection
              title="Información complementaria"
              description="Datos adicionales de la mediación."
            >
              <Field
                label="Domicilio de la mediación"
                name="adressMediacion"
                value={input.adressMediacion}
                onChange={handleInput}
                placeholder="Lugar donde se desarrolla la mediación"
                fullWidth
              />

              <Field
                label="Abogado patrocinante"
                name="abogadoPatrocinante"
                value={input.abogadoPatrocinante}
                onChange={handleInput}
                placeholder="Nombre del abogado patrocinante"
              />

              <Field
                label="Matrícula del abogado patrocinante"
                name="abogadoPatrocinanteMat"
                value={input.abogadoPatrocinanteMat}
                onChange={handleInput}
                placeholder="Ej.: 1-45678"
              />
            </Subsection>
          </AccordionSection>
        </div>

        {/* ===============================
            ACCIONES
        =============================== */}

        <footer className={styles.actions}>
          <div className={styles.actionsInformation}>
            <strong>Generación de documentos</strong>

            <span>Revise los datos obligatorios antes de continuar.</span>

            {lastSavedAt && (
              <span>Último guardado: {lastSavedAt.toLocaleTimeString()}</span>
            )}
          </div>

          <div className={styles.actionButtons}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleCreateAgreement}
              disabled={isGenerating}
            >
              {loadingDocument === "agreement"
                ? "Generando..."
                : "Generar convenio"}
            </button>

            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleCreateHearingRecord}
              disabled={isGenerating}
            >
              {loadingDocument === "hearing"
                ? "Generando..."
                : "Generar acta de audiencia"}
            </button>

            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleCreateClosingRecord}
              disabled={isGenerating}
            >
              {loadingDocument === "closing"
                ? "Generando..."
                : "Generar acta de cierre"}
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default CreateDocuments;
