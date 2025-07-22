// src/components/Header.jsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Assure-toi que lucide-react est installé

export default function Header({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  // Personnalise ce tableau pour ajouter des liens si besoin
  const menuLinks = [
    // { label: "Accueil", href: "/" },
    // { label: "Mon compte", href: "/profil" },
  ];

  return (
    <header className="w-full py-6 px-4 bg-success flex flex-col md:flex-row items-center justify-between shadow-md rounded-b-2xl relative z-50">
      {/* Logo et sous-titre */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
          <span className="text-primary">C3PO</span>
          <span className="text-secondary font-light text-xl md:text-2xl ml-2">
            – Gestion des menus
          </span>
        </h1>
        <div className="mt-1 text-sm text-dark font-medium">
          Bienvenue sur votre espace de réservation <span className="text-info">sécurisé</span>
        </div>
      </div>

      {/* Zone droite : user, déconnexion, menu burger alignés */}
      {user && (
        <div className="mt-3 md:mt-0 flex items-center gap-2">
          <span className="text-dark text-sm">
            Connecté : <span className="font-bold text-primary">{user.username}</span>{" "}
            <span className="text-secondary">({user.role})</span>
          </span>
          {onLogout && (
            <button
              className="bg-danger text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
              onClick={onLogout}
              aria-label="Déconnexion"
            >
              Déconnexion
            </button>
          )}
          {/* Burger menu toujours affiché */}
          <button
            className="text-primary focus:outline-none ml-1"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen(o => !o)}
            type="button"
          >
            {open ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      )}

      {/* Side drawer nav (slide-over menu) */}
      {user && open && (
        <nav
          className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-white shadow-2xl z-50 flex flex-col items-start px-6 py-8 gap-6 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
        >
          <button
            className="absolute top-4 right-4 text-primary"
            aria-label="Fermer le menu"
            onClick={() => setOpen(false)}
            type="button"
          >
            <X size={28} />
          </button>
          <span className="text-dark text-base mb-2 mt-6">
            Connecté : <span className="font-bold text-primary">{user.username}</span>{" "}
            <span className="text-secondary">({user.role})</span>
          </span>
          {/* Ajoute ici tes liens de navigation si besoin */}
          {menuLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-primary font-semibold py-2 px-2 rounded hover:bg-success/20 transition"
            >
              {link.label}
            </a>
          ))}
          {onLogout && (
            <button
              className="mt-4 bg-danger text-white px-4 py-2 rounded font-semibold w-full hover:bg-red-700 transition"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              aria-label="Déconnexion"
            >
              Déconnexion
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
