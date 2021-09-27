import React from 'react'

import './../../../styles/body/accountPageComponents/userCartProductCards.css'

function UserCartProductCards({item, deleteItemFromCart}) {

    let formatter = new Intl.NumberFormat('fr-EU', {
        style: 'currency',
        currency: 'EUR'
    })

    const onDeleteClick = () => {
        deleteItemFromCart(item.cartItemId)
    }

    return (
        <div className = "cart-itemCard-container">
            <div className = "cart-itemCard-image">
                <img src={item.image} alt="product"/>
            </div>
            <div className = "cart-itemCard-content-container">
                <span>{item.brand} <p>{item.name}</p></span>
                <span className="productId">Product ID :<p> {item.productId}</p></span>
                <span>Quantity :<p> {item.quantity}</p></span>
                <span>Price : <p>{formatter.format(item.effectivePrice)} (total: {formatter.format(item.totalPrice)})</p></span>
            </div>
            <div className = "cart-itemCard-btn-container">
                <button className ="btn-red delete" onClick={() => onDeleteClick()}>X</button>
            </div>
        </div>
    )
}

export default UserCartProductCards
