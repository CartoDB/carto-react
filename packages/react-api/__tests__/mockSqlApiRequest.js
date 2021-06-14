const _global = typeof global !== 'undefined' ? global : window;

export function mockSqlApiRequest({
  response,
  responseIsOk = true,
  status = 200,
  query,
  credentials
}) {
  _global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(response),
      ok: responseIsOk,
      status
    })
  );

  _global.Request = jest.fn(
    () =>
      `https://public.carto.com/api/v2/sql?api_key=${credentials.apiKey}&client=${credentials.username}&q=${query}`
  );
}

export function mockClear() {
  fetch.mockClear();
  Request.mockClear();
}
