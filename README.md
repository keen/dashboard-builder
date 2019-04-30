# Keen charts react component

## Install with NPM

```ssh
npm install keen-react-charts --save
```

## Usage

Use this component to create charts from the data received from the Keen's API. Charts expect a results prop of the response from the query or a raw object. All the configuration properties could be passed in props.

## Example

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'keen-react-charts';
import KeenAnalysis from 'keen-analysis';

import 'keen-dataviz/dist/keen-dataviz.css';
import './styles/style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'funnel',
      title: 'Actions and purchases',
      labelMapping: {
        pageviews: 'Pageviews',
        banner_visibility: 'Banner visibility',
        banner_clicks: 'Banner clicks',
        signups: 'Signups',
      },
      funnel: {
        lines: false,
        percents: {
          show: true,
        },
        resultValues: false
      },
      renderOnVisible: true
    };
  }

  componentDidMount() {
    const client = new KeenAnalysis({
      projectId: 'YOUR_PROJECT_ID',
      readKey: 'YOUR_READ_KEY'
    })
      .query({
        analysis_type: 'funnel',
        steps: [
          {
            event_collection: 'pageviews',
            actor_property: 'user.uuid',
            timeframe: {
              start: '2019-03-13T00:00:00.000Z',
              end: '2019-08-14T00:00:00.000Z'
            }
          },
          {
            event_collection: 'banner_visibility',
            actor_property: 'user.uuid',
            timeframe: {
              start: '2019-03-13T00:00:00.000Z',
              end: '2019-08-14T00:00:00.000Z'
            }
          },
          {
            event_collection: 'banner_clicks',
            actor_property: 'user.uuid',
            timeframe: {
              start: '2019-03-13T00:00:00.000Z',
              end: '2019-08-14T00:00:00.000Z'
            }
          },
          {
            event_collection: 'signups',
            actor_property: 'user.uuid',
            timeframe: {
              start: '2019-03-13T00:00:00.000Z',
              end: '2019-08-14T00:00:00.000Z'
            }
          }
        ],
      })
      .then((results) => {
        this.setState({
          results,
        });
      });
  }


  render() {
    return (
      <Chart {...this.state} />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

## Configuration

Charts configurations you can check here: [keen-dataviz.js](https://github.com/keen/keen-dataviz.js/)
