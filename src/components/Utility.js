import React from 'react'
import { InputText } from 'primereact/inputtext';
import { BiSearch } from 'react-icons/bi'
import { IoFilterSharp } from 'react-icons/io5'


const Utility = ({search}) => {
    return (
        <div style={{display:'flex', marginBottom:'10px'}}>
            <div style={{marginLeft: 'auto'}}>
                <span className="p-input-icon-right">
                    <BiSearch style={{cursor:'pointer'}}/>
                    <InputText onChange={(e) => {search(e.target.value)}} placeholder="Search" />
                </span>
                <button className="filterButton">
                    <IoFilterSharp style={{margin: '0 10px 0 5px'}}/>
                    Filter
                </button>
            </div>
        </div>
    )
}

export default Utility
