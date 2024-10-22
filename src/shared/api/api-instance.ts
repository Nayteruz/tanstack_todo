const BASE_URL = "http://localhost:8000";

class ApiError extends Error {
  constructor(public response: Response) {
    super("ApiError" + response.status);
  }
}

export const jsonApiInstance = async <T>(
  url: string,
  init?: RequestInit & { json?: unknown }
) => {
  let headers: HeadersInit = init?.headers || {};

  if (init?.json) {
    headers = { "Content-Type": "application/json", ...headers };

    init.body = JSON.stringify(init.json);
  }

  // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  // await delay(5000);

  const result = await fetch(`${BASE_URL}${url}`, {
    ...init,
    headers
  });

  if (!result.ok) {
    throw new ApiError(result);
  }

  const data = (await result.json()) as Promise<T>;

  return data;
};
