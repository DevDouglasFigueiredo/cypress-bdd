import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

When('I refresh the page', () => {
    // reload first, then wait the requests triggered by the reload and save their responses
    cy.reload();
    cy.wait('@getData').then((interception) => {
        cy.wrap(interception.response.body).as('secondData')
    })
    cy.wait('@getMetadata').then((interception) => {
        cy.wrap(interception.response.body).as('secondMetadata')
    })
})

Then('I should see a header with machine information', () => {
    cy.contains('h6', 'Análise de dados').should('be.visible')
})

Then('I should see a data of machine', () => {
    cy.contains('span.MuiTypography-caption', /^Máquina\s+\d+$/).should('be.visible')
})

Then('I should see a data of spot', () => {
    cy.contains('span.MuiTypography-caption', /^Ponto\s+\d+$/).should('be.visible')
})

Then('I should see a data of rpm', () => {
    cy.contains('span.MuiTypography-caption', /^\d+$/).should('be.visible')
})

Then('I should see a data of dynamic range', () => {
    cy.contains('span.MuiTypography-caption', /^\d+g$/).should('be.visible')
})

// Then('I should see a data of interval', () => {
//     cy.contains('span.MuiTypography-caption', /^(\d+)\s*min$/i).should('be.visible')
// })

Then('some charts on the page', () => {
    cy.contains('h6', 'RMS').should('exist');
    cy.contains('h6', 'Temperatura').should('exist');
    cy.get('.highcharts-series-group').should('have.length', 3);
})

Then('I should see a chart for Aceleração RMS', () => {
    cy.contains('h6', 'Aceleração RMS').should('exist');
})

Then('I should see a chart for Temperatura', () => {
    cy.contains('h6', 'Temperatura').should('exist');
})

Then('I should see a chart for Velocidade RMS', () => {
    cy.contains('h6', 'Velocidade RMS').should('exist');
})

Then('I should see updated data of charts', () => {
    // compara a primeira carga (alias criada no Given) com a segunda (alias criada no When)
    cy.get('@firstData').then((first) => {
        cy.get('@secondData').then((second) => {
            const series = second.data
            expect(series.length).to.eq(3)

            // valida estrutura da série
            expect(series[0].data.length).to.eq(2)
            expect(series[0].name).to.eq('accelerationRms/x')
            expect(series[1].name).to.eq('accelerationRms/y')
            expect(series[2].name).to.eq('accelerationRms/z')

            // valida que os dados foram atualizados (valores diferentes entre first e second)
            expect(second.data[0].data[0].max).not.to.eq(first.data[0].data[0].max)

            // valida conteúdo esperado do segundo mock
            expect(second.data[0].data[0]).to.deep.equal({
                datetime: '2024-01-01T00:00:00Z',
                max: 111
            })
        })
    })

    cy.get('@secondMetadata').then((metadata) => {
        cy.contains(`${metadata.machine}`).should('be.visible')
        cy.contains(`${metadata.spot}`).should('be.visible')
        cy.contains(`${metadata.rpm}`).should('be.visible')
        cy.contains(`${metadata.dynamicRange}`).should('be.visible')
    })
})

