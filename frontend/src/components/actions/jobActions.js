import axios from "axios";
import { GET_JOBS, ADD_JOB, DELETE_JOB, JOB_ERROR } from "./types";
import { URL } from "./authActions";
export const userToken = localStorage.getItem("token");
export const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + userToken,
  },
};
export const getJobs = () => async (dispatch) => {
  try {
    const res = await axios.get(`${URL}/api/jobs`, config);
    dispatch({
      type: GET_JOBS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
    });
  }
};

export const addJob = (jobData) => async (dispatch) => {
  try {
    const res = await axios.post(`${URL}/api/jobs/create`, jobData, config);
    dispatch({
      type: ADD_JOB,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
    });
  }
};

export const deleteJob = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/jobs/${id}`, config);
    dispatch({
      type: DELETE_JOB,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
    });
  }
};
