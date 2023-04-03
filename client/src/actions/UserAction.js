import * as UserApi from "../api/UserRequest";

export const getUsers = () => async (dispatch) => {
  dispatch({ type: "USERS_START" });

  try {
    const { data } = await UserApi.getAllUsers();
    dispatch({ type: "USERS_SUCCESS", data: data });
  } catch (error) {
    console.log({ message: error.message });
    dispatch({ type: "USERS_FAIL" });
  }
};

export const approveUsers = (users) => async (dispatch) => {
  dispatch({ type: "APPROVAL_START" });
  try {
    const { data } = await UserApi.approveUsers(users);
    dispatch({ type: "APPROVAL_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "APPROVAL_FAIL" });
    console.log("approval error");
  }
};

export const removeUsers = (users) => async (dispatch) => {
  dispatch({ type: "APPROVAL_START" });
  try {
    const { data } = await UserApi.removeUsers(users);
    dispatch({ type: "APPROVAL_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "APPROVAL_FAIL" });
  }
};

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await UserApi.updateUser(id, formData);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: "FOLLOW_USER", data: id });
  UserApi.followUser(id, data);
};

export const unfollowUser = (id, data) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_USER", data: id });
  UserApi.unfollowUser(id, data);
};
export const getUser = (id) => async (dispatch) => {
  dispatch({ type: "USER_START" });

  try {
    const { data } = await UserApi.getUser(id);
    dispatch({ type: "USER_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "USER_FAIL" });
  }
};

export const updateAdmin = (id, formData) => async (dispatch) => {
  dispatch({ type: "ADMIN_START" });

  try {
    const { data } = await UserApi.updateAdmin(id, formData);
    dispatch({ type: "ADMIN_SUCCESS", data: data });
  } catch (error) {
    console.log({ message: error.message });
    dispatch({ type: "ADMIN_FAIL" });
  }
};
