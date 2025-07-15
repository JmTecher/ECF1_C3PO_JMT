// src/components/Header.jsx
import React from "react";

export default function Header({ user, onLogout }) {
  return (
    <header className="w-full py-6 px-4 bg-success flex flex-col md:flex-row items-center justify-between shadow-md rounded-b-2xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
          <span className="text-primary">C3PO</span>
          <span className="text-secondary font-light text-xl md:text-2xl ml-2">– Gestion des menus</span>
        </h1>
        <div className="mt-1 text-sm text-dark font-medium">
          Bienvenue sur votre espace de réservation <span className="text-info">sécurisé</span>
        </div>
      </div>
      {user && (
        <div className="mt-3 md:mt-0 flex items-center gap-4">
          <span className="text-dark text-sm">
            Connecté : <span className="font-bold text-primary">{user.username}</span> <span className="text-secondary">({user.role})</span>
          </span>
          {onLogout && (
            <button
              className="bg-danger text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
              onClick={onLogout}
            >
              Déconnexion
            </button>
          )}
        </div>
      )}
    </header>
  );
}
