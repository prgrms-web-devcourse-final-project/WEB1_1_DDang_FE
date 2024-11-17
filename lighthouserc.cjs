module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview',
      url: ['http://localhost:4173'],
      numberOfRuns: 5,
      startServerReadyPattern: 'Local',
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci_reports',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'csp-xss': ['warn', {}],
      },
    },
  },
}
