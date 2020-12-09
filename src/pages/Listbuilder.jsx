import React from 'react'
import {useAppState} from "../AppState.jsx"

const Listbuilder = (props) => {

    const {state, dispatch} = useAppState()
    const {token, url, gifts, username} = state

    const getGifts = async () => {
      const response = await fetch(url + "/gifts", {
          method: "get",
          headers: {
              Authorization: "bearer " + token
          }
      })
      const fetchedGifts = await response.json()
      dispatch({type: "getGifts", payload: fetchedGifts})
    }

    React.useEffect(() => {getGifts()}, [])

    const loaded = () => {
        
        // console.log(state)

        return (
        <div>
            <h1>{username}'s List</h1>
            <ul>
                {state.gifts.map((gift) => (
                    <div className="gift" key="gift.id">
                        <h2>{gift.title}</h2>
                        <h4>{gift.price}</h4>
                        <a href={gift.url} target="_blank">View on Website</a>
                        <p>{gift.comments}</p>
                    </div>
                ))}
            </ul>
            
        </div>
    )}

    return gifts ? loaded() : <h1>Loading..</h1>;
};

export default Listbuilder;