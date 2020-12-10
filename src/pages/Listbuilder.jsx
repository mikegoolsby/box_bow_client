import React from 'react'
import {useAppState} from "../AppState.jsx"
import {Link, Route} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormPropsTextFields from '../components/Form'

// const useStyles = makeStyles((theme) => ({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//       },
//     },
// }));

const Listbuilder = (props) => {

    const {state, dispatch} = useAppState()
    const {token, url, gifts, username} = state
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
            <ul className="listbuilder-ul">
                {state.gifts.map((gift) => (
                    <div className="gift" key="gift.id">
                        <h2>{gift.title}</h2>
                        <h4>${gift.price}</h4>
                        <a href={gift.url} target="_blank">View on Website</a>
                        <h3 className="comments">Comments: </h3><p>{gift.comments}</p>
                    </div>
                ))}
            </ul>
            <Link to="/listbuilder/new">
                <Button variant="contained" color="primary">
                Add to your List
                </Button>
                <Route path="/listbuilder/:action" render={(rp) => <FormPropsTextFields {...rp} getGifts={getGifts}/>}></Route>
            </Link>
        </div>
    )}

    return gifts ? loaded() : <h1>Loading..</h1>;
};

export default Listbuilder;