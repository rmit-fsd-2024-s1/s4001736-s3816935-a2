import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProductExists, createProduct } from "../data/repository";
import MessageContext from "../contexts/MessageContext";
import { trimFields } from "../utils";
// import EmailValidator from "email-validator";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    product_id: "",
    product_name: "", 
    product_price: "",
    product_image: "", 
    is_special: "", 
    product_score: 0, 
    num_of_reviews: 0, 
    total_score: 0
  });
  const [errors, setErrors] = useState({ });
  const { setMessage } = useContext(MessageContext);

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form and if invalid do not contact API.
    // const { trimmedFields, isValid } = await handleValidation();
    // if(!isValid)
    //   return;

    // Create product.
    // const product = await createProduct(trimmedFields);
    const product = await createProduct(fields);

    // Show success message.
    setMessage(<><strong>{product.product_id}</strong> has been created successfully.</>);

    // Navigate to the products page.
    navigate("/products");
  };

  const handleValidation = async () => {
    const trimmedFields = trimFields(fields, setFields);
    const currentErrors = { };

    let key = "product_id";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "product_id is required.";
    else if(await getProductExists(field))
      currentErrors[key] = "product_id is already taken.";

    setErrors(currentErrors);

    key = "product_name";
    let field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Product name is required.";
    else if(field.length > 32)
      currentErrors[key] = "Product name length cannot be greater than 32.";

    key = "product_price";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Product price is required.";
    else if(field.length > 6)
      currentErrors[key] = "Product price length cannot be greater than 6.";

    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
  };

  return (
    <div className="row">
      <div className="col-12 col-md-9">
        <form onSubmit={handleSubmit}>
          <h4 className="mb-3 text-primary">Product Details</h4>
          
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="product_id" className="control-label">Product ID</label>
                <input name="product_id" id="product_id" className="form-control"
                  value={fields.product_id} onChange={handleInputChange} />
                {errors.product_id && <div className="text-danger">{errors.product_id}</div>}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="product_name" className="control-label">Product Name</label>
                <input name="product_name" id="product_name" className="form-control"
                  value={fields.product_name} onChange={handleInputChange} />
                {errors.product_name && <div className="text-danger">{errors.product_name}</div>}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="product_price" className="control-label">Product Price</label>
                <input name="product_price" id="product_price" className="form-control"
                  value={fields.product_price} onChange={handleInputChange} />
                {errors.product_price && <div className="text-danger">{errors.product_price}</div>}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="product_image" className="control-label">Product Image</label>
                <input name="product_image" id="product_image" className="form-control"
                  value={fields.product_image} onChange={handleInputChange} />
                {errors.product_image && <div className="text-danger">{errors.product_image}</div>}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="is_special" className="control-label">Is Special?</label>
                <input name="is_special" id="is_special" className="form-control"
                  value={fields.is_special} onChange={handleInputChange} />
                {errors.is_special && <div className="text-danger">{errors.is_special}</div>}
              </div>
            </div>
            
            <div className="col-12">
              <div className="form-group text-md-right">
                <Link className="btn btn-secondary mr-5" to="/products">Cancel</Link>
                <button type="submit" className="btn btn-success">Create</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
