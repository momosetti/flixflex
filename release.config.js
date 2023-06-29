module.exports = {
  branches: [
    { name: "dev", prerelease: "rc" },
    { name: "main", prerelease: false }
  ],
  repositoryUrl: "https://github.com/momosetti/flixflex.git",
  plugins: [
    ["@semantic-release/commit-analyzer", {
      preset: "angular",
      releaseRules: [
        { type: "feat", release: "minor" },
        { type: "fix", release: "patch" },
        { type: "chore", release: "patch" },
        { type: "docs", release: "patch" },
        { type: "style", release: "patch" },
        { type: "refactor", release: "patch" },
        { type: "test", release: "patch" }
      ],
      parserOpts: {
        noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"]
      }
    }],
    ["@semantic-release/release-notes-generator", {
      preset: "angular",
      writerOpts: {
        commitsSort: ["subject", "scope"],
        groupBy: "type",
        transform: {
          feat: "✨ Features",
          fix: "🐛 Bug Fixes",
          chore: "🔧 Chore",
          docs: "📚 Documentation",
          style: "💅 Styles",
          refactor: "🔨 Refactor",
          test: "🔬 Tests",
          "*": "Miscellaneous"
        }
      }
    }],
    ["@semantic-release/git", {
      assets: ["package.json", "CHANGELOG.md"],
      message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }]
  ]
};
