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

  waitRedirectionTo (page) {
    return this.enqueue(() => browser.wait(protractor.ExpectedConditions.urlContains(page), 12000))
  }

  waitFor (milliseconds) {
    return this.enqueue(() => browser.sleep(milliseconds))
  }

  holdOn (test) {
    test.timeout(100000000)
    this.waitFor(100000000)
    return this.currentAction
  }

  elementWithId (id, type = '*') {
    const byId = by.css(`${type}[id^='${id}']`)
    return this.waitForElement(byId)
  }

  waitForElement (selector) {
    const message = `Element ${selector} is not visible`
    const timeout = 55000
    this.enqueue(() => element.all(selector).first())
    return this.enqueue(e => browser
      .wait(protractor.ExpectedConditions.visibilityOf(e), timeout, message)
      .then(() => e))
  }

  elementWithName (name) {
    const byName = by.css(`*[name^='${name}']`)
    return this.waitForElement(byName)
  }

  elementWithTitle (title) {
    const byTitle = by.css(`*[title^='${title}']`)
    return this.waitForElement(byTitle)
  }

  elementWithClass (className) {
    const byClass = by.css(`*[class^='${className}']`)
    return this.waitForElement(byClass)
  }

  button (text) {
    const buttonText = by.buttonText(text)
    return this.waitForElement(buttonText)
  }

  submit () {
    return this.enqueue(element => element.sendKeys(protractor.Key.ENTER))
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

  onAngular () {
    return this.enqueue(() => browser.waitForAngularEnabled(true))
  }

  lines () {
    this.text()
    return this.enqueue(text => text.split('\n').filter(line => line.length > 0))
  }

  text () {
    this.enqueue(element => element.getText())
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
