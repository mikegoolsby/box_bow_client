import React from 'react';
import {useAppState} from "../AppState.jsx"


const Form = (props) => {
  const {state} = useAppState();
  const {token} = state
  const action = props.match.params.action;
  // console.log("Action: ", action)
  // console.log("State: ", state)
  // console.log("Initial Form Data: ", state[action])
  // console.log(props)
  
  const [formData, setFormData] = React.useState(state[action]);

  // console.log(formData)

  const actions = {
        new: () => {
            return fetch(state.url + "/gifts", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + token,
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
        },
        edit: () => {
            return fetch(state.url + "/gifts/" + state.edit.id, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + token,
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
        // props.getGifts()
        props.history.push("/listbuilder/")
    });
  };


  return (
    <form onSubmit={handleSubmit}>
        <input className="form-input" 
          label="Title"
          placeholder="Name of Gift"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <input className="form-input"
          label="URL"
          placeholder="Paste URL here"
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
        />
        <input className="form-input"
          label="Price"
          placeholder="Enter Price"
          type="number"
          helperText="Round up! No decimals needed."
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <input className="form-input"
          label="Comments"
          placeholder="Comments"
          type="text"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
        />
        <input className="nav-links" id="pad-me" type="submit" value={action} />
    </form>
  );
}

export default Form;