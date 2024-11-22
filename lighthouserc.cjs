module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview',
      url: [
        'http://localhost:4173',
        // 'http://localhost:4173/log',
        // 'http://localhost:4173/walk',
        // 'http://localhost:4173/mypage',
        // 'http://localhost:4173/login',
      ],
      numberOfRuns: 1,
      startServerReadyPattern: 'Local',
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci_reports',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
  },
}
