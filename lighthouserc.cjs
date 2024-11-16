// lighthouserc.cjs
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run dev',
      url: ['https://localhost:3000'],
      numberOfRuns: 1,
      startServerReadyPattern: 'ready in',
      settings: {
        chromeFlags: ['--ignore-certificate-errors', '--no-sandbox', '--disable-gpu', '--headless'],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'csp-xss': 'off',
        'unused-javascript': 'off',
        'uses-http2': 'off',
      },
    },
  },
}
