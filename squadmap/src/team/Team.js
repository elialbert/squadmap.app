const sample = {
  nodes: [
    {
      data: {
        id: "1",
        label: "Tom",
        activity: 'Always uses protection, including oral',
        riskFactor: 'Never sees anyone new'
      },
    },
    {
      data: {
        id: "2",
        label: "Mark",
        activity: 'Always uses protection, including oral',
        riskFactor: 'Very occasionally'
      }
    },
    {
      data: {
        id: "4",
        label: "Alice",
        activity: 'Always uses protection, but not for oral',
        riskFactor: 'Very occasionally'
      }
    },
    {
      data: {
        id: "6",
        label: "Margo",
        riskFactor: 'Often',
        activity: 'Always uses protection, including oral'
      }
    },
    {
      data: {
        id: "8",
        activity: 'Mostly uses protection',
        label: "Joey",
        riskFactor: 'Constantly'
      }
    },
    {
      data: {
        id: "10",
        label: "Jen",
        activity: 'Always uses protection, but not for oral',
        riskFactor: 'Sometimes'
      }
    },
  ],
  edges: [
    {
      data: {
        source: "2",
        target: "1",
        connectionType: 'Fluid-bound'
      }
    },
    {
      data: {
        source: "4",
        target: "1",
        connectionType: 'Fluid-bound'
      }
    },
    {
      data: {
        source: "4",
        target: "2",
        connectionType: 'Sometimes uses protection'
      }
    },
    {
      data: {
        source: "2",
        target: "10",
        connectionType: 'Always uses protection, but not for oral'
      }
    },
    {
      data: {
        source: "2",
        target: "6",
        connectionType: 'Always uses protection, but not for oral'
      }
    },
    {
      data: {
        source: "6",
        target: "8",
        connectionType: 'Always uses protection, including oral'
      }
    }
  ]
}

const sample2 = {
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
        activity: 'Outdoors, shops for groceries, but careful',
        riskFactor: 'Works outdoors'
      }
    },
    {
      data: {
        id: "6",
        label: "Joey and roommate",
        riskFactor: 'Works in hospitality'
      }
    },
    {
      data: {
        id: "8",
        activity: 'Does not care about risk',
        label: "Joey's roommate's gf",
        riskFactor: 'Works in a hospital'
      }
    },
    {
      data: {
        id: "10",
        label: "Jen",
        activity: 'Outdoors, shops for groceries, but careful',
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