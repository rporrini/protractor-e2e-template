require('babel-core/register');

exports.config = {
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--incognito', '--user-agent=acceptance_tests']
        }
    },
    directConnect: true,
    framework: 'mocha',
    mochaOpts: {
        reporter: 'spec',
        timeout: 60000
    },
    specs: [
        'tests/*.test.js'
    ]
};
