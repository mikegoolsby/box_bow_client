import React from 'react';
import {useAppState} from "../AppState.jsx"
import Button from "./Button"


const Form = (props) => {
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
        props.getGifts()
        props.history.push("/listbuilder")
    });
  };


  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <input
          required
          label="Title"
          placeholderValue="Name of Gift"
          variant="outlined"
          type="text"
          title="title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          label="URL"
          placeholderValue="Paste URL here"
          variant="outlined"
          type="text"
          title="url"
          value={formData.url}
          onChange={handleChange}
        />
        <input
          label="Price"
          placeholderValue="Enter Price"
          type="number"
          variant="outlined"
          helperText="Round up! No decimals needed."
          title="price"
          value={formData.price}
          onChange={handleChange}
        />
        <input
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

export default Form;