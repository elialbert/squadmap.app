const sample = {
  nodes: [
    {
      data: {
        id: "1",
        label: "Mom + Dad",
        riskFactor: 'Works at home'
      },
    },
    {
      data: {
        id: "2",
        label: "Me",
        riskFactor: 'Works at home'
      }
    },
    {
      data: {
        id: "4",
        label: "Alice + bf",
        riskFactor: 'Works in an office'
      }
    },
    {
      data: {
        id: "6",
        label: "Joey and roommate",
        riskFactor: 'Works in a hospital'
      }
    },
    {
      data: {
        id: "8",
        label: "Joey's roommate's gf",
        riskFactor: 'Works in hospitality'
      }
    },
    {
      data: {
        id: "10",
        label: "Jen",
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
        connectionType: 'Close as can be'
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