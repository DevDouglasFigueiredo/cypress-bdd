class ChartsPage {

    elements = {
        span: {
            dataMachine: 'span.MuiTypography-caption',
            regexMachine: /^Máquina\s+\d+$/,
            regexSpot: /^Ponto\s+\d+$/,
            regexRpm: /^\d+$/,
            regexDynamicRange: /^\d+g$/,
            regexInterval: /^(\d+)\s*min$/i
        },
        titleTag: 'h6',
        subtitle: 'Análise de dados',
        title: {
            temperature: 'Temperatura',
            velocity: 'Velocidade RMS',
            acceleration: 'Aceleração RMS'
        },
        chartGroup: '.highcharts-series-group',
        tooltip: '.highcharts-tooltip'
    }

    firstMock = {
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

    secondMock = {
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

    mockDataRequests() {
        let call = 0

        cy.intercept('GET', '**/data.json', (req) => {
            call++
            if (call === 1) req.reply(this.firstMock)
            else req.reply(this.secondMock)
        }).as('getData')

        cy.intercept('GET', '**/metadata.json').as('getMetadata')
    }

    visit() {
        cy.visit('https://frontend-test-for-qa.vercel.app/')
    }

    refreshPage() {
        cy.reload()

        cy.wait('@getData').then((interception) => {
            cy.wrap(interception.response.body).as('secondData')
        })

        cy.wait('@getMetadata').then((interception) => {
            cy.wrap(interception.response.body).as('secondMetadata')
        })
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
        cy.get(this.elements.chartGroup)
            .first().find('.highcharts-series-0')
            .first()
            .click()
            .realHover();
    }

    validateTooltipContent(content) {
        cy.get(this.elements.tooltip)
            .should('be.visible')
            .should('contain.text', content)
    }
}

export default new ChartsPage;