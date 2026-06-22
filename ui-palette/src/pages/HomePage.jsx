import { useState } from "react";
import { usePalettes } from "../hooks/usePalettes";
import Navbar from "../components/Navbar";
import PaletteCard from "../components/PaletteCard";
import PaletteForm from "../components/PaletteForm";
import EmptyState from "../components/EmptyState";

/**
 * Main page — lists all palettes in a responsive grid.
 * Houses all CRUD state and passes handlers down to children.
 */
export default function HomePage() {
  const { palettes, addPalette, updatePalette, deletePalette } = usePalettes();
  const [formOpen, setFormOpen] = useState(false);
  const [editingPalette, setEditingPalette] = useState(null);
  const [search, setSearch] = useState("");

  const openAddForm = () => {
    setEditingPalette(null);
    setFormOpen(true);
  };

  const openEditForm = (palette) => {
    setEditingPalette(palette);
    setFormOpen(true);
  };

  const handleSave = (data) => {
    if (editingPalette) {
      updatePalette(editingPalette.id, data);
    } else {
      addPalette(data);
    }
  };

  const filteredPalettes = palettes.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar onAddClick={openAddForm} />

      <main className="mx-auto max-w-7xl px-5 py-10">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Renk Paletleri
              <span className="ml-3 inline-flex items-center rounded-full bg-slate-700/60 px-2.5 py-0.5 text-sm font-normal text-slate-400">
                {palettes.length}
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Tasarım sistemlerin için paletleri yönet ve renkleri kopyala.
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 14 14"
            >
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M9.5 9.5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Palet ara..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800/70 py-2.5 pl-9 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 sm:w-56"
            />
          </div>
        </div>

        {/* Grid or empty state */}
        {palettes.length === 0 ? (
          <EmptyState onAdd={openAddForm} />
        ) : filteredPalettes.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-slate-400">"{search}" için sonuç bulunamadı.</p>
            <button
              onClick={() => setSearch("")}
              className="mt-3 text-sm text-violet-400 hover:text-violet-300 underline"
            >
              Aramayı temizle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPalettes.map((palette) => (
              <PaletteCard
                key={palette.id}
                palette={palette}
                onEdit={openEditForm}
                onDelete={deletePalette}
              />
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      <PaletteForm
        open={formOpen}
        palette={editingPalette}
        onSave={handleSave}
        onClose={() => setFormOpen(false)}
      />
    </div>
  );
}