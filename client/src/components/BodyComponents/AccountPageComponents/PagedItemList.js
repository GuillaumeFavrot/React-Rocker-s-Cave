import React, {useState, useEffect} from 'react'
import PagedItemCard from './PagedItemCard'

import './../../../styles/body/accountPageComponents/pagedItemList.css'


function PagedItemList({items, listItemViewToggle, numberOfItemsPerPage}) {

    //Page count
    const itemsPerPage = numberOfItemsPerPage

    const totalPages = Math.ceil(items.length / itemsPerPage)

    const [currentPage, setCurrentPage] = useState(1)

    const [itemsToDisplay, setItemsToDisplay] = useState([])

    const createArray = () => {    
            const startIndex = ((currentPage - 1) * (itemsPerPage + 1)) - (currentPage - 1)
            const endIndex = (currentPage * (itemsPerPage + 1)) - currentPage
            if(items.length > 0) {
                let newItemsArray = items.slice(startIndex, endIndex)
                setItemsToDisplay(newItemsArray)
            }    
    }

    const previousPage = () => {
        if(currentPage > 1) {
            setCurrentPage(currentPage => currentPage - 1)
        } else return 
    }

    const nextPage = () => {
        if(currentPage < totalPages) {
        setCurrentPage(currentPage => currentPage + 1)
        } else return 
    }

    useEffect(() => {
        createArray()
    }, [currentPage, items])

    const overviewPageRequest = (id) => {
        listItemViewToggle(id)
    }
    
    return (
        <div className="pagedItemList-section-container">
            <div>
            {items.length === 0 ? "" : itemsToDisplay.map((item)=>(
            <PagedItemCard key={item._id} item = {item} overviewPageRequest={overviewPageRequest}/>    
            ))}
            </div>
            <div className ="pagedItemList-buttons">
                <button className="btn btn-aligned-bottom-left-square" onClick={previousPage}>Previous page</button>
                <div className="pagedItemList-pageCounter">{currentPage} / {totalPages}</div>
                <button className="btn btn-aligned-bottom-right-square" onClick={nextPage}>Next page</button>
            </div>
        </div>
    )
}

export default PagedItemList
