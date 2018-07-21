export const gotAuth = user => dispatch => {
  dispatch({
    type: "GOT_AUTH",
    data: user
  });
};
