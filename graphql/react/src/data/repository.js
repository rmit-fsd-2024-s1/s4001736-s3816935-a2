import { request, gql } from "graphql-request";

// --- Constants ----------------------------------------------------------------------------------
const GRAPH_QL_URL = "http://localhost:4000/graphql";

// --- User ---------------------------------------------------------------------------------------
async function getUsers() {
  // Simply query with no parameters.
  const query = gql`
    {
      all_users {
        username,
        password_hash, 
        first_name,
        last_name,
        joining_date, 
        curr_cart, 
        blocked,
        reviews {
          review_id,
          rating, 
          text, 
          flagged, 
          deleted
        }
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_users;
}

async function getUser(username) {
  // Query with parameters (variables).
  const query = gql`
    query ($username: String) {
      user(username: $username) {
        username,
        password_hash, 
        first_name,
        last_name,
        joining_date, 
        curr_cart, 
        blocked
      }
    }
  `;

  const variables = { username };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.user;
}

async function getUserExists(username) {
  const query = gql`
    query ($username: String) {
      user_exists(username: $username)
    }
  `;

  const variables = { username };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.user_exists;
}

async function blockUser(username) {
  const query = gql`
    mutation ($username: String) {
      block_user(username: $username) 
    }
  `;

  const variables = { username };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.block_user;
}

// --- Product ---------------------------------------------------------------------------------------
async function getProducts() {
  // Simply query with no parameters.
  const query = gql`
    {
      all_products {
        product_id, 
        product_name,
        product_price,
        product_image,
        is_special, 
        product_score, 
        num_of_reviews, 
        total_score, 
        reviews {
          review_id,
          rating, 
          text, 
          flagged, 
          deleted
        }
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_products;
}

async function getProduct(product_id) {
  // Query with parameters (variables).
  const query = gql`
    query ($product_id: Int) {
      product(product_id: $product_id) {
        product_id, 
        product_name,
        product_price,
        product_image,
        is_special, 
        product_score, 
        num_of_reviews, 
        total_score
      }
    }
  `;

  const variables = { product_id };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.product;
}

async function getProductExists(product_id) {
  const query = gql`
    query ($product_id: Int) {
      product_exists(product_id: $product_id)
    }
  `;

  const variables = { product_id };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.product_exists;
}

async function createProduct(product) {
  const query = gql`
    mutation ($product_id: Int, $product_name: String, $product_price: Float, $product_image: String, $is_special: Boolean, $product_score: Float, $num_of_reviews: Int, $total_score: Int) {
      create_product(input: {
        product_id: $product_id,
        product_name: $product_name, 
        product_price: $product_price, 
        product_image: $product_image, 
        is_special: $is_special, 
        product_score: $product_score, 
        num_of_reviews: $num_of_reviews, 
        total_score: $total_score
      }) {
        product_id, 
        product_name,
        product_price,
        product_image,
        is_special, 
        product_score, 
        num_of_reviews, 
        total_score
      }
    }
  `;

  const variables = product;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.create_product;
}

async function updateProduct(product) {
  const query = gql`
    mutation ($product_id: Int, $product_name: String, $product_price: Float, $product_image: String, $is_special: Boolean, $product_score: Float, $num_of_reviews: Int, $total_score: Int) {
      update_product(input: {
        product_id: $product_id,
        product_name: $product_name, 
        product_price: $product_price, 
        product_image: $product_image, 
        is_special: $is_special, 
        product_score: $product_score, 
        num_of_reviews: $num_of_reviews, 
        total_score: $total_score
      }) {
        product_id, 
        product_name,
        product_price,
        product_image,
        is_special, 
        product_score, 
        num_of_reviews, 
        total_score
      }
    }
  `;

  const variables = product;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.update_product;
}

async function deleteProduct(product_id) {
  const query = gql`
    mutation ($product_id: Int) {
      delete_product(product_id: $product_id)
    }
  `;

  const variables = { product_id };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.delete_product;
}

// --- Review ---------------------------------------------------------------------------------------
async function getReviews() {
  // Simply query with no parameters.
  const query = gql`
    {
      all_reviews {
        review_id,
        rating, 
        text, 
        flagged, 
        deleted
      }  
    }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_reviews;
}

async function getReview(review_id) {
  // Query with parameters (variables).
  const query = gql`
    query ($review_id: Int) {
      review(review_id: $review_id) {
        review_id,
        rating, 
        text, 
        flagged, 
        deleted
      }
    }
  `;

  const variables = { review_id };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.review;
}

async function getReviewExists(review_id) {
  const query = gql`
    query ($review_id: Int) {
      review_exists(review_id: $review_id)
    }
  `;

  const variables = { review_id };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.review_exists;
}

async function deleteReview(review_id) {
  const query = gql`
    mutation ($review_id: Int) {
      delete_review(review_id: $review_id)
    }
  `;

  const variables = { review_id };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.delete_review;
}

export {
  getUsers, getUser, getUserExists, blockUser,
  getProducts, getProduct, getProductExists, createProduct, updateProduct, deleteProduct,
  getReviews, getReview, getReviewExists, deleteReview
}
