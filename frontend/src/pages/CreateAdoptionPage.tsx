import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdoption } from "../api/adoptionApi";
import { Adoption } from "../models/Adoption";

function CreateAdoptionPage() {
  const [form, setForm] = useState<Adoption>({
    petName: "",
    type: "",
    breed: "",
    city: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const created = await createAdoption(form);
      if (created.id != null) {
        navigate(/adoptions/);
      } else {
        navigate("/adoptions");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Create Adoption</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.5rem", maxWidth: 400 }}>
        <input
          name="petName"
          placeholder="Pet name"
          value={form.petName}
          onChange={handleChange}
          required
        />
        <input
          name="type"
          placeholder="Type"
          value={form.type}
          onChange={handleChange}
          required
        />
        <input
          name="breed"
          placeholder="Breed"
          value={form.breed}
          onChange={handleChange}
          required
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          required
        />
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default CreateAdoptionPage;
