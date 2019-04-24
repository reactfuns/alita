
const setContext = (state, payload) => {
    return ({ ...state, ...payload });
}

export const ACTION_SET = 'ACTION_SET';

export const shopReducer = (state, action) => { switch (action.type) {
    case ACTION_SET: return setContext(state, action.payload);
    default: return state;
}};
