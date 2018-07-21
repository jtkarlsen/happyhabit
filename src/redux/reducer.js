export default (state = { activities: [] }, action) => {
  switch (action.type) {
    case "GOT_AUTH":
      return {
        ...state,
        user: action.data || null,
        auth_loaded: true
      };
    case "GOT_ACTIVITIES":
      return {
        ...state,
        activities: action.data || []
      };
    default:
      return state;
  }
};
