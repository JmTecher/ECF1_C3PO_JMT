import React, { useState } from "react";
import BackgroundWrapper from "./components/BackgroundWrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { menus } from "./menus";

export default function AccueilClient({ user, onLogout }) {
  const [reservation, setReservation] = useState({});
  const [message, setMessage] = useState("");

  function reserver(menuId, choix) {
    setReservation(prev => ({
      ...prev,
      [menuId]: choix,
    }));
    setMessage("Réservation enregistrée !");
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <BackgroundWrapper>
      <Header user={user} onLogout={onLogout} />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">

        <div className="mx-auto w-fit mb-8 px-8 py-4 rounded-xl bg-white/90 backdrop-blur-md shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-bold text-primary drop-shadow">
            Bienvenue, {user?.username} <span className="text-base font-normal">({user?.role})</span>
          </h2>
          <h3 className="text-lg font-semibold mt-2 text-dark drop-shadow">
            Menus de la semaine :
          </h3>
        </div>

        <div className="mb-4 text-success">{message}</div>

        <div className="flex flex-col gap-6 w-full max-w-2xl">
          {menus.map(menu => (
            <div key={menu.id} className="bg-white/90 backdrop-blur rounded-lg shadow p-5 border border-gray flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <div className="font-bold text-primary mb-1">{menu.date}</div>
                <div className="text-dark mb-2">{menu.description}</div>
                <div className="flex flex-col md:flex-row gap-2">
                  <button
                    className={`px-4 py-2 rounded font-semibold border
                      ${reservation[menu.id] === "choix1"
                        ? "bg-success text-white border-success"
                        : "bg-light text-primary border-primary hover:bg-success/10"}
                    `}
                    onClick={() => reserver(menu.id, "choix1")}
                  >
                    {menu.choix1}
                  </button>
                  <button
                    className={`px-4 py-2 rounded font-semibold border
                      ${reservation[menu.id] === "choix2"
                        ? "bg-success text-white border-success"
                        : "bg-light text-primary border-primary hover:bg-success/10"}
                    `}
                    onClick={() => reserver(menu.id, "choix2")}
                  >
                    {menu.choix2}
                  </button>
                </div>
              </div>
              <div className="text-sm text-secondary mt-3 md:mt-0 md:ml-4">
                {reservation[menu.id]
                  ? <>Votre choix : <b>{reservation[menu.id] === "choix1" ? menu.choix1 : menu.choix2}</b></>
                  : <>Aucun choix</>
                }
              </div>
            </div>
          ))}
        </div>
        {/* Récapitulatif des réservations */}
            <div className="w-full max-w-2xl mt-8 bg-white/80 rounded-lg p-4 shadow border">
              <h4 className="font-bold text-primary mb-2">Vos réservations de la semaine :</h4>
              <ul className="space-y-1">
                {menus.map(menu => (
                  <li key={menu.id} className="flex justify-between items-center">
                    <span>
                      <span className="font-semibold">{menu.date}</span> :
                    </span>
                    <span>
                      {reservation[menu.id]
                        ? (reservation[menu.id] === "choix1" ? menu.choix1 : menu.choix2)
                        : <span className="italic text-gray-400">aucun choix</span>
                      }
                    </span>
                  </li>
                ))}
              </ul>
            </div>

        <button
          className="mt-8 px-4 py-2 bg-danger text-white rounded hover:bg-red-700 font-semibold"
          onClick={onLogout}
        >
          Déconnexion
        </button>
      </main>
      <Footer />
    </BackgroundWrapper>
  );
}
