const userReducer = (
  state = {
    users: null,
    getuser: null,
    loading: false,
    error: false,
  },
  action
) => {
  switch (action.type) {
    //gets all users
    case "USERS_START":
      return { ...state, loading: true, error: false };
    case "USERS_SUCCESS":
      return { ...state, users: action.data, loading: false, error: false };
    case "USERS_FAIL":
      return { ...state, loading: false, error: true };

    //approvae users by admin
    case "APPROVAL_START":
      return { ...state, loading: true, error: false };
    case "APPROVAL_SUCCESS":
      return { ...state, users: action.data, loading: false, error: false };
    case "APPROVAL_FAIL":
      return { ...state, loading: false, error: true };

    // gets one user
    case "USER_START":
      return { ...state, loading: true, error: false };
    case "USER_SUCCESS":
      return { ...state, getuser: action.data, loading: false, error: false };
    case "USER_FAIL":
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export default userReducer;
