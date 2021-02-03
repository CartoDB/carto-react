const _global = typeof global !== 'undefined' ? global : window;

export function mockSqlApiRequest({ response, sql, credentials }) {
  _global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(response),
      ok: true
    })
  );

  _global.Request = jest.fn(
    () =>
      `https://public.carto.com/api/v2/sql?api_key=${credentials.apiKey}&client=${credentials.username}&q=${sql}`
  );
}

export function mockClear() {
  fetch.mockClear();
  Request.mockClear();
}
