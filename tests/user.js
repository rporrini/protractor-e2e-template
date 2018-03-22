const textEqualTo = text => option => option
  .getText()
  .then(optionText => optionText === text)
const options = by.tagName('option')
const selectOptionCorrespondingTo = text => element => element
  .all(options)
  .filter(textEqualTo(text))
  .first()

export default class User {

  constructor (url) {
    this.currentAction = Promise.resolve()
    this.url = url
  }

  enqueue (action) {
    this.currentAction = this.currentAction.then(action)
    return this
  }

  visit (page) {
    this.enqueue(() => browser.get(this.url(page)))
    return this.waitRedirectionTo(page)
  }

  waitForAWhile () {
    return this.waitFor(5000)
  }

  waitFor (milliseconds) {
    return this.enqueue(() => browser.sleep(milliseconds))
  }

  waitRedirectionTo (page) {
    return this.enqueue(() => browser.wait(protractor.ExpectedConditions.urlContains(page), 12000))
  }

  waitForAction (action) {
    return this.enqueue(action)
  }

  holdOn (test) {
    test.timeout(100000000)
    this.waitFor(100000000)
    return this.currentAction
  }

  elementWithId (id, type = '*') {
    return this.enqueue(() => element.all(by.css(`${type}[id^='${id}']`)).first())
  }

  button (text) {
    return this.enqueue(() => element(by.buttonText(text)))
  }

  select (text) {
    this.enqueue(selectOptionCorrespondingTo(text))
    return this.click()
  }

  selectAll () {
    return this.enqueue(element => element.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a')))
  }

  type (text) {
    return this.enqueue(element => element.clear().then(() => element.sendKeys(text)).then(() => element))
  }

  click () {
    return this.enqueue(element => element.click())
  }

  onAPlainHtmlPage () {
    return this.enqueue(() => browser.waitForAngularEnabled(false))
  }

  lines () {
    this.text()
    return this.enqueue(text => text.split('\n').filter(line => line.length > 0))
  }

  onASinglePageApplication () {
    this.enqueue(() => browser.waitForAngularEnabled(true))
    return this.currentAction
  }

  text () {
    this.enqueue(element => element.getText())
    return this.currentAction
  }

  verify (assertion) {
    this.enqueue(assertion)
    return this.currentAction
  }

  title () {
    this.enqueue(element => browser.getTitle())
    return this.currentAction
  }

  visible () {
    this.enqueue(element => element.isDisplayed())
    return this.currentAction
  }
}
