import React from 'react'

function Button({alignment, buttonText, buttonName, onButtonClick}) {

    const onClick = (e) => {
        onButtonClick(e.target.name)
    }

    return (
        <div className= "homePage-card-btn-container">
            <button name={buttonName} className ={alignment === "left" ? "btn btn-aligned-left-flex" : "btn" } onClick={(e) => onClick(e)}>{buttonText}</button>
        </div>
    )
}

export default Button
