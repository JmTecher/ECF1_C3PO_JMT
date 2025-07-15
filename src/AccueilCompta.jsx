import React from "react";
import BackgroundWrapper from "./components/BackgroundWrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { menus } from "./menus";

// Exemple de réservations 
const reservations = [
  { menuId: 1, choix: "choix1" },
  { menuId: 1, choix: "choix2" },
  { menuId: 1, choix: "choix1" },
  { menuId: 2, choix: "choix2" },
  { menuId: 2, choix: "choix2" },
];

export default function AccueilCompta({ user, onLogout }) {
  function countReservations(menu, choix) {
    return reservations.filter(r => r.menuId === menu.id && r.choix === choix).length;
  }
  function totalForMenu(menu) {
    return countReservations(menu, "choix1") + countReservations(menu, "choix2");
  }
  const totalGeneral = menus.reduce((acc, menu) => acc + totalForMenu(menu), 0);

  return (
    <BackgroundWrapper>
      <Header user={user} onLogout={onLogout} />

      <main className="flex-1 flex flex-col items-center justify-center px-2 md:px-4 py-10">
        <div className="mx-auto w-fit mb-8 px-4 md:px-8 py-4 rounded-xl bg-white/90 backdrop-blur-md shadow-lg flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-bold text-primary drop-shadow">
            Bienvenue, {user?.username} <span className="text-base font-normal">(Comptabilité)</span>
          </h2>
          <h3 className="text-md md:text-lg font-semibold mt-2 text-dark drop-shadow">
            Statistiques des réservations par jour
          </h3>
        </div>

        {/* Tableau responsive */}
        <div className="w-full max-w-3xl overflow-x-auto rounded-xl shadow">
          <table className="w-full min-w-[420px] bg-white/90 border">
            <thead>
              <tr className="bg-light border-b">
                <th className="px-2 md:px-3 py-2 text-left text-xs md:text-base">Date</th>
                <th className="px-2 md:px-3 py-2 text-left text-xs md:text-base">Choix 1</th>
                <th className="px-2 md:px-3 py-2 text-left text-xs md:text-base">Choix 2</th>
                <th className="px-2 md:px-3 py-2 text-left font-bold text-xs md:text-base">Total réservations</th>
              </tr>
            </thead>
            <tbody>
              {menus.map(menu => (
                <tr key={menu.id} className="border-b">
                  <td className="px-2 md:px-3 py-2">{menu.date}</td>
                  <td className="px-2 md:px-3 py-2">{countReservations(menu, "choix1")}</td>
                  <td className="px-2 md:px-3 py-2">{countReservations(menu, "choix2")}</td>
                  <td className="px-2 md:px-3 py-2 font-bold">{totalForMenu(menu)}</td>
                </tr>
              ))}
              <tr className="bg-warning/20 border-t-2 border-warning">
                <td colSpan={3} className="px-2 md:px-3 py-2 text-right font-bold">Total général sur la semaine</td>
                <td className="px-2 md:px-3 py-2 font-bold">{totalGeneral}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          className="mt-4 px-4 py-2 bg-danger text-white rounded hover:bg-red-700 font-semibold"
          onClick={onLogout}
        >
          Déconnexion
        </button>
      </main>
      <Footer />
    </BackgroundWrapper>
  );
}
