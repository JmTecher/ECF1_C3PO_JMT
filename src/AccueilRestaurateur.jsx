import React from "react";
export default function AccueilRestaurateur({ user, onLogout }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light">
      <h1 className="text-2xl font-bold text-primary mb-6">
        Bienvenue, {user.username} (Restaurateur)
      </h1>
      <p className="mb-8">Espace de gestion des menus.</p>
      <button
        className="bg-danger text-white px-4 py-2 rounded"
        onClick={onLogout}
      >
        Déconnexion
      </button>
    </div>
  );
}
