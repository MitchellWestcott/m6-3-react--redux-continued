export const requestAccessToken = () => ({
  type: "REQUEST_ACCESS_TOKEN",
});

export const receiveAccessToken = (token) => ({
  type: "RECEIVE_ACCESS_TOKEN",
  token,
});

export const receiveAccessTokenError = () => ({
  type: "RECEIVE_ACCESS_TOKEN_ERROR",
});

export const requestDataFetch = () => ({
  type: "REQUEST_DATA_FETCH",
});

export const receiveDataFetch = (data) => ({
  type: "RECEIVE_DATA_FETCH",
  data,
});

export const receiveDataFetchError = () => ({
  type: "RECEIVE_DATA_FETCH_ERROR",
});
