import { getAccessToken, getRefreshAccessToken } from '../api/api';

export default function getToken({ email, password }) {
  getAccessToken({ email, password }).then((response) => {
    localStorage.setItem('accessToken', response.access);
    localStorage.setItem('accessRefreshToken', response.refresh);
  });
}

export function refreshAccessToken() {
  getRefreshAccessToken(localStorage.getItem('accessRefreshToken')).then(
    (responseToken) => {
      localStorage.setItem('newRefreshToken', responseToken);
    },
  );
}
