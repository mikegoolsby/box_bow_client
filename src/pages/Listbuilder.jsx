import React from 'react'
import {useAppState} from "../AppState.jsx"
import {Link, Route} from 'react-router-dom'
import Form from '../components/Form.jsx'

// const useStyles = makeStyles((theme) => ({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//       },
//     },
// }));

const Listbuilder = (props) => {

    const {state, dispatch} = useAppState()
    const {token, url, gifts, username} = state;
    // const classes = useStyles();

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
            <h1 className="list-header">{username}'s Wishlist this year. Happy shopping!</h1>
            <Route path="/listbuilder/:action" render={(rp) => <Form {...rp} getGifts={getGifts}/>}/>
            <ul className="listbuilder-ul" id="container">
                {state.gifts.map((gift) => (
                    <div className="gift" key={gift.id}>
                        <h2>{gift.title}</h2>
                        <h4>${gift.price}</h4>
                        <a href={gift.url} target="_blank">View on Website</a>
                        <h3 className="comments">Comments: </h3><p>{gift.comments}</p>
                        <div className="btn-holder">
                            <div className="nav-links" id="center-txt" onClick={() => {
                                dispatch({type: "select", payload: gift})
                                props.history.push("/listbuilder/edit")
                            }}>Edit</div>
                        </div>
                        <div className="btn-holder">
                            <div className="nav-links-red" id="center-txt" onClick={() => {
                                fetch(url + "/gifts/" + gift.id, {
                                    method: "delete",
                                    headers: {
                                        Authorization: "bearer " + token
                                    }
                                })
                                .then(() => getGifts());
                            }}>Delete</div>
                        </div>
                    </div>
                ))}
            </ul>
            <div className="center-btn">
            <Link to="/listbuilder/new">
                    <button className="nav-links" id="center-me">
                    Add to your List
                    </button>
            </Link>
            </div>
        </div>
    )}

    return gifts ? loaded() : <h1 className="main-header">just a second...</h1>;
};

export default Listbuilder;