import User from './user'

import chai from "chai";
import chaiAsPromised from "chai-as-promised";

before(() => {
  chai.use(chaiAsPromised);
  chai.should();
});

describe('google home page', () => {

  it('should display the name', () => {

    return new User(() => 'http://google.com')
      .onAPlainHtmlPage()
      .visit('/')
      .title().should.eventually.be.equal('Google')
  })

  it('should support searches by the users', function() {
    return new User(() => 'http://google.com')
      .onAPlainHtmlPage()
      .visit('/')
      .elementWithName('q')
      .type('gattini')
      .submit()
      .elementWithId('resultStats')
      .text().should.eventually.match(/risultati/)
  })
})
