
export const ACTION = {
    REPLACE: 'ACTION_REPLACE',
    COMBINE: 'ACTION_COMBINE',
    MERGE: 'ACTION_MERGE',
}

export const shopReducer = (state, action) => { switch (action.type) {
    case ACTION.REPLACE: return ({ ...action.payload });
    case ACTION.COMBINE: return ({ ...state, ...action.payload });
    case ACTION.MERGE: return Object.assign(state, action.payload);
    default: return state;
}};
