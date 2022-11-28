/// <reference types="cypress" />"

describe("todo app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should have empty todo-list by default", () => {
    cy.get('[data-id="list"] li').should("have.length", 0);
  });

  it("should create and delete todos", () => {
    cy.get("#write-to-do").type("kochen");
    cy.get("#button-add").click();
    cy.get("#write-to-do").type("putzen");
    cy.get("#button-add").click();
    cy.get('[data-id="list"] li').should("have.length", 2);
    cy.get("#write-to-do").clear();
    cy.get("label [id^=kochen]").click();
    cy.get("#button-remove").click();
    cy.get('[data-id="list"] li').should("have.length", 1);
  });
});
