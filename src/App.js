import React, { useEffect, useState } from "react";
import Header from './components/Header';
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import Card from './components/CardDisplay';
import "remixicon/fonts/remixicon.css"
import axios from "axios";
import EntryPage from "./components/EntryPage";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MainPage from "./components/MainPage";




function App() {
  const [cardList, setCardList] = useState()
  
  useEffect(() => {
    return axios
      .get("https://virtual-cards-json-backend.herokuapp.com/cards")
      .then((response) => {
        setCardList(response.data[0].data);
        return true;
      })
      .catch((error) => new Error(error.message))
  }, []);
  
  

  const [ownerId, setOwnerId] = useState()

  const handleOwnerSelection = (id) => {
    let parsed = parseInt(id)
    setOwnerId(parsed)
    console.log(id)
  }
  console.log(cardList)



  return (
    <Router>
      <div>
        {/* <Header /> */}
        {/* 
        <div className="cardContainer">
          {cardList && cardList.length > 0 ? <Card className="card" cardList={cardList} /> : <p>loading...</p>}
        </div> */}
        <Switch>
          <Route exact path="/">
            { !cardList && <h1>Loading ...</h1>}
            {cardList && <EntryPage selectOwner={handleOwnerSelection} cardList={cardList}/>}
          </Route>
          <Route exact path="/cards/:ownerId">
            <MainPage id={ownerId} cardList={cardList}/>
          </Route> 
        </Switch>

      </div>
    </Router>
  );
}

export default App;
