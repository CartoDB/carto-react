import detectTouchscreen from 'src/ui/utils/detectTouchScreen';

describe('detect touch screen', () => {
  describe('supported', () => {
    beforeEach(() => {
      window.PointerEvent = true;
      navigator.maxTouchPoints = 0;
    });

    afterAll(() => {
      window.PointerEvent = false;
      delete navigator.maxTouchPoints;
    });

    test('maxTouchPoints is less than or equal to 0', () => {
      const IS_TOUCH_SCREEN = detectTouchscreen();
      expect(IS_TOUCH_SCREEN).toBe(false);
    });

    test('maxTouchPoints is greather than 0', () => {
      navigator.maxTouchPoints = 1;
      const IS_TOUCH_SCREEN = detectTouchscreen();
      expect(IS_TOUCH_SCREEN).toBe(true);
    });
  });

  describe('not supported', () => {
    beforeAll(() => {
      window.matchMedia = () => ({ matches: true });
    });

    test('matchMedia matches', () => {
      const IS_TOUCH_SCREEN = detectTouchscreen();
      expect(IS_TOUCH_SCREEN).toBe(true);
      window.matchMedia = () => ({ matches: false });
    });

    describe('matchMedia does not matches', () => {
      beforeAll(() => {
        window.matchMedia = () => ({ matches: false });
      });

      test('window.TouchEvent in truthy', () => {
        window.TouchEvent = true;
        const IS_TOUCH_SCREEN = detectTouchscreen();
        expect(IS_TOUCH_SCREEN).toBe(true);
      });

      test('ontouchstart is in window', () => {
        window.ontouchstart = true;
        const IS_TOUCH_SCREEN = detectTouchscreen();
        expect(IS_TOUCH_SCREEN).toBe(true);
      });
    });
  });
});
