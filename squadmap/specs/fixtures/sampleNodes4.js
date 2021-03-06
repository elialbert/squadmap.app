const sample = {
  nodes: [
    {
      data: {
        id: "1",
        activity: 'Does not care about risk',
        label: "Mom + Dad",
        riskFactor: 'Works at home'
      },
    },
    {
      data: {
        id: "2",
        label: "Me",
        activity: 'Hides at home',
        riskFactor: 'Works at home'
      }
    },
    {
      data: {
        id: "4",
        activity: 'Does not care about risk',
        label: "Alice + bf",
        riskFactor: 'Works at home'
      }
    },
    {
      data: {
        id: "6",
        label: "Joey and roommate",
        riskFactor: 'Works at home'
      }
    },
    {
      data: {
        id: "8",
        label: "Joey's roommate's gf",
        riskFactor: 'Works at home'
      }
    },
    {
      data: {
        id: "10",
        label: "Jen",
        activity: 'Does not care about risk',
        riskFactor: 'Works outdoors'
      }
    },
  ],
  edges: [
    {
      data: {
        source: "2",
        target: "1",
        connectionType: 'Indoors and unworried'
      }
    },
    {
      data: {
        source: "4",
        target: "1",
        connectionType: 'Indoors and unworried'
      }
    },
    {
      data: {
        source: "4",
        target: "2",
        connectionType: 'Indoors and unworried'
      }
    },
    {
      data: {
        source: "2",
        target: "10",
        connectionType: 'Close as can be'
      }
    },
    {
      data: {
        source: "2",
        target: "6",
        connectionType: 'Outside, but close'
      }
    },
    {
      data: {
        source: "6",
        target: "8",
        connectionType: 'Outside, distanced'
      }
    }
  ]
}

export { sample }