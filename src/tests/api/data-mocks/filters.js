export const filters = {
  column1: {
    in: {
      owner: 'widgetId1',
      values: ['a', 'b', 'c']
    }
  },
  column2: {
    between: {
      owner: 'widgetId2',
      values: [[1, 2, 3]]
    }
  }
};
