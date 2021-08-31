import React, {useState, useEffect} from 'react'
import { TabView,TabPanel } from 'primereact/tabview';
import CardDisplay from './CardDisplay';
import Header from './Header';
import Utility from './Utility';
import { useParams } from 'react-router-dom'
import axios from "axios";



const MainPage = ({id, cardList}) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [filteredList, setFilteredList] = useState([])
    const [tempList, settempList] = useState([])

    const { ownerId } = useParams()
    console.log(ownerId)

    const handleFilteredSearch = (val) => {
        if(val === ""){
            let defaultFilteredList = cardList.filter((card) => {
                return card.owner_id === parseInt(ownerId) 
            })
            setFilteredList(defaultFilteredList)
        }
        else{
            let defaultFilteredList = cardList.filter((card) => {
                return card.owner_id === parseInt(ownerId) 
            })
            setFilteredList(defaultFilteredList)

             let filterSearch = defaultFilteredList.filter((card) => {
                return card.name.toLowerCase().includes(val.toLowerCase())
                          
            })
            console.log(filterSearch)
            setFilteredList(filterSearch)
        }
  
    }

    const handleSearch = (val) =>{
        if(val===""){
            settempList(cardList)
        }
        else{
            let filterSearch = cardList.filter((card) => {
                return card.name.toLowerCase().includes(val.toLowerCase())
                          
            })
            settempList(filterSearch)
        }
    }

    useEffect(() => {
        let filteredList = []
        if(cardList === undefined){
            return axios
                .get("https://virtual-cards-json-backend.herokuapp.com/cards")
                .then((response) => {
                    let data = response.data[0].data
                    settempList(data)
                    filteredList = data.filter((card) => {
                        return card.owner_id === parseInt(ownerId) 
                    })
                    setFilteredList(filteredList);
                return true;
                })
                .catch((error) => new Error(error.message))
        }
        else{
                settempList(cardList)
                filteredList = cardList.filter((card) => {
                return card.owner_id === parseInt(ownerId) 
            })
            setFilteredList(filteredList)
        }      
    }, []);

    return (
        <div>
            <Header />
            <TabView style={{padding: "0 40px"}} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Your">
                    <Utility search={handleFilteredSearch} />
                    {filteredList && <CardDisplay cardList={filteredList}/>}
                    
                </TabPanel>
                <TabPanel header="All">
                    <Utility search={handleSearch} />
                    {tempList.length > 0 && <CardDisplay cardList={tempList}/>}
                    {!tempList.length > 0 && <CardDisplay cardList={tempList}/>}
                </TabPanel>
                <TabPanel header="Blocked">
                    <h2 style={{textAlign:'center'}}>content not provided</h2>
                </TabPanel>
            </TabView>
            {/* <button onClick={handleTabChancge}>on to 2</button>
            <h1>{id}</h1> */}
        </div>
    )
}

export default MainPage
