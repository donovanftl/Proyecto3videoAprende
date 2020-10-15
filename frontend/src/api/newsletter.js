import { basePath, apiVersion } from './config';

export function suscribeNewsletterApi(email) {
  const url = `${basePath}/${apiVersion}/suscribe-newsletter/${email.toLowerCase()}`;
  const params = {
    method: 'POST',
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((resuilt) => {
      return resuilt;
    })
    .catch((err) => {
      return err;
    });
}
