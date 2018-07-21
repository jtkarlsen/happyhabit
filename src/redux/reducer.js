export default (state = {}, action) => {
  switch (action.type) {
    case "GOT_AUTH":
      return {
        ...state,
        user: action.data || null,
        auth_loaded: true
      };
    default:
      return state;
  }
};
