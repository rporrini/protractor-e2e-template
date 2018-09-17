require('babel-core/register')

exports.config = {
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--incognito', '--user-agent=e2e-tests'].concat(process.env.HEADLESS ? ['--headless'] : []),
    },
  },
  directConnect: true,
  framework: 'mocha',
  mochaOpts: {
    reporter: 'mocha-jenkins-reporter',
    reporterOptions: {
      "junit_report_path": "reports/suite.xml",
    },
    timeout: 60000,
  },
  specs: [
    'tests/*.test.js',
  ],
}
