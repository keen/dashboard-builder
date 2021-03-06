# Keen Dashboard Builder

<a href="https://keen.io/"><img src="https://img.shields.io/github/release/keen/dashboard-builder.svg?style=flat-square&maxAge=600" alt=""></a>
<a href="https://github.com/keen/dashboard-builder/graphs/contributors" alt="Contributors"><img src="https://img.shields.io/github/contributors/keen/dashboard-builder.svg" /></a>
<a href="https://github.com/keen/dashboard-builder/pulse" alt="Activity"><img src="https://img.shields.io/github/last-commit/keen/dashboard-builder.svg" /></a>
<a href="#" alt="License"><img src="https://img.shields.io/github/license/keen/dashboard-builder.svg" /></a>
<a href="http://slack.keen.io/"><img src="https://img.shields.io/badge/slack-keen-orange.svg?style=flat-square&maxAge=3600" alt="Slack"></a>
<a href="https://www.jsdelivr.com/package/npm/keen-dashboard-builder"><img src="https://data.jsdelivr.com/v1/package/npm/keen-dashboard-builder/badge" alt=""></a>
<a href="https://www.npmjs.com/package/keen-dashboard-builder"><img src="https://img.shields.io/npm/dm/keen-dashboard-builder.svg" alt=""></a>

## Build status

[![CircleCI](https://circleci.com/gh/keen/dashboard-builder/tree/develop.svg?style=svg)](https://circleci.com/gh/keen/dashboard-builder/tree/develop)

## Install

For npm package manager

```ssh
npm install keen-dashboard-builder --save
```
For yarn
```ssh
yarn add keen-dashboard-builder
```

## Example

```javascript
const myDashboardBuilder = new DashboardBuilder({
  container: '#app-container',
  keenAnalysis: {
    config: {
      projectId: 'YOUR_PROJECT_ID',
      masterKey: 'YOUR_MASTER_KEY',
      protocol: 'https',
      host: 'api.keen.io'
    }
  },
  keenWebHost: 'keen.io' // optional, the default is window.location.host
});
```

## React component

https://github.com/keen/react-dashboards

## npm scripts

List of useful commands that could be used by developers.

| Command               | Description                                                                       |
| --------------------- | --------------------------------------------------------------------------------- |
| `lint`                | run linter against current application codebase.                                  |
| `test`                | run unit tests against current application codebase.                              |
| `circular`            | run scripts responsible for the detection of circular dependencies between files. |
| `commit`              | run commit command line interface.                                                |
| `prettier`            | run code formatter process against current codebase.                              |

## commit

This project uses [Conventional Commits](https://www.conventionalcommits.org) to enforce common commit standards.
