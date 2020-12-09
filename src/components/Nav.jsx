import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {useAppState} from "../AppState.jsx"

const Nav = (props) => {

    const {state, dispatch} = useAppState()

    return <header>
        <h1>box + bow</h1>
        <nav>
            <Link to="/">Home</Link>
            {state.token ? <Link to="/listbuilder">Listbuilder</Link> : null}
            {!state.token ? <Link to="/auth/signup">Signup</Link> : null}
            {!state.token ? <Link to="/auth/login">Login</Link> : null}
            {state.token ? <div onClick={() => {
                dispatch({type: "logout"})
                props.history.push("/")
            }}>
                Logout
            </div> : null}
        </nav>
    </header>
}

export default withRouter(Nav)