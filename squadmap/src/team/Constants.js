import EdgeColors from './EdgeColors.js';
import Colors from './Colors.js';

const constants = {
  riskFactors: [
    'Works at home',
    'Works outdoors',
    'Works in an office',
    'Works in hospitality',
    'Works in a hospital',
    'Unknown'
  ],
  connectionTypes: [
    'Unknown',
    'Outside, distanced',
    'Outside, but close',
    'Indoors briefly / seldom',
    'Indoors and unworried',
    'Close as can be'
  ],

  activities: [
    'Hides at home',
    'Outdoors, shops for groceries, but careful',
    'Outdoors and sort of keeps distance',
    'Goes to restaurants',
    'Goes to bars + restaurants',
    'Does not care about risk'
  ],

  activityModifier: {
    'Hides at home': 0,
    'Outdoors, shops for groceries, but careful': 0.004,
    'Outdoors and sort of keeps distance': 0.1,
    'Goes to restaurants': 0.25,
    'Goes to bars + restaurants': 0.4,
    'Does not care about risk': 0.6
  },

  riskFactorClasses: {
    'Works at home': 'risk-factor-home',
    'Works outdoors': 'risk-factor-outdoors',
    'Works in an office': 'risk-factor-office',
    'Works in hospitality': 'risk-factor-hospitality',
    'Works in a hospital': 'risk-factor-hospital',
    'Unknown': 'risk-factor-unknown'
  },

  riskFactorClassesShort: {
    'Works at home': 'home',
    'Works outdoors': 'outdoors',
    'Works in an office': 'office',
    'Works in hospitality': 'hospitality',
    'Works in a hospital': 'hospital',
    'Unknown': 'unknown'
  },

  connectionTypeClasses: {
    'Unknown': 'connection-type-unknown',
    'Outside, distanced': 'connection-type-outside-distanced',
    'Outside, but close': 'connection-type-outside-close',
    'Indoors briefly / seldom': 'connection-type-indoors-seldom',
    'Indoors and unworried': 'connection-type-indoors',
    'Close as can be': 'connection-type-close'
  },

  riskWeights: {
    'Works at home': 0.01,
    'Works outdoors': 0.07,
    'Works in an office': 0.2,
    'Works in hospitality': 0.38,
    'Works in a hospital': 0.46,
    'Unknown': 0.3
  },

  connectionWeights: {
    'Unknown': 0.4,
    'Outside, distanced': 0.03,
    'Outside, but close': 0.16,
    'Indoors briefly / seldom': 0.24,
    'Indoors and unworried': 0.8,
    'Close as can be': 0.97
  },

  nodeStyles: [
    {
      selector: 'node',
      css: {
        'background-color': 'white',
        'border-width': 1.5,
        'border-color': 'black',
        'text-valign': 'center',
        'text-halign': 'center',
        'height': '60px',
        'width': '60px',
        "text-background-opacity": 0,
        "text-background-color": "white",
        "label": "data(label)",
        "text-wrap": "wrap",
        "text-max-width": "50px",
        "font-size": "10px",
        "font-family": 'Helvetica'
      }
    },
    {
      selector: 'node.node-number-label',
      style: {
        "label": "data(probResult)"
      }
    },
    {
      selector: 'edge',
      css: {
        'width': 6,
        'line-color':'black'
      }
    },
    {
      selector: '.connection-type-unknown',
      css: {
        'line-style': 'dotted'
      }
    },
    {
      selector: '.connection-type-outside-distanced',
      css: {
        'line-style': 'dashed',
        'line-dash-pattern': [2, 9],
      }
    },
    {
      selector: '.connection-type-outside-close',
      css: {
        'line-style': 'dashed',
        'line-dash-pattern': [3, 6],
      }
    },
    {
      selector: '.connection-type-indoors-seldom',
      css: {
        'line-style': 'dashed',
        'line-dash-pattern': [3, 3],
      }
    },
    {
      selector: '.connection-type-indoors',
      css: {
        'line-style': 'dashed',
        'line-dash-pattern': [10, 1],
      }
    },
    {
      selector: '.connection-type-close',
      css: {
        'line-style': 'solid'
      }
    },
    {
      selector: '.exposure-risk-1',
      css: {
        'background-color': Colors.c1
      }
    },
    {
      selector: '.exposure-risk-2',
      css: {
        'background-color': Colors.c2
      }
    },
    {
      selector: '.exposure-risk-3',
      css: {
        'background-color': Colors.c3
      }
    },
    {
      selector: '.exposure-risk-4',
      css: {
        'background-color': Colors.c4
      }
    },
    {
      selector: '.exposure-risk-5',
      css: {
        'background-color': Colors.c5
      }
    },
  ]
};

constants.nodeStyles = constants.nodeStyles.concat(EdgeColors);

export default constants;