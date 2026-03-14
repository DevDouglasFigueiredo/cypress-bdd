import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

const mockData = {
  data: [
    {
      name: "accelerationRms/x",
      data: [
        { datetime: "2024-01-01T00:00:00Z", max: 10 },
        { datetime: "2024-01-01T01:00:00Z", max: 20 },
      ]
    },
    {
      name: "accelerationRms/y",
      data: [
        { datetime: "2024-01-01T00:00:00Z", max: 30 },
        { datetime: "2024-01-01T01:00:00Z", max: 40 },
      ]
    },
    {
      name: "accelerationRms/z",
      data: [
        { datetime: "2024-01-01T00:00:00Z", max: 50 },
        { datetime: "2024-01-01T01:00:00Z", max: 60 },
      ]
    }
  ]
}

Given('I am on the charts page', () => {
    cy.intercept('GET', '**/data.json', mockData).as('getData')
    cy.intercept('GET', '**/metadata.json').as('getMetadata')

    cy.visit('https://frontend-test-for-qa.vercel.app/')
})