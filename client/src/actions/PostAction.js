import * as PostApi from "../api/PostRequest";

export const getTimeLine = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostApi.getTimeLine(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "RETREIVING_FAIL" });
    console.log(error);
  }
};

export const addComment = (id, commentData) => async (dispatch) => {
  dispatch({ type: "COMMENT_START" });
  try {
    const { data } = await PostApi.addComment(id, commentData);
    dispatch({ type: "COMMENT_UPLOAD", data: data });
  } catch (error) {
    dispatch({ type: "COMMENT_FAIL" });
    console.log(error);
  }
};

export const deleteComment = (id) => async (dispatch) => {
  dispatch({ type: "COMMENT_DELETE_START" });
  try {
    const { data } = await PostApi.deleteComment(id);
    dispatch({ type: "COMMENT_DELETE_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "COMMENT_DELETE_FAIL" });
    console.log(error);
  }
};

export const updatePost = (id, formData) => async (dispatch) => {
  dispatch({ type: "POST_START" });
  try {
    const { data } = await PostApi.updatePost(id, formData);
    dispatch({ type: "POST_UPLOAD", data: data });
  } catch (error) {
    dispatch({ type: "POST_FAIL" });
    console.log(error);
  }
};

export const deletePost = (id, postData) => async (dispatch) => {
  dispatch({ type: "POST_DELETE_START" });
  try {
    const post = await PostApi.deletePost(id, postData);
    dispatch({ type: "POST_DELETE_SUCCESS", data: post.data });
  } catch (error) {
    dispatch({ type: "POST_DELETE_FAIL" });
    console.log(error);
  }
};
