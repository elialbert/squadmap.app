const elements = {
  nodes: [
    {
      data: {
        id: "1",
        label: "Eli",
      },
    },
    {
      data: {
        id: "2",
        label: "Bob"
      }
    },
    {
      data: {
        id: "4",
        label: "Alice"
      }
    },
    {
      data: {
        id: "6",
        label: "Marcus Long Name"
      }
    },
    {
      data: {
        id: "8",
        label: "Sara"
      }
    },
    {
      data: {
        id: "10",
        label: "Jen"
      }
    },
  ],
  edges: [
    {
      data: {
        source: "2",
        target: "1"
      }
    },
    {
      data: {
        source: "4",
        target: "2"
      }
    },
    {
      data: {
        source: "2",
        target: "10"
      }
    },
    {
      data: {
        source: "2",
        target: "6"
      }
    },
    {
      data: {
        source: "6",
        target: "8"
      }
    },
    {
      data: {
        source: "8",
        target: "10"
      }
    },
  ]
}

export { elements }