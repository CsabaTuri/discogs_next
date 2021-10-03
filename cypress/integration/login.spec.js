describe("Login", () => {
  it("should login and url should http://localhost:3000/", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    cy.get('input[name="user_name"]').type("Username");

    cy.get('input[name="password"]').type("102360");

    cy.get('button[type="submit"').click();

    //cy.url().should("eq", "http://localhost:3000/");

    cy.contains("Kedvencek").click();

    //cy.url().should("eq", "http://localhost:3000/favorites");

    cy.contains("Felhasználók").click();

    //cy.url().should("eq", "http://localhost:3000/users");

    cy.contains("Profil").click();

    //cy.url().should("eq", "http://localhost:3000/user");

    cy.contains("Főoldal").click();

    //cy.url().should("eq", "http://localhost:3000/");

    cy.contains("Vissza").click();

    //cy.url().should("eq", "http://localhost:3000/user");

    cy.contains("Kilépés").click();

    //cy.url().should("eq", "http://localhost:3000/login");
  });
});
