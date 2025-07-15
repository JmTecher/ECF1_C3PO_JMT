import React, { useState } from "react";
import BackgroundWrapper from "./components/BackgroundWrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { menus as menusInit } from "./menus";

export default function AccueilRestaurateur({ user, onLogout }) {
  const [menus, setMenus] = useState(menusInit);
  const [form, setForm] = useState({ date: "", choix1: "", choix2: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  // Ajouter ou modifier un menu
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

  function handleDelete(id) {
    setMenus(menus.filter(menu => menu.id !== id));
    if (editingId === id) setEditingId(null);
  }

  function handleEdit(menu) {
    setForm(menu);
    setEditingId(menu.id);
  }

  return (
    <BackgroundWrapper>
      <Header user={user} onLogout={onLogout} />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">

        {/* Bloc d'entête lisible */}
        <div className="mx-auto w-fit mb-8 px-8 py-4 rounded-xl bg-white/90 backdrop-blur-md shadow-lg flex flex-col items-center border border-gray">
          <h1 className="text-2xl font-bold text-primary drop-shadow">
            Bienvenue, {user.username} <span className="text-base font-normal">(Restaurateur)</span>
          </h1>
          <p className="mt-2 text-dark text-lg font-semibold drop-shadow">
            Gérez vos menus du jour :
          </p>
        </div>

        {/* Formulaire d’ajout/modif */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur p-4 rounded-lg shadow border mb-8 space-y-2 w-full max-w-md"
        >
          <input
            type="date"
            className="w-full px-3 py-2 border-2 border-gray rounded"
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            required
          />
          <input
            placeholder="Choix 1"
            className="w-full px-3 py-2 border-2 border-gray rounded"
            value={form.choix1}
            onChange={e => setForm(f => ({ ...f, choix1: e.target.value }))}
            required
          />
          <input
            placeholder="Choix 2"
            className="w-full px-3 py-2 border-2 border-gray rounded"
            value={form.choix2}
            onChange={e => setForm(f => ({ ...f, choix2: e.target.value }))}
            required
          />
          <input
            placeholder="Description"
            className="w-full px-3 py-2 border-2 border-gray rounded"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
          <button className="bg-primary text-white rounded py-2 w-full font-bold hover:bg-success mt-2" type="submit">
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
            >
              Annuler modification
            </button>
          )}
        </form>

        {/* Liste des menus */}
        <div className="w-full max-w-xl space-y-4">
          {menus.length === 0 && (
            <div className="text-center text-gray-500">Aucun menu pour le moment.</div>
          )}
          {menus.map(menu => (
            <div key={menu.id} className="bg-white/90 backdrop-blur rounded-lg shadow p-4 border-2 border-gray flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <div className="font-semibold text-dark">{menu.date}</div>
                <div className="text-primary font-bold">{menu.choix1}</div>
                <div className="text-secondary">{menu.choix2}</div>
                <div className="text-xs text-gray">{menu.description}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(menu)} className="bg-warning text-white px-3 py-1 rounded font-bold hover:bg-orange">Modifier</button>
                <button onClick={() => handleDelete(menu.id)} className="bg-danger text-white px-3 py-1 rounded font-bold">Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </BackgroundWrapper>
  );
}
