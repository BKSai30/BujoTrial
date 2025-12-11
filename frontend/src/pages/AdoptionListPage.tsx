import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Adoption } from "../models/Adoption";
import { fetchAdoptions } from "../api/adoptionApi";

function AdoptionListPage() {
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdoptions()
      .then(setAdoptions)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ padding: "1rem" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Adoption</h1>
      <button onClick={() => navigate("/adoptions/new")}>Create</button>
      <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
        {adoptions.map((a) => (
          <div
            key={a.id}
            onClick={() => navigate(/adoptions/)}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: "0.75rem",
              cursor: "pointer",
              backgroundColor: "white",
            }}
          >
            <h2>{a.petName}</h2>
            <p>{a.type} • {a.breed}</p>
            <p>{a.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdoptionListPage;
