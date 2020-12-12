import React, { useContext, useReducer } from 'react'

////
// Initial State
////

const initialState = {
    url: "https://box-bow-api.herokuapp.com",
    token: null,
    username: null,
    first_name: null,
    gifts: null,
    new: {
        title: "",
        url: "",
        price: "",
        comments: ""
    },
    edit: {
        id: 0,
        title: "",
        url: "",
        price: "",
        comments: ""
    },
};

/////
// Reducer
/////

const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case "auth":
            newState = {...state, ...action.payload};
            return newState;
            break;

        case "logout":
            newState = {...state, token: null, username: null}
            window.localStorage.removeItem("auth")
            return newState;
            break;

        case "getGifts":
            newState = {...state, gifts: action.payload}
            return newState;
            break;

        case "select":
            newState = {...state, edit: action.payload} 
            return newState;
            break;

        default:
            return state;
            break;
    }
};

///////
// App Context
///////
const AppContext = React.createContext(null)

//////
//App State
//////

export const AppState = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return <AppContext.Provider value={{state, dispatch}}>
        {props.children}
    </AppContext.Provider>

}

//////
// Use App State Hook
//////

export const useAppState = () => {
  return React.useContext(AppContext)
}