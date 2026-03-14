Feature: Charts

    1. As a user, I want to view a screen containing a small header with machine information
    and some charts.
    2. As a user, I want to view 3 time series charts for RMS Acceleration, RMS Velocity, and
    Temperature.
    3. As a user, I want the data to be refreshed every time I access the page.
    4. As a user, when hovering over the time series, I want to see a tooltip displaying the
    data values.

    Background:
        Given I am on the charts page
    
    Scenario: Machine Information and charts are displayed correctly
        Then I should see a header with machine information
        And I should see a data of machine
        And I should see a data of spot
        And I should see a data of rpm
        And I should see a data of dynamic range
        # And I should see a data of interval
        And some charts on the page

    Scenario: Charts display correct are shown
        Then I should see a chart for Aceleração RMS 
        And I should see a chart for Temperatura
        And I should see a chart for Velocidade RMS

    Scenario: Data is refreshed when accessing the page
        When I refresh the page
        Then I should see updated data of charts

    Scenario: Tooltip displays correct data values when hovering over the time series
        When I hover over the time series charts
        Then I should see a tooltip displaying the data values