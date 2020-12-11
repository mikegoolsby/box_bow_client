import React from 'react'
import {useAppState} from "../AppState.jsx"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '../components/Button'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));


const Auth = (props) => {

    const classes = useStyles();

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

return <div>
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <input id="standard-basic" label="Username" type="text" name="username" placeholder="Enter Username" value={formData.username} onChange={handleChange}/>
        <input id="standard-basic" label="Password" type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange}/>
        <Button/>
    </form>
</div>
}

export default Auth