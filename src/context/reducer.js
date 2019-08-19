export const initialState = {
  counter: 0,
  isChecked: true
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'TEST':
      return {
        ...state,
        isChecked: !state.isChecked
      };

    default:
      return state;
  }
};