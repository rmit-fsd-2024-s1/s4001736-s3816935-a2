import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProduct, updateProduct } from "../data/repository";
import MessageContext from "../contexts/MessageContext";
// import { trimFields } from "../utils";

export default function EditProduct() {
  const navigate = useNavigate();
  const [fields, setFields] = useState(null);
  const [product, setProduct] = useState({}); 
  const [errors, setErrors] = useState({ });
  const { setMessage } = useContext(MessageContext);
  const { product_id } = useParams();

  // Load User.
  useEffect(() => {
    async function loadProduct() {
      const productInfo = await getProduct(product_id);
      setProduct(productInfo); 
      setFields({product_name: product.product_name});
      // setFields(product);
    }
    loadProduct();
  }, [product_id]);

  // Generic change handler.
  const handleInputChange = (event) => {
    // // setFields({ ...fields, [event.target.name]: event.target.value });
    // const name = event.target.name;
    // const value = event.target.value;

    // // Copy fields.
    // const temp = { product_name: fields.product_name};
    // // OR use spread operator.
    // // const temp = { ...fields };

    // // Update field and state.
    // temp[name] = value;
    // setFields(temp);
    setFields(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form and if invalid do not contact API.
    const { trimmedFields, isValid } = handleValidation();
    if(!isValid)
      return;

    // Update product.
    const product = await updateProduct(trimmedFields);

    // Show success message.
    setMessage(<><strong>{product.product_id}</strong> has been updated successfully.</>);

    // Navigate to the products page.
    navigate("/products");
  };

  const handleValidation = () => {
    console.log(fields); 
    const trimmedFields = trimFields(fields, setFields);
    const currentErrors = { };

    let key = "product_name";
    let field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Product name is required.";
    else if(field.length > 100)
      currentErrors[key] = "Length of product name cannot be greater than 100.";

    // key = "product_price";
    // field = trimmedFields[key];
    // if(field.length === 0)
    //   currentErrors[key] = "Product price is required.";
    // else if(field.length > 6)
    //   currentErrors[key] = "Length of product price cannot be greater than 6.";

    setErrors(currentErrors);

    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
  };

  const trimFields = () => {
    const trimmedFields = { };
    Object.keys(fields).map(key => trimmedFields[key] = fields[key].trim());
    // Object.keys(fields).map(key => trimmedFields[key] = trim(fields[key]));
    setFields(trimmedFields);

    return trimmedFields;
  };

  if(fields === null)
    return null;

  return (
    <div className="row">
      <div className="col-12 col-md-9">
        <form onSubmit={handleSubmit}>
          <h4 className="mb-3 text-primary">Product Details</h4>

          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="product_name" className="control-label">Product Name</label>
                <input name="product_name" id="product_name" className="form-control"
                  value={fields} onChange={handleInputChange} />
                {errors.product_name && <div className="text-danger">{errors.product_name}</div>}
              </div>
            </div>

            {/* <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="product_price" className="control-label">Product Price</label>
                <input name="product_price" id="product_price" className="form-control"
                  value={fields.product_price} onChange={handleInputChange} />
                {errors.product_price && <div className="text-danger">{errors.product_price}</div>}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="is_special" className="control-label">Special or not</label>
                <input name="is_special" id="is_special" className="form-control"
                  value={fields.is_special} onChange={handleInputChange} />
                {errors.is_special && <div className="text-danger">{errors.is_special}</div>}
              </div>
            </div> */}

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="product_id" className="control-label">product_id</label>
                {/* <div>
                  <input name="product_id" id="product_id" readOnly className="form-control-plaintext font-weight-bold"
                    value={fields.product_id} />
                </div> */}
              </div>
            </div>
            
            <div className="col-12">
              <div className="form-group text-md-right">
                <Link className="btn btn-secondary mr-5" to="/products">Cancel</Link>
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
