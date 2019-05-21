import { exportAllDeclaration } from "@babel/types";

describe("Opening", () => {
  it("Should open successfully", () => {
    cy.visit("http://localhost:8080");
  });
  describe("the start settings dialogue", () => {
    it("should be there", () => {
      cy.get("div.form");
    });
    it("should contain  a number input with default value 1", () => {
      cy.get("input[type='number']").should("have.value", "1");
    });
    it("should contain one text input with no content", () => {
      cy.get("input[type='text']").should("be.empty");
    });
    it("should contain a radio button menu", () => {
      cy.get("input[type='radio'][name='numberOfCards']").should(
        "have.length",
        5
      );
    });
    it("should contain a start button", () => {
      cy.get("button").should("have.text", "Start");
    });
  });
  describe("clicking the start button without a name filled in", () => {
    it("should do nothing", () => {
      cy.get("button").click();
      cy.get("div.form").should("exist");
      cy.get("div#game").should("not.exist");
    });
  });
  describe("when filling in a name and clicking the button", () => {
    it("the game should be visible", () => {
      cy.get("input[type='text']").type("test");
      cy.get("button").click();
      cy.get("div#game");
      cy.get("div#card-container");
    });
    it("by default there should be 24 cards", () => {
      cy.get("div#card-container > div.card").should("have.length", 24);
    });
    it("there should be no turned cards", () => {
      cy.get("div.card.isTurned").should("have.length", 0);
    });
    it("the player container should be visible", () => {
      cy.get("div#player-container");
    });
    it("the player container should contain my name", () => {
      cy.get("div#player-container")
        .get("div.player")
        .get("div.name")
        .should("have.text", "test");
    });
    it("the player name should be in bold because it is at turn", () => {
      cy.get("div.name").should(el =>
        expect(el)
          .to.have.css("font-weight")
          .match(/700|bold/)
      );
    });
    it("the score should be 0", () => {
      cy.get("div.score").should("have.text", "0 points");
    });
    it("the hit rate should be 0", () => {
      cy.get("div.success").contains("0%");
    });
  });
  describe("when clicking a card", () => {
    it("should be turned around", () => {
      let card = cy
        .get("div.card")
        .first()
        .click()
        .should("have.class", "isTurned");
    });
    it("when clicking it again, it should be turned back", () => {
      cy.get("div.card")
        .first()
        .click()
        .should("not.have.class", "isTurned");
    });
  });
  describe("settings", () => {
    it("when the flip card setting box is not checked, the card should have no flip transition", () => {
      cy.get("div.card-inner").should(el => {
        expect(el)
          .to.have.css("transition")
          .match(/none/);
      });
    });
    it("when the flip card setting box is checked, the card should have a flip transition", () => {
      cy.get("#showFlipAnimation").click();
      cy.get("div.card-inner").should(el => {
        expect(el)
          .to.have.css("transition")
          .match(/all/);
      });
    });
  });
});
