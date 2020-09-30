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
         message: result.message
        }
      }
      return {
       ok: false,
       message: result.message
      }
    })
    .catch(err => {
      return err.message;
    });
}

export function signInApi(data){
  const url = `${basePath}/${apiVersion}/signin`
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }
  return fetch(url, params)
  .then( response => {
    return response.json()
  })
  .then(result=>{
    return result
  })
  .catch(err => {
    return err.message
  })
}
export function getUsersApi(token){
  const url = `${basePath}/${apiVersion}/users`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}
export function getUsersActiveApi(token, status){
  const url = `${basePath}/${apiVersion}/users-active?active=${status}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}