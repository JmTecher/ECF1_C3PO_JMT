import React, { useState } from "react";
import BackgroundWrapper from "./components/BackgroundWrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { menus as menusInit } from "./menus";

export default function AccueilRestaurateur({ user, onLogout }) {
  const [menus, setMenus] = useState(menusInit);
  const [form, setForm] = useState({ date: "", choix1: "", choix2: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  // Add or edit a menu
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.date || !form.choix1 || !form.choix2) return;
    if (editingId) {
      setMenus(menus.map(menu =>
        menu.id === editingId ? { ...form, id: editingId } : menu
      ));
      setEditingId(null);
    } else {
      setMenus([...menus, { ...form, id: Date.now() }]);
    }
    setForm({ date: "", choix1: "", choix2: "", description: "" });
  }

  // Confirmation dialog before delete (UX security)
  function handleDelete(id) {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer ce menu ? Cette action est irréversible."
      )
    ) {
      setMenus(menus.filter(menu => menu.id !== id));
      if (editingId === id) setEditingId(null);
    }
  }

  function handleEdit(menu) {
    setForm(menu);
    setEditingId(menu.id);
  }

  return (
    <BackgroundWrapper>
      <Header user={user} onLogout={onLogout} />
      <main
        className="flex-1 flex flex-col items-center justify-center px-4 py-10 min-h-screen"
        id="main-content"
        tabIndex={-1}
        aria-label="Contenu principal"
      >
        {/* Main section header */}
        <section className="mx-auto w-fit mb-8 px-8 py-4 rounded-xl bg-white/90 backdrop-blur-md shadow-lg flex flex-col items-center border border-gray">
          <h1 className="text-2xl font-bold text-primary drop-shadow text-center">
            Gestion des menus du restaurateur
          </h1>
          <span className="mt-2 text-dark text-base drop-shadow text-center">
            {user?.username && <>Bienvenue, <b>{user.username}</b></>}
          </span>
        </section>

        {/* Add/Edit Menu Form */}
        <form
          onSubmit={handleSubmit}
          role="form"
          aria-labelledby="form-titre"
          className="bg-white/90 backdrop-blur p-4 rounded-lg shadow border mb-8 space-y-3 w-full max-w-md"
        >
          <h2 id="form-titre" className="font-semibold text-lg text-primary mb-2">
            {editingId ? "Modifier le menu" : "Ajouter un nouveau menu"}
          </h2>
          <div>
            <label htmlFor="date" className="block mb-1 font-medium">
              Date <span className="text-danger">*</span>
            </label>
            <input
              id="date"
              type="date"
              className="w-full px-3 py-2 border-2 border-gray rounded"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="choix1" className="block mb-1 font-medium">
              Choix 1 <span className="text-danger">*</span>
            </label>
            <input
              id="choix1"
              placeholder="Choix 1"
              className="w-full px-3 py-2 border-2 border-gray rounded"
              value={form.choix1}
              onChange={e => setForm(f => ({ ...f, choix1: e.target.value }))}
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="choix2" className="block mb-1 font-medium">
              Choix 2 <span className="text-danger">*</span>
            </label>
            <input
              id="choix2"
              placeholder="Choix 2"
              className="w-full px-3 py-2 border-2 border-gray rounded"
              value={form.choix2}
              onChange={e => setForm(f => ({ ...f, choix2: e.target.value }))}
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1 font-medium">
              Description
            </label>
            <input
              id="description"
              placeholder="Description"
              className="w-full px-3 py-2 border-2 border-gray rounded"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              aria-required="false"
            />
          </div>
          <button
            className="bg-primary text-white rounded py-2 w-full font-bold hover:bg-success mt-2"
            type="submit"
          >
            {editingId ? "Modifier le menu" : "Ajouter le menu"}
          </button>
          {editingId && (
            <button
              type="button"
              className="text-danger underline mt-2 ml-2"
              onClick={() => {
                setEditingId(null);
                setForm({ date: "", choix1: "", choix2: "", description: "" });
              }}
              aria-label="Annuler la modification"
            >
              Annuler modification
            </button>
          )}
        </form>

        {/* Menus list */}
        <section className="w-full max-w-xl space-y-4">
          <h2 className="font-semibold text-xl text-white bg-black/50 rounded px-4 py-2 mb-4 shadow-lg drop-shadow-lg w-fit">
               Menus existants
          </h2>

          {menus.length === 0 && (
            <div className="text-center text-gray-500">
              Aucun menu pour le moment.
            </div>
          )}
          {menus.map(menu => (
            <div
              key={menu.id}
              className="bg-white/90 backdrop-blur rounded-lg shadow p-4 border-2 border-gray flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            >
              <div>
                <div className="font-semibold text-dark">{menu.date}</div>
                <div className="text-primary font-bold">{menu.choix1}</div>
                <div className="text-secondary">{menu.choix2}</div>
                <div className="text-xs text-gray">{menu.description}</div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(menu)}
                  className="bg-warning text-white px-3 py-1 rounded font-bold hover:bg-orange"
                  aria-label={`Modifier le menu du ${menu.date}`}
                >
                  Modifier
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(menu.id)}
                  className="bg-danger text-white px-3 py-1 rounded font-bold"
                  aria-label={`Supprimer le menu du ${menu.date}`}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
      {/* Footer: always present */}
      <Footer />
    </BackgroundWrapper>
  );
}
