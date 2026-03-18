export const elements = {
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