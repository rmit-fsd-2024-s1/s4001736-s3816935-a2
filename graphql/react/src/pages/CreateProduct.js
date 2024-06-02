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
    product_score: ""
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
    const { trimmedFields, isValid } = await handleValidation();
    if(!isValid)
      return;

    // Create product.
    const product = await createProduct(trimmedFields);

    // Show success message.
    setMessage(<><strong>{product.product_id}</strong> has been created successfully.</>);

    // Navigate to the products page.
    navigate("/products");
  };

  const handleValidation = async () => {
    const trimmedFields = trimFields(fields, setFields);
    const currentErrors = { };

    let key = "price";
    let field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Price is required.";
    else if(field.length > 40)
      currentErrors[key] = "Price length cannot be greater than 40.";

    key = "amount";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Amount is required.";
    else if(field.length > 40)
      currentErrors[key] = "Amount length cannot be greater than 40.";

    key = "product_id";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "product_id is required.";
    else if(await getProductExists(field))
      currentErrors[key] = "product_id is already taken.";

    setErrors(currentErrors);

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
                <label htmlFor="price" className="control-label">Price</label>
                <input name="price" id="price" className="form-control"
                  value={fields.price} onChange={handleInputChange} />
                {errors.price && <div className="text-danger">{errors.price}</div>}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="amount" className="control-label">Amount</label>
                <input name="amount" id="amount" className="form-control"
                  value={fields.amount} onChange={handleInputChange} />
                {errors.amount && <div className="text-danger">{errors.amount}</div>}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="product_id" className="control-label">product_id</label>
                <input name="product_id" id="product_id" className="form-control"
                  value={fields.product_id} onChange={handleInputChange} />
                {errors.product_id && <div className="text-danger">{errors.product_id}</div>}
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
