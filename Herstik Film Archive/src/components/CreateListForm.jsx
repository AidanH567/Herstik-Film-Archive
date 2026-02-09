import { createList } from "../services/listService";
import { useState } from "react";

export default function CreateListForm({ onCreated }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateList(e) {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      setLoading(true);
      const list = await createList(name);
      console.log("Created list:", list);

      setName("");
      onCreated?.(list); // optional callback
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleCreateList}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="List name"
      />
      <button disabled={loading}>
        {loading ? "Creating..." : "Create list"}
      </button>
    </form>
  );
}
