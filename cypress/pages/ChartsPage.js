import { elements } from '../fixtures/elements'

class ChartsPage {

    mockDataRequests() {
        cy.fixture('acceleration').then((mock) => {
            cy.intercept('GET', '**/data.json', mock.firstmock).as('getData');
        });

        cy.intercept('GET', '**/metadata.json').as('getMetadata');
    }

    visit() {
        cy.visit('/')
    }

    refreshPage() {
        cy.fixture('acceleration').then((mock) => {
            cy.intercept('GET', '**/data.json', mock.secondMock).as('getData');
        });
        cy.reload();

        cy.wait('@getData').then((interception) => {
            cy.wrap(interception.response.body).as('secondData');
        });

        cy.wait('@getMetadata').then((interception) => {
            cy.wrap(interception.response.body).as('secondMetadata');
        });
    }

    waitInitialLoad() {
        cy.wait('@getData').then((interception) => {
            cy.wrap(interception.response.body).as('firstData')
        })

        cy.wait('@getMetadata').then((interception) => {
            cy.wrap(interception.response.body).as('firstMetadata')
        })
    }

    validadeUpdateChartData() {
        cy.get('@firstData').then((first) => {
            cy.get('@secondData').then((second) => {
                const series = second.data
                expect(series.length).to.eq(3)

                expect(series[0].data.length).to.eq(2)
                expect(series[0].name).to.eq('accelerationRms/x')
                expect(series[1].name).to.eq('accelerationRms/y')
                expect(series[2].name).to.eq('accelerationRms/z')

                expect(second.data[0].data[0].max).not.to.eq(first.data[0].data[0].max)

                expect(second.data[0].data[0]).to.deep.equal({
                    datetime: '2024-01-01T00:00:00Z',
                    max: 111
                })
            })
        })
    }

    validateMetadata() {
        cy.get('@secondMetadata').then((metadata) => {
            cy.contains(`${metadata.machine}`).should('be.visible')
            cy.contains(`${metadata.spot}`).should('be.visible')
            cy.contains(`${metadata.rpm}`).should('be.visible')
            cy.contains(`${metadata.dynamicRange}`).should('be.visible')
        })
    }

    hoverOverChart() {
        cy.get(elements.chartGroup)
            .first().find('.highcharts-series-0')
            .first()
            .click({force: true})
            .realHover();
    }

    validateTooltipContent(content) {
        cy.get(elements.tooltip)
            .should('be.visible')
            .should('contain.text', content)
    }
}

export default new ChartsPage;