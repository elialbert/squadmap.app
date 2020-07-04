const sample = {
  nodes: [
    {
      data: {
        id: "1",
        label: "Mom + Dad"
      },
    },
    {
      data: {
        id: "2",
        label: "Me"
      }
    },
    {
      data: {
        id: "4",
        label: "Alice + bf"
      }
    },
    {
      data: {
        id: "6",
        label: "Joey and roommate"
      }
    },
    {
      data: {
        id: "8",
        label: "Joey's roommate's gf"
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
    }
  ]
}

export { sample }