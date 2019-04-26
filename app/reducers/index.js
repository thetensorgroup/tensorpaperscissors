import axios from "axios";

const GET_DATA = "GET_DATA";
const POST_ROUNDS = "POST_ROUNDS";

export const getData = data => {
  console.log("getdata running");
  return { type: "GET_DATA", data: data };
};

export const postRounds = data => {
  return { type: "POST_ROUNDS", data: data };
};

export const fetchDataThunk = () => {
  console.log("fetchdata running");
  return dispatch => {
    axios
      .get("/api/dataset")
      .then(res => res.data)
      .then(data => {
        dispatch({ type: "GET_DATA", data: data });
      })
      .catch(err => console.error("failed to get dataset", err));
  };
};

export const postRoundsThunk = newRounds => {
  return async dispatch => {
    console.log(newRounds, "THUNK HERE");
    for (let i = 0; i < newRounds.cpu.length; i++) {
      let newObj = {
        cpuThrow: newRounds.cpu[i],
        userThrow: newRounds.user[i],
        cpuWinStatus: newRounds.wl[i]
      };
      const { data } = await axios.post("/api/rounds", newObj);
      dispatch(postRounds(data));
    }
  };
};

const initialState = {
  entries: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return Object.assign({}, state, { entries: action.data });

    default:
      return state;
  }
};

export default rootReducer;
