import React from 'react'
import bgImage from '../images/gift3.jpg'

const Home = (props) => {
    return <>
    <img src={bgImage} className="bg-img" alt="box with a bow and some holly"></img>
    <h3 className="home-page">Welcome to Box & Bow</h3>
    <p className="home-page-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dignissimos laudantium maiores cumque sunt? Cum excepturi perferendis, incidunt perspiciatis ipsum quisquam ratione amet, voluptas, libero nemo aliquid id odit autem!</p>
    </>
}

export default Home