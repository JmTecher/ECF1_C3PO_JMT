// src/AccueilCompta.jsx
import React from "react";
import BackgroundWrapper from "./components/BackgroundWrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Exemples de données
const stats = [
  { date: "2024-07-22", choix1: 8, choix2: 5, total: 13 },
  { date: "2024-07-23", choix1: 10, choix2: 7, total: 17 },
  { date: "2024-07-24", choix1: 7, choix2: 4, total: 11 },
  // etc.
];

export default function AccueilCompta({ user, onLogout }) {
  const totalSemaine = stats.reduce((acc, day) => acc + day.total, 0);

  return (
    <BackgroundWrapper>
      <Header user={user} onLogout={onLogout} />
      <main className="flex-1 flex flex-col items-center justify-center min-h-screen px-2 sm:px-4 md:px-8 lg:px-16 py-4 sm:py-8">
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur shadow-lg rounded-lg px-2 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-10 border border-gray flex flex-col items-center mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6 text-center">
            Synthèse comptable de la semaine
          </h2>

          {/* Tableau élargi */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-full border text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-3 border text-left">Date</th>
                  <th className="px-4 py-3 border text-center">Choix 1</th>
                  <th className="px-4 py-3 border text-center">Choix 2</th>
                  <th className="px-4 py-3 border text-center">Total réservations</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((day, idx) => (
                  <tr key={day.date} className={idx % 2 ? "bg-gray-50" : ""}>
                    <td className="px-4 py-2 border">{day.date}</td>
                    <td className="px-4 py-2 border text-center">{day.choix1}</td>
                    <td className="px-4 py-2 border text-center">{day.choix2}</td>
                    <td className="px-4 py-2 border text-center font-semibold">{day.total}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-4 py-3 border text-right" colSpan={3}>
                    Total général de la semaine
                  </td>
                  <td className="px-4 py-3 border text-center">{totalSemaine}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Bouton déconnexion */}
        <button
          className="mt-8 bg-danger text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 shadow transition text-base sm:text-lg"
          onClick={onLogout}
        >
          Déconnexion
        </button>
      </main>
      <Footer />
    </BackgroundWrapper>
  );
}
