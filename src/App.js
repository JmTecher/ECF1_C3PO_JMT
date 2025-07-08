import React, { useState } from "react";
import Connexion from "./Connexion";
import AccueilClient from "./AccueilClient";
import AccueilRestaurateur from "./AccueilRestaurateur";
import AccueilCompta from "./AccueilCompta";

export default function App() {
  const [user, setUser] = useState(null);

  // Gère la connexion (appelée par Connexion.jsx)
  function handleLogin(username, role) {
    setUser({ username, role });
  }

  // Déconnexion (appelée par chaque page d’accueil)
  function handleLogout() {
    setUser(null);
  }

  // Si pas connecté, affiche la page de connexion
  if (!user) {
    return <Connexion onLogin={handleLogin} />;
  }

  // Sinon, affiche la page du rôle correspondant
  switch (user.role) {
    case "client":
      return <AccueilClient user={user} onLogout={handleLogout} />;
    case "restaurateur":
      return <AccueilRestaurateur user={user} onLogout={handleLogout} />;
    case "compta":
      return <AccueilCompta user={user} onLogout={handleLogout} />;
    default:
      return <div>Rôle inconnu</div>;
  }
}
