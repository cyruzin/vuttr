import { API_ENDPOINT } from '../config/settings';

export default async function httpRequest(
  url: string,
  {
    method,
    body,
    headers,
  }: {
    method: string;
    body?: any;
    headers?: any;
  }
): Promise<any> {
  try {
    return new Promise((resolve, reject) => {
      fetch(API_ENDPOINT + url, {
        method,
        body: JSON.stringify(body),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...headers,
        },
      })
        .then(parseJSON)
        .then((response) => {
          if (!response.ok) return reject(response.json);
          return resolve(response.json);
        })
        .catch((error) => reject(error));
    });
  } catch (error) {
    return error.message;
  }
}

const parseJSON = (response: Response): Promise<any> =>
  new Promise((resolve) =>
    response.json().then((json) =>
      resolve({
        status: response.status,
        ok: response.ok,
        json,
      })
    )
  );
