import { useEffect, useState } from "react";
import api from "../../services/api";

const MisMediaciones = () => {
  const [mediations, setMediations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div>
      <h1>Mis Mediaciones</h1>

      <p>Consultá y gestioná las mediaciones registradas en tu cuenta.</p>

      {loading && <p>Cargando mediaciones...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && mediations.length === 0 && (
        <p>No tenés mediaciones registradas.</p>
      )}

      {!loading && !error && mediations.length > 0 && (
        <div>
          {mediations.map((mediation) => (
            <div key={mediation.id}>
              <strong>{mediation.expediente}</strong>

              <span> - {mediation.number}</span>

              <span>
                {" "}
                - {mediation.requirente?.name} {mediation.requirente?.surname}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisMediaciones;
