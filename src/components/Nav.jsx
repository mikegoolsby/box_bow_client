import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {useAppState} from "../AppState.jsx"

const Nav = (props) => {

    const {state, dispatch} = useAppState()

    return <header>
        <h1 className="main-header">Box & Bow</h1>
        <nav>
            <Link to="/" className="nav-links">Home</Link>
            {state.token ? <Link to="/listbuilder" className="nav-links">Listbuilder</Link> : null}
            {!state.token ? <Link to="/auth/signup" className="nav-links">Signup</Link> : null}
            {!state.token ? <Link to="/auth/login" className="nav-links">Login</Link> : null}
            {state.token ? <div className="nav-links" onClick={() => {
                dispatch({type: "logout"})
                props.history.push("/")
            }}>
                Logout
            </div> : null}
        </nav>
    </header>
}

export default withRouter(Nav)