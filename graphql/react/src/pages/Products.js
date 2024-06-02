import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct, getReviews, deleteReview } from "../data/repository";
import MessageContext from "../contexts/MessageContext";

export default function Products() {
  const [products, setProducts] = useState(null);
  const [reviews, setReviews] = useState(null);  
  const { message, setMessage } = useContext(MessageContext);

  // Load products.
  useEffect(() => {
    loadProducts();
  }, [reviews]);

  const loadProducts = async () => {
    const currentProducts = await getProducts();

    setProducts(currentProducts);
  };

  // Load reviews.
  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const currentReviews = await getReviews();

    setReviews(currentReviews);
  };

  const handleDeleteProduct = async (product_id) => {
    if(!window.confirm(`Are you sure you want to delete product ${product_id} ?`))
      return;
    
    const isDeleted = await deleteProduct(product_id);

    if(isDeleted) {
      // Could remove the product that was deleted or refresh the products.
      // Here the products are refreshed.
      await loadProducts();

      setMessage(<>Product <strong>{product_id}</strong> has been deleted successfully.</>);
    }
  };

  const handleDeleteReview = async (id) => {
    if(!window.confirm(`Are you sure you want to delete review ${id} ?`))
      return;
    
    const isDeleted = await deleteReview(id);

    if(isDeleted) {
      // Could remove the review that was deleted or refresh the reviews.
      // Here the reviews are refreshed.
      await loadReviews();

      setMessage(<>**** This review <strong>{id}</strong> has been deleted by the admin! ***</>);
    }
  };

  if(products === null)
    return null;

  return (
    <div>
      {message && <div className="alert alert-success" role="alert">{message}</div>}
      <h1 className="display-4">Products and Reviews</h1>
      <div className="mb-3">
        <Link to="/products/create">Create Product</Link>
      </div>      
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>product_id</th>
              <th>product_name</th>
              <th>product_price</th>
              <th>is_special</th>
              <th>product_score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product =>
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.product_name}</td>
                <td>${product.product_price.toFixed(2)}</td>
                <td>{product.is_special.toString()}</td>
                <td>{product.product_score}</td>
                <td>
                  {product.reviews.length > 0 &&
                    <ul className="pl-0">
                      {product.reviews.map(review =>
                        <li key={review.id}>{review.content}
                          <button className="btn btn-danger" onClick={() => handleDeleteReview(review.id)}>Delete Review</button>
                        </li>                        
                      )}
                    </ul>
                  }
                </td>
                <td>
                  <Link className="btn btn-primary" to={`/products/edit/${product.product_id}`}>Edit Product</Link>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.product_id)}>Delete Product</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
