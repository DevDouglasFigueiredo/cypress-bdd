import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import ChartsPage from '../../pages/ChartsPage'
import "cypress-real-events";

When('I refresh the page', () => {
   ChartsPage.refreshPage();
})

When('I hover over the time series charts', () => {
   ChartsPage.hoverOverChart();
})

Then('I should see a tooltip displaying the data values', () => {
    ChartsPage.validateTooltipContent('Monday, Jan 1, 01:00 AM​● Axial: 20 g​');
})

Then('I should see a header with machine information', () => {
    cy.contains(ChartsPage.elements.titleTag, ChartsPage.elements.subtitle).should('be.visible')
})

Then('I should see a data of machine', () => {
    cy.contains(ChartsPage.elements.span.dataMachine, ChartsPage.elements.span.regexMachine).should('be.visible')
})

Then('I should see a data of spot', () => {
    cy.contains(ChartsPage.elements.span.dataMachine, ChartsPage.elements.span.regexSpot).should('be.visible')
})

Then('I should see a data of rpm', () => {
    cy.contains(ChartsPage.elements.span.dataMachine, ChartsPage.elements.span.regexRpm).should('be.visible')
})

Then('I should see a data of dynamic range', () => {
    cy.contains(ChartsPage.elements.span.dataMachine, ChartsPage.elements.span.regexDynamicRange).should('be.visible')
})

// Then('I should see a data of interval', () => {
//     cy.contains(ChartsPage.elements.span.dataMachine, ChartsPage.elements.span.regexInterval).should('be.visible')
// })

Then('some charts on the page', () => {
    cy.contains(ChartsPage.elements.titleTag, ChartsPage.elements.title.acceleration).should('exist');
    cy.contains(ChartsPage.elements.titleTag, ChartsPage.elements.title.velocity).should('exist');
    cy.contains(ChartsPage.elements.titleTag, ChartsPage.elements.title.temperature).should('exist');
    cy.get(ChartsPage.elements.chartGroup).should('have.length', 3);
})

Then('I should see a chart for Aceleração RMS', () => {
    cy.contains(ChartsPage.elements.titleTag, ChartsPage.elements.title.acceleration).should('exist');
})

Then('I should see a chart for Temperatura', () => {
    cy.contains(ChartsPage.elements.titleTag, ChartsPage.elements.title.temperature).should('exist');
})

Then('I should see a chart for Velocidade RMS', () => {
    cy.contains(ChartsPage.elements.titleTag, ChartsPage.elements.title.velocity).should('exist');
})

Then('I should see updated data of charts', () => {
    ChartsPage.validadeUpdateChartData();
    ChartsPage.validateMetadata();

    ChartsPage.hoverOverChart();
    ChartsPage.validateTooltipContent('Monday, Jan 1, 12:00 AM​● Axial: 111 g​');
})