
export const ACTION = {
    REPLACE: 'ACTION_REPLACE',
    COMBINE: 'ACTION_COMBINE',
    MERGE: 'ACTION_MERGE',
}

export const shopReducer = (state, action) => { switch (action.type) {
    case ACTION.REPLACE: return ({ ...action.payload });
    // break;
    case ACTION.COMBINE: return ({ ...state, ...action.payload });
    // break;
    case ACTION.MERGE: return Object.assign(state, action.payload);
    // break;
    default: return state;
}};
