import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import ChartsPage from '../../pages/ChartsPage'

Given('I am on the charts page', () => {
  ChartsPage.mockDataRequests()
  ChartsPage.visit()
  ChartsPage.waitInitialLoad()
})