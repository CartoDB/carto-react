import { processFormatterRes } from '../../../src/widgets/utils/formatterUtils';

describe('Formatter utils', () => {
  describe('processFormatterRes', () => {
    test('if formatterRes is an object', () => {
      const formatterRes = { prefix: '$', value: 5 };
      expect(processFormatterRes(formatterRes)).toBe('$5');
      const formatterRes2 = { suffix: '$', value: 5 };
      expect(processFormatterRes(formatterRes2)).toBe('5$');
    });
    test("if formatterRes isn't an object", () => {
      const formatterRes = '$5';
      expect(processFormatterRes(formatterRes)).toBe('$5');
    });
  });
});
