import React, { useState } from "react";
import { useHistory } from 'react-router-dom'


const EntryPage = ({selectOwner, cardList}) => {

  
    const history = useHistory()
    
    const [ownerId, setOwnerId] = useState(cardList[0].owner_id)

    const handleSelection = (id) => {
        selectOwner(id)
        history.push(`/cards/${id}`)
    }

    const uniqueList = [...new Set(cardList.map(item => item.owner_id))]
  
    return (
        
        <div className="entryContainer">
            <div className="entryCard">
                <h2 style={{textAlign: 'center', padding: '20px 20px', color: 'white'}}>Hello, welcome !</h2>
                <label> Select your owner Id: </label>
                <select onClick={(e) => {setOwnerId(e.target.value)}}>
                {
                    uniqueList.map((id) => {
                       return <option value={id} key={id}>{id}</option>
                    })
                }
                </select>
                {ownerId && <button onClick={() => handleSelection(ownerId)}>Enter</button>}
            </div>
        </div>
    )
}

export default EntryPage
