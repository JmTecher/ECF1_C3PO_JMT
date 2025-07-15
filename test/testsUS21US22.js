// Fonctions à tester 
function getLunchMenusForDate(menus, date) {
  return menus.filter(menu => menu.type === "Déjeuner" && menu.date === date);
}

function reserveMenu(menus, reservations, userId, menuId, date, exceptionalDays=[]) {
  // Vérifier si le jour est fermé
  if (exceptionalDays.some(j => j.date === date && j.status === "CLOSED")) {
    return { status: "error", message: "Jour fermé" };
  }
  // Ajouter la réservation et incrémenter le compteur
  const menu = menus.find(m => m.id === menuId);
  if (!menu) return { status: "error", message: "Menu non trouvé" };
  menu.reserved = (menu.reserved || 0) + 1;
  reservations.push({ userId, menuId, date });
  return { status: "success" };
}

// ---- QUnit tests ----
QUnit.module("US-21 : Voir la liste des menus pour le déjeuner");

QUnit.test("Filtrer les menus pour une date donnée", function (assert) {
  const menus = [
    { id: "menu-001", type: "Déjeuner", date: "2024-12-30", name: "Poulet rôti" },
    { id: "menu-002", type: "Petit déjeuner", date: "2024-12-30", name: "Croissant" },
    { id: "menu-003", type: "Déjeuner", date: "2024-12-31", name: "Salade César" },
  ];
  const date = "2024-12-30";
  const result = getLunchMenusForDate(menus, date);

  // Affichage console
  console.log("Résultat du filtre menus pour la date", date, ":", result);

  // Affichage sur la page QUnit 
  const div = document.createElement("div");
  div.textContent = "Menus filtrés : " + JSON.stringify(result);
  document.getElementById("qunit-fixture").appendChild(div);

  assert.equal(result.length, 1, "Un seul menu de déjeuner doit être retourné");
  assert.equal(result[0].id, "menu-001", "Le menu retourné doit être menu-001");
});

QUnit.test("Gérer une liste vide pour une date sans menus", function (assert) {
  const menus = [{ id: "menu-001", type: "Déjeuner", date: "2024-12-30" }];
  const date = "2024-12-31";
  const result = getLunchMenusForDate(menus, date);

  // Affichage console
  console.log("Menus filtrés pour date sans menus :", result);

  // Affichage sur la page QUnit
  const div = document.createElement("div");
  div.textContent = "Menus filtrés (date sans menus) : " + JSON.stringify(result);
  document.getElementById("qunit-fixture").appendChild(div);

  assert.equal(result.length, 0, "Aucun menu de déjeuner ne doit être retourné");
});

QUnit.module("US-22 : Réserver un menu de déjeuner");

QUnit.test("Réserver un menu avec des places disponibles", function (assert) {
  const menus = [
    { id: "menu-001", type: "Déjeuner", reserved: 5, maxReservations: 10 },
  ];
  const reservations = [];
  const userId = "user-001";
  const menuId = "menu-001";
  const date = "2024-12-30";
  const result = reserveMenu(menus, reservations, userId, menuId, date);

  // Affichage console
  console.log("Réservation résultat (places dispo):", result, "menus:", menus, "reservations:", reservations);

  // Affichage sur la page QUnit
  const div = document.createElement("div");
  div.textContent = "Réservation (places dispo) : " + JSON.stringify(result) +
    " | menus: " + JSON.stringify(menus) +
    " | reservations: " + JSON.stringify(reservations);
  document.getElementById("qunit-fixture").appendChild(div);

  assert.equal(result.status, "success", "La réservation doit être confirmée");
  assert.equal(menus[0].reserved, 6, "Le compteur de réservations doit passer à 6");
});

QUnit.test("Refuser une réservation pour un jour fermé", function (assert) {
  const menus = [
    { id: "menu-001", type: "Déjeuner", reserved: 5, maxReservations: 10 },
  ];
  const reservations = [];
  const exceptionalDays = [{ date: "2024-12-25", status: "CLOSED" }];
  const userId = "user-001";
  const menuId = "menu-001";
  const date = "2024-12-25";
  const result = reserveMenu(menus, reservations, userId, menuId, date, exceptionalDays);

  // Affichage console
  console.log("Réservation résultat (jour fermé):", result);

  // Affichage sur la page QUnit
  const div = document.createElement("div");
  div.textContent = "Réservation (jour fermé) : " + JSON.stringify(result);
  document.getElementById("qunit-fixture").appendChild(div);

  assert.equal(result.status, "error", "La réservation doit être refusée");
  assert.equal(menus[0].reserved, 5, "Le compteur ne doit pas changer");
});
