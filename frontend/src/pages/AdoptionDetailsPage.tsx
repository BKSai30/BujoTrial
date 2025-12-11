import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Adoption } from "../models/Adoption";
import { fetchAdoption } from "../api/adoptionApi";

function AdoptionDetailsPage() {
  const { id } = useParams();
  const [adoption, setAdoption] = useState<Adoption | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchAdoption(Number(id))
      .then(setAdoption)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div style={{ padding: "1rem" }}>Loading...</div>;
  }

  if (!adoption) {
    return <div style={{ padding: "1rem" }}>Not found</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{adoption.petName}</h1>
      <p>{adoption.type} • {adoption.breed}</p>
      <p>{adoption.city}</p>
      <p>{adoption.description}</p>
    </div>
  );
}

export default AdoptionDetailsPage;
