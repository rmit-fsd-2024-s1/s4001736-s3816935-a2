import axios from "axios";

const API_HOST = "http://localhost:4000";

async function findProductReviews(product_id) {    // exports.findAll
  const response = await axios.get(API_HOST + "/api/review", { params: {product_id}});

  return response.data;
}

async function createReview(review) {
  const response = await axios.post(API_HOST + "/api/review", review);

  return response.data;
}

async function findOneReview(id) {
  const response = await axios.get(API_HOST + `/api/review/select/${id}`); 

  return response.data;
}

async function updateReview(review) {
  const response = await axios.put(API_HOST + "/api/review", review); 

  return response.data; 
}

async function deleteReview(id) {
  const response = await axios.delete(API_HOST + `/api/review/select/${id}`); 

  return response.data;
}

export {
  findProductReviews, 
  createReview, findOneReview, updateReview, 
  deleteReview
}
