const constants = {
  riskFactors: [
    'Works at home', 'Works outdoors', 'Works in an office', 'Works in hospitality', 'Works in a hospital', 'Unknown'
  ],
  connectionTypes: [
    'Unknown', 'Outside, distanced', 'Outside, but close', 'Indoors briefly / very seldom', 'Indoors and unworried', 'Close as can be'
  ],

  riskFactorClasses: {
    'Works at home': 'risk-factor-home',
    'Works outdoors': 'risk-factor-outdoors',
    'Works in an office': 'risk-factor-office',
    'Works in hospitality': 'risk-factor-hospitality',
    'Works in a hospital': 'risk-factor-hospital',
    'Unknown': 'risk-factor-unknown'
  },

  connectionTypeClasses: {
    'Unknown': 'connection-type-unknown',
    'Outside, distanced': 'connection-type-outside-distanced',
    'Outside, but close': 'connection-type-outside-close',
    'Indoors briefly / very seldom': 'connection-type-indoors-seldom',
    'Indoors and unworried': 'connection-type-indoors',
    'Close as can be': 'connection-type-close'
  },

  riskWeights: {
    'Works at home': 0.01,
    'Works outdoors': 0.05,
    'Works in an office': 0.2,
    'Works in hospitality': 0.45,
    'Works in a hospital': 0.55,
    'Unknown': 0.3
  },

  connectionWeights: {
    'Unknown': 0.4,
    'Outside, distanced': 0.1,
    'Outside, but close': 0.3,
    'Indoors briefly / very seldom': 0.4,
    'Indoors and unworried': 0.8,
    'Close as can be': 1
  },

  nodeStyles: [
    {
      selector: 'node',
      css: {
        'background-color': 'white',
        'border-width': 2,
        'text-valign': 'center',
        'text-halign': 'center',
        'height': '60px',
        'width': '60px',
        "text-background-opacity": 0,
        "text-background-color": "white",
        "label": "data(label)",
        "text-wrap": "wrap",
        "text-max-width": "50px",
        "font-size": "10px"
      }
    },
    {
      selector: '.risk-factor-home',
      css: {
        'border-color': '#4ec924'
      }
    },
    {
      selector: '.risk-factor-outdoors',
      css: {
        'border-color': '#9dc924'
      }
    },    
    {
      selector: '.risk-factor-office',
      css: {
        'border-color': '#bec924'
      }
    },
    {
      selector: '.risk-factor-hospitality',
      css: {
        'border-color': '#c95624'
      }
    },
    {
      selector: '.risk-factor-hospital',
      css: {
        'border-color': '#c92424'
      }
    },
    {
      selector: '.risk-factor-unknown',
      css: {
        'border-color': '#9e8b83'      
      }
    },
    {
      selector: 'edge',
      css: {
        'line-color': 'black',
        'width': 2
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
        'background-color': '#4ec924'
      }
    },
    {
      selector: '.exposure-risk-2',
      css: {
        'background-color': '#9dc924'
      }
    },    
    {
      selector: '.exposure-risk-3',
      css: {
        'background-color': '#bec924'
      }
    },
    {
      selector: '.exposure-risk-4',
      css: {
        'background-color': '#c95624'
      }
    },
    {
      selector: '.exposure-risk-5',
      css: {
        'background-color': '#c92424'
      }
    },
  ]
};

export default constants;