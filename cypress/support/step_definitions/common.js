import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// payload para a primeira carga
const firstMock = {
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

// payload para a segunda carga (valores diferentes para demonstrar atualização)
const secondMock = {
  data: [
    {
      name: "accelerationRms/x",
      data: [
        { datetime: "2024-01-01T00:00:00Z", max: 111 },
        { datetime: "2024-01-01T01:00:00Z", max: 222 },
      ]
    },
    {
      name: "accelerationRms/y",
      data: [
        { datetime: "2024-01-01T00:00:00Z", max: 333 },
        { datetime: "2024-01-01T01:00:00Z", max: 444 },
      ]
    },
    {
      name: "accelerationRms/z",
      data: [
        { datetime: "2024-01-01T00:00:00Z", max: 555 },
        { datetime: "2024-01-01T01:00:00Z", max: 666 },
      ]
    }
  ]
}

Given('I am on the charts page', () => {
  // intercept dinâmico: primeira chamada retorna firstMock, chamadas subsequentes retornam secondMock
  let call = 0
  cy.intercept('GET', '**/data.json', (req) => {
    call += 1
    if (call === 1) req.reply(firstMock)
    else req.reply(secondMock)
  }).as('getData')

  cy.intercept('GET', '**/metadata.json').as('getMetadata')

  cy.visit('https://frontend-test-for-qa.vercel.app/')

  // aguarda a primeira carga e expõe a resposta para asserções posteriores
  cy.wait('@getData').then((interception) => {
    cy.wrap(interception.response.body).as('firstData')
  })

  cy.wait('@getMetadata').then((interception) => {
    cy.wrap(interception.response.body).as('firstMetadata')
  })
})