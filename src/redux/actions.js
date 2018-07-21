export const gotAuth = user => dispatch => {
  dispatch({
    type: "GOT_AUTH",
    data: user
  });
};

export const gotActivities = activities => dispatch => {
  dispatch({
    type: "GOT_ACTIVITIES",
    data: activities
  });
};
