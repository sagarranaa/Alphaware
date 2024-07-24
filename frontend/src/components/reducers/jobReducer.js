import { GET_JOBS, ADD_JOB, DELETE_JOB, JOB_ERROR } from "../actions/types";

const initialState = {
  jobs: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: payload,
        loading: false,
      };
    case ADD_JOB:
      return {
        ...state,
        jobs: [payload, ...state.jobs],
        loading: false,
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((job) => job._id !== payload),
        loading: false,
      };
    case JOB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
