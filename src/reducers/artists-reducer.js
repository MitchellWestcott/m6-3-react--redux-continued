const initialState = {
  currentArtist: null,
  status: "idle",
  error: null,
};

export default function artistsReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_DATA_FETCH": {
      return {
        ...state,
        status: "loading",
      };
    }

    case "RECEIVE_DATA_FETCH": {
      return {
        ...state,
        currentArtist: {
          profile: action.data,
        },
        status: "idle",
      };
    }

    case "RECEIVE_DATA_FETCH_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }
    default: {
      return state;
    }
  }
}
