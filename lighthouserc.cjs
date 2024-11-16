module.exports = {
  ci: {
    collect: {
      staticDistDir: './build',
      numberOfRuns: 1,
      startServerCommand: 'npm run dev',
      url: ['https://localhost:3000'],
    },
    // assert: {
    //   preset: 'lighthouse:recommended',
    // },
    upload: {
      target: 'filesystem',
      outputDir: './lhci_reports',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
}
