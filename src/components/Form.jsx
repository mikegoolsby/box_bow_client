import React from 'react';
import {useAppState} from "../AppState.jsx"
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from "./Button"

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormPropsTextFields(props) {
  const classes = useStyles();
  const {state} = useAppState();
  const action = props.match.params.action
  const [formData, setFormData] = React.useState(state[action])

  const actions = {
        new: () => {
            return fetch(state.url + "/gifts", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
        },
        edit: () => {
            return fetch(state.url + "/gifts/" + state.edit.id, {
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
    actions[action]().then((data) => {
        props.getNotes()
        props.history.push("/listbuilder")
    });
  };


  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Title"
          placeholderValue="Name of Gift"
          variant="outlined"
          type="text"
          title="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          id="outlined-required"
          label="URL"
          placeholderValue="Paste URL here"
          variant="outlined"
          type="text"
          title="url"
          value={formData.url}
          onChange={handleChange}
        />
        <TextField
          id="outlined-required"
          label="Price"
          placeholderValue="Enter Price"
          type="number"
          variant="outlined"
          helperText="Round up! No decimals needed."
          title="price"
          value={formData.price}
          onChange={handleChange}
        />
        <TextField
          id="outlined-required"
          label="Comments"
          placeholderValue="Enter any comments here"
          variant="outlined"
          type="text"
          title="comments"
          value={formData.comments}
          onChange={handleChange}
        />
        <Button/>
      </div>
    </form>
  );
}
