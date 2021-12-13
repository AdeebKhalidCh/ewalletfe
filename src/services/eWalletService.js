import request from "./request";

export const getAllEWallet = () => {
    return request({
      url: "/wallets",
      method: "GET",
    })
      .then((response) => response)
      .catch((error) => {
        return Promise.reject(error.response);
      });
  };

  export const addNewWallet = (data) => {
    return request({
      url: "/wallets",
      method: "POST",
      data: data,
    })
      .then((response) => response)
      .catch((error) => {
        return Promise.reject(error.response);
      });
  };

  export const updateWallet = (data) => {
    return request({
      url: "/wallets",
      method: "PUT",
      data: data,
    })
      .then((response) => response)
      .catch((error) => {
        return Promise.reject(error.response);
      });
  };

  export const deleteWallet = (id) => {
    return request({
      url: `/wallets/${id}`,
      method: "DELETE",
    })
      .then((response) => response)
      .catch((error) => {
        return Promise.reject(error.response);
      });
  };