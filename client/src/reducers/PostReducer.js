const postReducer = (
  state = {
    posts: null,
    loading: false,
    error: false,
    uploading: false,
  },
  action
) => {
  switch (action.type) {
    // belongs to PostShare.jsx
    case "UPLOAD_START":
      return { ...state, error: false, uploading: true };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };

    // belongs to Posts.jsx
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };
    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };

    // Add a comment
    case "COMMENT_START":
      return { ...state, uploading: true, error: false };
    case "COMMENT_UPLOAD":
      return {
        ...state,
        posts: [
          ...state.posts.map((post) => {
            if (post._id === action.data._id)
              post.comments = [...action.data.comments];
            return post;
          }),
        ],
        uploading: false,
        error: false,
      };

    case "COMMENT_FAIL":
      return { ...state, uploading: false, error: true };

    // Delete a comment
    case "COMMENT_DELETE_START":
      return { ...state, uploading: true, error: false };
    case "COMMENT_DELETE_SUCCESS":
      return {
        ...state,
        posts: [
          ...state.posts.map((post) => {
            if (post._id === action.data.postId) {
              post.comments.filter((c) => c._id !== action.data._id);
              console.log(post);
            }

            return post;
          }),
        ],
        uploading: false,
        error: false,
      };

    case "COMMENT_DELETE_FAIL":
      return { ...state, uploading: false, error: true };

    // belong to update post

    case "POST_START":
      return { ...state, uploading: true, error: false };
    case "POST_UPLOAD":
      return {
        ...state,
        posts: [
          ...state.posts.map((post) => {
            if (post._id === action.data._id) {
              post.desc = action.data.desc;
              post.image = action.data.image;
            }

            return post;
          }),
        ],
        uploading: false,
        error: false,
      };

    case "POST_FAIL":
      return { ...state, uploading: false, error: true };

    case "POST_DELETE_START":
      return { ...state, uploading: true, error: false };

    case "POST_DELETE_SUCCESS":
      return {
        ...state,
        posts: [...state.posts.filter((post) => post._id !== action.data._id)],
        uploading: false,
        error: false,
      };

    case "POST_DELETE_FAIL":
      return { ...state, uploading: false, error: true };

    default:
      return state;
  }
};

export default postReducer;
