import React from 'react'
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom'



const Header = () => {
    const history = useHistory()

    const handleRouting = () => {
        history.push("/")
    }

    return (
        <div className="header">
            <div style={{padding: "10px 40px"}}>
                <h1>Virtual cards</h1>
            </div>
            <div className="headerButton">
                <Button onClick={handleRouting} icon="pi-arrow-left" iconPos="left" label="Previous" className="p-button-raised" />
                <Button icon="ri-add-line" iconPos="left" label="virual card" className="p-button-raised" />
            </div>
        </div>
    )
}

export default Header
