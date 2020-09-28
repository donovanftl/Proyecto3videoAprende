import { message } from 'antd';
import { basePath, apiVersion } from './config';

export function signUpApi() {
  const url = `${basePath}/S{apiVersion}/sign-up`;
  const params = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.user) {
        return {
         ok: false,
         message: result.message;
        }
      }
      return {
       ok: false,
       message: result.message;
      }
    })
    .catch(err => {
      return err.message;
    });
}
