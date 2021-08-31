import React, { useEffect, useState } from 'react'
import { DataScroller } from 'primereact/datascroller';
import { AiFillFire } from 'react-icons/ai';
import { BiSync } from 'react-icons/bi'
import { ProgressBar } from 'primereact/progressbar';
import axios from "axios";



const CardDisplay = (props) => {

    const [users, setUsers] = useState([])
    const [dict, setDict] = useState({})


    useEffect(() => {
        return axios
            .get("https://virtual-cards-json-backend.herokuapp.com/owners")
            .then((res) => {
                setUsers(res.data)
                createDictionary(res.data)
                return true
            })
            .catch((err) => { new Error(err.message)})
    }, [])

    function createDictionary(data){
        let obj = {}
        data.forEach((user) => {
            obj[user.owner_id]=user.owner_name
        })
        setDict(obj)
        console.log(obj)
    }


    const cardTemplate = (cardData) => {
        return (
            <div className="cardContainer">
                <div className="card">
                    <div className="card-grid">
                        <div style={{display: 'flex', flexDirection:'column'}}>
                            <h2>{cardData.name}</h2>
                            <div style={{display:'flex', alignItems:'center', color:'#888888'}}>
                                <p>{dict[cardData.owner_id]}</p>
                                <span className="dot"></span>
                                <p>{cardData.budget_name}</p>
                            </div>
                            <p className="cardType">{cardData.card_type === 'burner' && 'BURNER'} {cardData.card_type==='subscription' && 'SUBSCRIPTION'}</p>
                        </div>
                        <div style={{display: 'flex', flexDirection:'column'}}>
                            {cardData.card_type==='burner' && <AiFillFire className="iconStyling" />}
                            {cardData.card_type==='subscription' && <BiSync className="iconStyling" />}
                            {cardData.card_type==='burner' && <p style={{margin: '10px 0 0 auto'}}>Expires: {cardData.expiry} </p>}
                            {cardData.card_type==='subscription' && <p style={{margin: '10px 0 0 auto'}}>August Limit: {cardData.limit} </p>}

                        </div>
                    </div> 
                    <ProgressBar 
                        color='#FF3266' 
                        showValue={false} 
                        value={(cardData.spent.value/cardData.available_to_spend.value)*100} 
                    />
                    <div className="card-grid-bottom">
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <div style={{display:'flex', alignItems:'center', margin:'20px 0 10px 0'}}>
                                <span className="big-dot-pink"></span><h4>Spent</h4>
                            </div>
                            <div style={{display:'flex', alignItems:'center', margin: '10px 0'}}>
                                <span className="big-dot-green"></span><h4>Available to spend</h4>
                            </div>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <h4 style={{margin: '20px 0 10px 0', alignSelf:'flex-end'}}>
                                {cardData.spent.value} {cardData.spent.currency}
                            </h4>
                            <h4 style={{margin: '10px 0', alignSelf:'flex-end'}}>
                                {cardData.available_to_spend.value} {cardData.available_to_spend.currency}
                            </h4>
                        </div>
                    </div>
               </div>
            </div>   
        )
    }

    return (
        <div className="datascroller-cards">
            <div>
                <DataScroller value={props.cardList}  itemTemplate={cardTemplate} rows={6} inline scrollHeight="78vh" />
            </div>
        </div>
    )
    
}



export default CardDisplay
