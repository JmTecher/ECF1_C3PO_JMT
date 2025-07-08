import React, { useState } from "react";
import { users } from "./data"; // adapte le chemin selon ton projet

export default function Connexion({ onLogin }) {
  // États du formulaire
  const [role, setRole] = useState("client");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Gestion de la soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérifie dans le "faux backend" (data.js)
    const found = users.find(
      u => u.username === username && u.password === password && u.role === role
    );
    if (found) {
      setSuccess(true);
      setError("");
      setTimeout(() => setSuccess(false), 1000);
      onLogin && onLogin(username, role);
    } else {
      setSuccess(false);
      setError("Identifiant, mot de passe ou rôle incorrect.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans"
      style={{
        backgroundImage: "url('/cantine.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Header */}
      <header className="w-full text-center py-10 bg-success bg-opacity-90 rounded-b-2xl shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight drop-shadow-sm">
          <span className="text-primary">C3PO</span>
          <span className="text-secondary font-light text-xl md:text-2xl align-middle ml-2">– Gestion des menus</span>
        </h1>
        <div className="mt-2 text-sm text-dark font-medium">
          Bienvenue sur votre espace de réservation <span className="text-info">sécurisé</span>
        </div>
      </header>

      {/* Carte de connexion */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8 border-2 border-gray">
          <h2 className="text-xl font-bold mb-4 text-center text-primary">Connexion</h2>
          
          {success && (
            <div className="bg-success/10 text-success px-3 py-2 mb-4 rounded flex items-center gap-2 justify-center">
              <span className="inline-block w-4 h-4 bg-success rounded-full" />
              Connexion réussie !
            </div>
          )}
          {error && (
            <div className="bg-danger/10 text-danger px-3 py-2 mb-4 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sélecteur de rôle */}
            <div className="flex flex-col items-center">
              <label htmlFor="role" className="block font-semibold text-dark mb-1 text-center w-full">
                Je suis :
              </label>
              <select
                id="role"
                className="block w-full max-w-xs px-3 py-2 border-2 border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary transition"
                style={{ minWidth: 220 }}
                value={role}
                onChange={e => setRole(e.target.value)}
                required
              >
                <option value="client">Client</option>
                <option value="restaurateur">Restaurateur</option>
                <option value="compta">Comptabilité</option>
              </select>
            </div>
            {/* Identifiant */}
            <div>
              <label htmlFor="username" className="block font-semibold text-dark mb-1">
                Identifiant
              </label>
              <input
                id="username"
                type="text"
                className="w-full px-3 py-2 border-2 border-gray rounded focus:outline-none focus:ring-2 focus:ring-warning transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                autoComplete="username"
              />
            </div>
            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block font-semibold text-dark mb-1">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 border-2 border-gray rounded focus:outline-none focus:ring-2 focus:ring-warning transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            {/* Bouton */}
            <button
              type="submit"
              className="w-full py-2 bg-primary text-white rounded-lg hover:bg-orange hover:text-dark font-semibold transition-colors"
            >
              Se connecter
            </button>
          </form>
          {/* Lien mot de passe oublié */}
          <div className="mt-5 text-center">
            <a
              href="#"
              className="text-sm text-secondary hover:text-info hover:underline transition-colors"
            >
              Mot de passe oublié ?
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-gray-400 text-xs bg-dark/80">
        <span className="text-white">© 2025 C3PO – Application ECF</span>
      </footer>
    </div>
  );
}
