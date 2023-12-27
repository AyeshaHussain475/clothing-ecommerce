export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  // just remove token
  localStorage.removeItem("token");

  // removes everything related to user
  // localStorage.clear();
};

// saveUser user
