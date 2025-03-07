describe("Playlists Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");

    cy.get("input").first().type("admin");
    cy.get("input").eq(1).type("password");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/homepage");
    cy.visit("http://localhost:3000/playlists");
  });

  it("displays the playlist page", () => {
    cy.contains("Playlists").should("be.visible");

    cy.get('[data-testid="add-playlist-button"]').should("be.visible");

    cy.get("div").contains("Playlists").should("be.visible");
    cy.get("div").should("not.contain", "CircularProgress");
  });

  it("opens the add playlist dialog", () => {
    cy.get('[data-testid="add-playlist-button"]')
      .contains("Add Playlist")
      .click();

    cy.contains("New Playlist").should("be.visible");

    cy.get('[data-testid="input-playlist-name"]').type("My New Playlist");
    cy.get('[data-testid="input-playlist-description"]').type(
      "This is a new playlist."
    );

    cy.get('[data-testid="save-playlist-button"]').contains("Save").click();

    // Ensure the playlist appears in the list
    cy.contains("My New Playlist").should("be.visible");
  });

  it("edits an existing playlist", () => {
    cy.get('[data-testid="edit-playlist-button"]').first().click();

    // Ensure the dialog opens with the correct title
    cy.contains("Edit Playlist").should("be.visible");

    // Update the playlist name and description
    cy.get('[data-testid="input-playlist-name"]').type("Updated");
    cy.get('[data-testid="input-playlist-description"]').type("Updated");

    cy.get('[data-testid="save-playlist-button"]').contains("Save").click();

    cy.contains("Updated").should("be.visible");
  });
});
