import { useEffect, useState } from "react";
import {
  TfiSearch,
  TfiReload,
  TfiEye,
  TfiPencil,
  TfiFolder,
} from "react-icons/tfi";
import api from "../../services/api";
import styles from "./MisMediaciones.module.css";
import MediationModal from "./MediationModal";

const MisMediaciones = () => {
  const [mediations, setMediations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMediation, setSelectedMediation] = useState(null);

  const [filters, setFilters] = useState({
    name: "",
    number: "",
    date: "",
  });

  useEffect(() => {
    const getMediations = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/mediation");

        setMediations(response.data.mediations || []);
      } catch (error) {
        console.error("Error obteniendo las mediaciones:", error);
        setError("No se pudieron cargar las mediaciones.");
      } finally {
        setLoading(false);
      }
    };

    getMediations();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const params = {};

      if (filters.name.trim()) {
        params.name = filters.name.trim();
      }

      if (filters.number.trim()) {
        params.number = filters.number.trim();
      }

      if (filters.date) {
        params.date = filters.date;
      }

      const response = await api.get("/mediation/search", {
        params,
      });

      setMediations(response.data.mediations || []);
    } catch (error) {
      console.error("Error buscando mediaciones:", error);
      setError("No se pudo realizar la búsqueda.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    setFilters({
      name: "",
      number: "",
      date: "",
    });

    try {
      setLoading(true);
      setError("");

      const response = await api.get("/mediation");

      setMediations(response.data.mediations || []);
    } catch (error) {
      console.error("Error obteniendo las mediaciones:", error);
      setError("No se pudieron cargar las mediaciones.");
    } finally {
      setLoading(false);
    }
  };

  const getFullName = (person) => {
    if (!person) return "—";

    const fullName = `${person.name || ""} ${person.surname || ""}`.trim();

    return fullName || "—";
  };

  const formatDate = (date) => {
    if (!date) return "—";

    const [year, month, day] = date.split("-");

    if (!year || !month || !day) return date;

    return `${day}/${month}/${year}`;
  };

  const getStatusLabel = (status) => {
    const statusLabels = {
      draft: "Borrador",
      in_progress: "En progreso",
      completed: "Finalizada",
      archived: "Archivada",
    };

    return statusLabels[status] || status || "—";
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Gestión de mediaciones</span>

          <h1>Mis Mediaciones</h1>

          <p>
            Consultá, buscá y gestioná las mediaciones registradas en tu cuenta.
          </p>
        </div>

        <div className={styles.headerIcon} aria-hidden="true">
          <TfiFolder />
        </div>
      </header>

      <form className={styles.filtersCard} onSubmit={handleSearch}>
        <div className={styles.filtersHeader}>
          <div>
            <h2>Buscar mediaciones</h2>
            <p>Podés buscar por persona, número de mediación o fecha.</p>
          </div>
        </div>

        <div className={styles.filtersGrid}>
          <div className={styles.field}>
            <label htmlFor="name">Nombre o apellido</label>

            <input
              id="name"
              name="name"
              type="text"
              value={filters.name}
              onChange={handleChange}
              placeholder="Ej: Sánchez"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="number">Número de mediación</label>

            <input
              id="number"
              name="number"
              type="text"
              value={filters.number}
              onChange={handleChange}
              placeholder="Ej: MED-002"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="date">Fecha</label>

            <input
              id="date"
              name="date"
              type="date"
              value={filters.date}
              onChange={handleChange}
            />
          </div>

          <div className={styles.filterActions}>
            <button
              type="submit"
              className={styles.searchButton}
              disabled={loading}
            >
              <TfiSearch />
              {loading ? "Buscando..." : "Buscar"}
            </button>

            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              disabled={loading}
            >
              <TfiReload />
              Limpiar
            </button>
          </div>
        </div>
      </form>

      <div className={styles.listCard}>
        <div className={styles.listHeader}>
          <div>
            <h2>Mediaciones recientes</h2>

            <p>
              {loading
                ? "Cargando registros..."
                : `${mediations.length} ${
                    mediations.length === 1
                      ? "mediación registrada"
                      : "mediaciones registradas"
                  }`}
            </p>
          </div>
        </div>

        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>

            <div>
              <strong>Buscando mediaciones</strong>
              <p>Estamos consultando tus registros...</p>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className={`${styles.message} ${styles.error}`}>{error}</div>
        )}

        {!loading && !error && mediations.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <TfiFolder />
            </div>

            <h3>No hay mediaciones registradas</h3>

            <p>
              Cuando guardes una mediación, aparecerá disponible en este sector.
            </p>
          </div>
        )}

        {!loading && !error && mediations.length > 0 && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Expediente</th>
                  <th>Número</th>
                  <th>Requirente</th>
                  <th>Requerido</th>
                  <th>Estado</th>
                  <th className={styles.actionsColumn}>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {mediations.map((mediation) => (
                  <tr key={mediation.id}>
                    <td className={styles.dateCell}>
                      {formatDate(mediation.date)}
                    </td>

                    <td>
                      <span className={styles.expediente}>
                        {mediation.expediente || "—"}
                      </span>
                    </td>

                    <td>{mediation.number || "—"}</td>

                    <td>{getFullName(mediation.requirente)}</td>

                    <td>{getFullName(mediation.requerido)}</td>

                    <td>
                      <span
                        className={`${styles.status} ${
                          styles[`status_${mediation.status}`] || ""
                        }`}
                      >
                        {getStatusLabel(mediation.status)}
                      </span>
                    </td>

                    <td>
                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={styles.viewButton}
                          title="Ver mediación"
                          onClick={() => setSelectedMediation(mediation)}
                        >
                          <TfiEye />
                        </button>

                        <button
                          type="button"
                          className={styles.editButton}
                          title="Editar mediación"
                        >
                          <TfiPencil />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selectedMediation && (
        <MediationModal
          mediation={selectedMediation}
          onClose={() => setSelectedMediation(null)}
        />
      )}
    </section>
  );
};

export default MisMediaciones;
