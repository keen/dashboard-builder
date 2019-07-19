# Keen Dashboard Builder

<a href="https://keen.io/"><img src="https://img.shields.io/github/release/keen/dashboard-builder.svg?style=flat-square&maxAge=600" alt=""></a>
<a href="https://github.com/keen/dashboard-builder/graphs/contributors" alt="Contributors"><img src="https://img.shields.io/github/contributors/keen/dashboard-builder.svg" /></a>
<a href="https://github.com/keen/dashboard-builder/pulse" alt="Activity"><img src="https://img.shields.io/github/last-commit/keen/dashboard-builder.svg" /></a>
<a href="#" alt="License"><img src="https://img.shields.io/github/license/keen/dashboard-builder.svg" /></a>
<a href="http://slack.keen.io/"><img src="https://img.shields.io/badge/slack-keen-orange.svg?style=flat-square&maxAge=3600" alt="Slack"></a>
<a href="https://www.jsdelivr.com/package/npm/keen-dashboard-builder"><img src="https://data.jsdelivr.com/v1/package/npm/keen-dashboard-builder/badge" alt=""></a>
<a href="https://www.npmjs.com/package/keen-dashboard-builder"><img src="https://img.shields.io/npm/dm/keen-dashboard-builder.svg" alt=""></a>

## Install

```ssh
npm install keen-dashboard-builder --save
```

## Live Demo
https://keen.github.io/dashboard-builder/

## Example

```javascript
      const myDashboardBuilder = new DashboardBuilder({
        container: "#app-container",
        keenAnalysis: {
          config: {
            projectId: 'YOUR_PROJECT_ID',
            masterKey: 'YOUR_MASTER_KEY',
            protocol: 'https',
            host: 'api.keen.io'
          }
        }
      });
```
