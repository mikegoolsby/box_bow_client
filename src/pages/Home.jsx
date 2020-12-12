import React from 'react'
import bgImage from '../images/gift3.jpg'

const Home = (props) => {
    return <>
    <img src={bgImage} className="bg-img" alt="box with a bow and some holly"></img>
    <h3 className="home-page">Welcome to Box & Bow</h3>
    <p className="home-page-p">Mom and Dad bugging you for that Holiday List? Grandma looking for something to get you? Having a hard time thinking of what you want this year? Start using Box & Bow to put together your holiday shopping lists, whether for yourself or your loved ones today! Sign up and log in to begin using! It's always free!</p>
    </>
}

export default Home