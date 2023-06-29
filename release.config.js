module.exports = {
  branches: [
    { name: "dev", prerelease: "rc" },
    { name: "main", prerelease: false }
  ],
  repositoryUrl: "https://github.com/your-username/your-repo",
  plugins: [
    ["@semantic-release/commit-analyzer", {
      preset: "conventionalcommits",
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
      preset: "conventionalcommits",
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
    "@semantic-release/changelog",
    ["@semantic-release/git", {
      assets: ["package.json", "CHANGELOG.md"],
      message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }]
  ]
};
