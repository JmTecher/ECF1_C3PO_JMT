// Fonction à tester
function addMenu(menus, newMenu) {
  const menu = { ...newMenu, id: Date.now() }; 
  menus.push(menu);
  return menu;
}

QUnit.module("US-01 : Ajouter un nouveau menu");

QUnit.test("Ajouter un menu à la liste", function (assert) {
  const menus = [];
  const nouveauMenu = { date: "2024-12-30", choix1: "Lasagnes", choix2: "Salade", description: "Menu végétarien" };
  const result = addMenu(menus, nouveauMenu);

  // Affichage console
  console.log("Menus après ajout :", menus);
  console.log("Menu retourné :", result);

  // Affichage dans la page QUnit
  const div = document.createElement("div");
  div.textContent = "Menus après ajout : " + JSON.stringify(menus) + " | Menu retourné : " + JSON.stringify(result);
  document.getElementById("qunit-fixture").appendChild(div);

  assert.equal(menus.length, 1, "La liste de menus doit contenir un élément après ajout");
  assert.equal(menus[0].choix1, "Lasagnes", "Le choix 1 du menu ajouté doit être 'Lasagnes'");
  assert.equal(menus[0].date, "2024-12-30", "La date du menu ajouté doit être correcte");
});

// test nombre total de réservation
function getReservationCountByDate(reservations, menus, date) {
  // On compte toutes les réservations ayant une date correspondant à un menu de ce jour
  const menuIds = menus.filter(m => m.date === date).map(m => m.id);
  return reservations.filter(r => menuIds.includes(r.menuId)).length;
}

QUnit.module("US-10 : Voir le nombre total de réservations");

QUnit.test("Compter les réservations pour une date donnée", function (assert) {
  const menus = [
    { id: 1, date: "2024-12-30" },
    { id: 2, date: "2024-12-31" }
  ];
  const reservations = [
    { menuId: 1, userId: "u1" },
    { menuId: 1, userId: "u2" },
    { menuId: 2, userId: "u3" }
  ];
  const count30 = getReservationCountByDate(reservations, menus, "2024-12-30");
  const count31 = getReservationCountByDate(reservations, menus, "2024-12-31");

  // Affichage console
  console.log("Réservations pour 2024-12-30 :", count30);
  console.log("Réservations pour 2024-12-31 :", count31);

  // Affichage dans la page QUnit
  const div = document.createElement("div");
  div.textContent = "Réservations pour 2024-12-30 : " + count30 +
    " | Réservations pour 2024-12-31 : " + count31;
  document.getElementById("qunit-fixture").appendChild(div);

  assert.equal(count30, 2, "Il doit y avoir 2 réservations pour le 2024-12-30");
  assert.equal(count31, 1, "Il doit y avoir 1 réservation pour le 2024-12-31");
});
