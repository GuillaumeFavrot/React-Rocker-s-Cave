import React from 'react'
import './../../../styles/body/productPageComponents/productDetailPageCommentCard.css'

function ProductDetailPageCommentCard({review}) {

    let date = new Date(review.createdAt)
    let formatedDate = date.toLocaleDateString('Fr-fr')

    return (
        <div className="productPage-detail-commentCard-container">
            <div>
                <span className={review.rate >= 1 ? "fa fa-star checked" : "fa fa-star"}></span>
                <span className={review.rate >= 2 ? "fa fa-star checked" : "fa fa-star"}></span>
                <span className={review.rate >= 3 ? "fa fa-star checked" : "fa fa-star"}></span>
                <span className={review.rate >= 4 ? "fa fa-star checked" : "fa fa-star"}></span>
                <span className={review.rate >= 5 ? "fa fa-star checked" : "fa fa-star"}></span>
                <span className="productPage-detail-comment-title">{review.reviewTitle}</span>
            </div>
            <div className="productPage-detail-comment-UsernameAndDate">
                <span>{review.author}</span>{formatedDate}
            </div>
            <div className="productPage-detail-comment-body">
                {review.reviewComment}
            </div>
        </div>
    )
}

export default ProductDetailPageCommentCard
