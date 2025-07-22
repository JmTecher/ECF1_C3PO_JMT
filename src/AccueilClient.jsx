import React, { useState } from "react";
import BackgroundWrapper from "./components/BackgroundWrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { menus } from "./menus";

// Main client page: menu reservation
export default function AccueilClient({ user, onLogout }) {
  const [reservation, setReservation] = useState({});
  const [message, setMessage] = useState("");

  // Handle reservation action
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
      {/* Header: logo, user info, logout */}
      <Header user={user} onLogout={onLogout} />

      <main
        className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 min-h-screen max-w-full 2xl:max-w-[1600px] mx-auto"
        id="main-content"
        tabIndex={-1}
        aria-label="Contenu principal"
      >
        {/* Main title for the week menu */}
        <section
          className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-3 sm:px-4 md:px-8 lg:px-12 xl:px-16 py-3 sm:py-4 md:py-6 lg:py-10 xl:py-12 rounded-lg sm:rounded-xl bg-white/90 backdrop-blur-md shadow-lg flex flex-col items-center transition-all duration-500"
        >
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-primary drop-shadow text-center leading-tight">
            Menus de la semaine
          </h1>
          <span className="block text-base sm:text-lg md:text-xl mt-2 text-gray-600 text-center">
            Bienvenue, <b>{user?.username}</b> {user?.role && <span>({user.role})</span>}
          </span>
        </section>

        {/* Confirmation message */}
        <div
          className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-8 text-success text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-center px-2 transition-all duration-500"
          role="status"
          aria-live="polite"
        >
          {message}
        </div>

        {/* Menus of the week */}
        <section
          className="flex flex-col gap-3 sm:gap-5 md:gap-8 lg:gap-10 xl:gap-12 w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl px-2 sm:px-4 md:px-8 lg:px-10 xl:px-12 transition-all duration-500"
          aria-labelledby="titre-menus"
        >
          {menus.map(menu => (
            <div
              key={menu.id}
              className="bg-white/90 backdrop-blur rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-3 sm:p-4 md:p-8 lg:p-12 xl:p-16 border border-gray flex flex-col"
            >
              <div className="flex-1 mb-3 lg:mb-0 lg:pr-8 xl:pr-16">
                {/* Menu date */}
                <div className="font-bold text-primary mb-1 sm:mb-2 md:mb-4 lg:mb-6 text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl">
                  {menu.date}
                </div>
                {/* Menu description */}
                <div className="text-dark mb-2 sm:mb-3 md:mb-6 lg:mb-8 text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl leading-relaxed">
                  {menu.description}
                </div>

                {/* Choice buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-5 lg:gap-6 xl:gap-8">
                  <button
                    type="button"
                    aria-label={`Réserver "${menu.choix1}" pour le ${menu.date}`}
                    className={`px-3 sm:px-4 md:px-8 lg:px-12 xl:px-16 py-2 sm:py-2.5 md:py-4 lg:py-5 xl:py-6 rounded font-semibold border text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl transition-all duration-200 hover:scale-105 active:scale-95 flex-1 sm:flex-none md:min-w-[180px] lg:min-w-[280px] xl:min-w-[350px]
                      ${reservation[menu.id] === "choix1"
                        ? "bg-success text-white border-success shadow-md"
                        : "bg-light text-primary border-primary hover:bg-success/10 hover:border-success/30"}
                    `}
                    onClick={() => reserver(menu.id, "choix1")}
                  >
                    {menu.choix1}
                  </button>
                  <button
                    type="button"
                    aria-label={`Réserver "${menu.choix2}" pour le ${menu.date}`}
                    className={`px-3 sm:px-4 md:px-8 lg:px-12 xl:px-16 py-2 sm:py-2.5 md:py-4 lg:py-5 xl:py-6 rounded font-semibold border text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl transition-all duration-200 hover:scale-105 active:scale-95 flex-1 sm:flex-none md:min-w-[180px] lg:min-w-[280px] xl:min-w-[350px]
                      ${reservation[menu.id] === "choix2"
                        ? "bg-success text-white border-success shadow-md"
                        : "bg-light text-primary border-primary hover:bg-success/10 hover:border-success/30"}
                    `}
                    onClick={() => reserver(menu.id, "choix2")}
                  >
                    {menu.choix2}
                  </button>
                </div>
              </div>
              {/* Reservation status : centré sous les boutons */}
              <div
                className="w-full flex justify-center mt-4"
                role="status"
                aria-live="polite"
              >
                {reservation[menu.id]
                  ? (
                    <>
                      <span className="text-base text-secondary mr-1">Votre choix :</span>
                      <b className="text-base text-success">
                        {reservation[menu.id] === "choix1" ? menu.choix1 : menu.choix2}
                      </b>
                    </>
                  )
                  : (
                    <span className="italic text-gray-700 bg-white/90 px-4 py-1 rounded-full shadow text-base text-center">
                      Aucun choix
                    </span>
                  )
                }
              </div>
            </div>
          ))}
        </section>

        {/* Booking summary */}
        <section className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-16 bg-white/80 rounded-lg p-3 sm:p-4 md:p-8 lg:p-12 xl:p-16 shadow-md border mx-2 sm:mx-0 transition-all duration-500">
          <h2 className="font-bold text-primary mb-2 sm:mb-3 md:mb-5 lg:mb-8 text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl">
            Récapitulatif des réservations
          </h2>
          <ul className="space-y-1 sm:space-y-2 md:space-y-4 lg:space-y-6">
            {menus.map(menu => (
              <li key={menu.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 md:gap-4 lg:gap-6 py-1 sm:py-0 md:py-2 lg:py-3">
                <span className="text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl">
                  <span className="font-semibold text-primary">{menu.date}</span> :
                </span>
                <span className="text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl pl-2 sm:pl-0 sm:text-right">
                  {reservation[menu.id]
                    ? (
                      <span className="font-medium text-success">
                        {reservation[menu.id] === "choix1" ? menu.choix1 : menu.choix2}
                      </span>
                    )
                    : (
                      <span className="italic text-gray-700 bg-white/80 px-3 py-1 rounded shadow-sm">
                        Aucun choix
                      </span>
                    )
                  }
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Logout button */}
        <button
          className="mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 bg-danger text-white rounded-lg hover:bg-red-700 font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          aria-label="Déconnexion"
          onClick={onLogout}
        >
          Déconnexion
        </button>
      </main>
      {/* Footer: site info, copyright, etc. */}
      <Footer />
    </BackgroundWrapper>
  );
}
