import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from 'react-simple-star-rating'; 
import { updateReview } from "../repository/reviews";
import { getProductImages, updateProduct} from "../repository/products";

export default function EditReview(props) {
  const navigate = useNavigate();
  const productImages = getProductImages();  
  const [rating, setRating] = useState(props.review.rating); 
  const [reviewText, setReviewText] = useState(props.review.text);
  const [errorMessage, setErrorMessage] = useState(null);
  const score = parseFloat(props.product.product_score); 
  const scoreDec = score.toFixed(1);
  // const { product_id } = useParams(); 

  // Catch Rating value
  const handleRating = (rate) => {
    // setRating("0")
    setRating(rate)
    console.log(rating);
  }

  const handleInputChange = (event) => {
    setReviewText(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(reviewText.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      setErrorMessage("A review cannot be empty.");
      return;
    }

    const words = reviewText.split(' ');
    if (words.length > 100) {
      setErrorMessage("A review cannot exceed 100 words. "); 
      return; 
    }

    const updatedReview = {
      review_id: props.review.review_id, 
      rating: rating,
      text: reviewText
    }
    await updateReview(updatedReview); 

    const totalScore = parseInt(props.product.total_score - props.review.rating + rating)
    const averageScore = parseFloat(totalScore / props.product.num_of_reviews)

    const updatedProduct = {
      product_id: props.product.product_id, 
      product_score: averageScore, 
      num_of_reviews: props.product.num_of_reviews, 
      total_score: totalScore
    }

    const product = await updateProduct(updatedProduct); 
    props.rateWhichProduct(product); 
    
    alert("Your review has been updated. ");
    navigate("/review"); 
  }

  const handleGoBack = () => {
    navigate("/review"); 
  }

  return (
    <div>
      <br/>
      <div className="productReviews">
        <img src={productImages[props.product.product_id-1]} className="productImage" alt="image"></img>
        <br/><span>{props.product.product_name}</span>
        <br/><span className="productPrice">${props.product.product_price}</span>
        <br/><span className="rating">{scoreDec}</span> <Rating initialValue={props.product.product_score} readonly/>
      </div>
       
      <br/>
      <div className="reviews">
        <h1>Edit Review</h1>        
        <form onSubmit={handleSubmit}>
          <Rating onClick={handleRating} initialValue={props.review.rating}/>
          <div className="form-group">
            <textarea name="reviewText" id="reviewText" className="form-control" rows="5" 
              value={reviewText} onChange={handleInputChange} />
          </div>
          {errorMessage !== null &&
            <div className="form-group">
              <span className="text-danger">{errorMessage}</span>
            </div>
          }
          <div className="form-group">
            <input type="submit" className="btn btn-primary mr-3" value="Save changes" />
            <input type="button" className="btn btn-danger" value="Cancel"
              onClick={handleGoBack} />
          </div>
        </form>
      </div> 
    </div>
  );
}

