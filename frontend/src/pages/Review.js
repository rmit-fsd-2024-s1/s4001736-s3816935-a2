import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import { Rating } from 'react-simple-star-rating'; 
import { findProductReviews, createReview, deleteReview } from "../repository/reviews";
import { getProductImages, updateProduct } from "../repository/products";

export default function RateProduct(props) {
  const navigate = useNavigate();
  const productImages = getProductImages();  
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0); 
  const [reviewText, setReviewText] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const score = parseFloat(props.product.product_score); 
  const scoreDec = score.toFixed(1); 

  useEffect(() => {
    async function loadReviews() {
      const userReviews = await findProductReviews(props.product.product_id);

      setReviews(userReviews);
      setIsLoading(false);
      
    }
    loadReviews();
  }, []);

  // Catch Rating value
  const handleRating = (rate) => {
    // setRating("0")
    setRating(rate)
    console.log(rating);
  }

  const resetReviewContent = () => {
    setReviewText("");
    handleRating(0); 
    setRating(0); 
    setErrorMessage(null);
    //navigate("/"); 
    //navigate("/rateproduct"); 
  }

  const handleInputChange = (event) => {
    setReviewText(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Trim the post text.
    // const reviewTrimmed = review.trim();

    if(reviewText.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      setErrorMessage("A review cannot be empty.");
      return;
    }

    const words = reviewText.split(' ');
    if (words.length > 100) {
      setErrorMessage("A review cannot exceed 100 words. "); 
      return; 
    }

    const newReview = {
      product_id: props.product.product_id, 
      rating: rating,
      text: reviewText, 
      username: props.user.username
    }
    await createReview(newReview);
    const newReviews = await findProductReviews(props.product.product_id);
    setReviews(newReviews); 

    console.log(typeof props.product.total_score)
    console.log(typeof rating)

    const totalScore = parseInt(props.product.total_score) + rating
    const reviewCount = props.product.num_of_reviews + 1
    const averageScore = parseFloat(totalScore / reviewCount)
    // const averageScoreDec = Number(averageScore)
    // this.setState({ averageScoreDec });

    console.log(typeof totalScore); 
    console.log(typeof reviewCount); 
    console.log(typeof averageScore); 
    console.log( averageScore); 

    const updatedProduct = {
      product_id: props.product.product_id, 
      product_score: averageScore, 
      num_of_reviews: reviewCount, 
      total_score: totalScore
    }

    const newProduct = await updateProduct(updatedProduct); 
    props.rateWhichProduct(newProduct); 
    
    resetReviewContent();
    alert("Your review has been posted. ");
  }

  const handleEdit = (review) => {
    props.editWhichReview(review); 
    navigate("/editreview"); 
  }

  const confirmDeleteReview = async (review) => {
    await deleteReview(review.review_id); 
    const totalScore = parseInt(props.product.total_score) - review.rating
    const reviewCount = props.product.num_of_reviews - 1

    if (reviewCount === 0) {
      const updatedProduct = {
        product_id: props.product.product_id, 
        product_score: 0, 
        num_of_reviews: reviewCount, 
        total_score: totalScore
      }
      const newProduct = await updateProduct(updatedProduct); 
      props.rateWhichProduct(newProduct); 

      const newReviews = await findProductReviews(props.product.product_id);
      setReviews(newReviews);

      alert("Your review has been deleted!");
      return
    }

    const averageScore = parseFloat(totalScore / reviewCount)

    console.log( totalScore); 
    console.log( reviewCount); 
    console.log(typeof averageScore); 
    console.log( averageScore); 

    const updatedProduct = {
      product_id: props.product.product_id, 
      product_score: averageScore, 
      num_of_reviews: reviewCount, 
      total_score: totalScore
    }

    const newProduct = await updateProduct(updatedProduct); 
    props.rateWhichProduct(newProduct); 

    const newReviews = await findProductReviews(props.product.product_id);
    setReviews(newReviews);

    alert("Your review has been deleted!");
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
        <h4>Leave a review</h4>
        {props.user === null ? 
          <span>You must log in to leave reviews. </span>
          : 
          <form onSubmit={handleSubmit}>
            <Rating onClick={handleRating} initialValue={rating}/>
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
              <input type="submit" className="btn btn-primary mr-3" value="Post" />
              <input type="button" className="btn btn-danger" value="Cancel"
                onClick={resetReviewContent} />
            </div>
          </form>

        }
        

        <h1>Reviews</h1>
        <div>
          {isLoading ? 
            <div>Loading reviews...</div>
            :
            reviews.length === 0 ?
              <span className="text-muted">No reviews yet</span>
              : 
              reviews.map((review) =>
                review.deleted === true ? 
                <div className="border my-3 p-3" style={{ whiteSpace: "pre-wrap" }}>
                  **** This review has been deleted by the admin! ****
                </div>
                :
                <div className="border my-3 p-3" style={{ whiteSpace: "pre-wrap" }}>
                  <h4 className="text-primary">{review.user.first_name} {review.user.last_name}</h4> Username: {review.user.username}
                  <Rating initialValue={review.rating} readonly/>
                  <br/><div className="reviewText">{review.text}</div>
                  <br/>
                  {props.user !== null && review.username === props.user.username && 
                    <div>
                      <button type="button" className="btn btn-primary mr-3" onClick={() => handleEdit(review)}>Edit Review</button>
                      <Popup trigger={<button type="button" className="btn btn-danger">Delete Review</button>}> 
                        {
                          close => (
                            <div>
                              Are you sure you want to delete this review? &nbsp;
                              <button type="button" onClick={() => confirmDeleteReview(review)}>Yes</button>
                              <button type="button" onClick={() => close()}>Cancel</button>
                            </div>
                          )
                        }
                      </Popup>
                      
                    </div>
                  }
                  <br/>
                </div>
                
              )

          }
        
        </div>
      
      </div> 
    </div>
  );
}

