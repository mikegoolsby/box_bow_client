import React from 'react'
import {useAppState} from "../AppState.jsx"



const Auth = (props) => {


    const type = props.match.params.form
    const [formData, setFormData] = React.useState({
        username: "",
        password: ""
    })

    const [userData, setUserData] = React.useState(null);

    const {state, dispatch} = useAppState()

    React.useEffect(() => {
        if (userData) {
            const {token, user} = userData;
            dispatch({type: "auth", payload: {token, username: user.username}});
            window.localStorage.setItem("auth", JSON.stringify({token, username: user.username}))
            props.history.push("/listbuilder")
        }
    }, [userData])

    const actions = {
        signup: () => {
            return fetch(state.url + "/users", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
        },
        login: () => {
            return fetch(state.url + "/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
        }
    }

    const handleChange = (event) => {
      setFormData({...formData, [event.target.name] : event.target.value})
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      actions[type]().then((data) => {
          setUserData(data);
      })
    }

return (
<div>
    <form onSubmit={handleSubmit}>
        <div>
            <label>
                <input className="form-input" label="Username" type="text" name="username" placeholder="Enter Username" value={formData.username} onChange={handleChange}/>
            </label>
            <label>
                <input className="form-input" label="Password" type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange}/>
                <input className="nav-links" id="pad-me" type="submit" value={type} />
            </label>
        </div>
    </form>
</div>
)}

export default Auth;