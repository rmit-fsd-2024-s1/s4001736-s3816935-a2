import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./fragments/Navbar";
import Footer from "./fragments/Footer";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import MessageContext from "./contexts/MessageContext";

export default function App() {
  const [message, setMessage] = useState(null);

  // Set message to null automatically after a period of time.
  useEffect(() => {
    if(message === null)
      return;

    const id = setTimeout(() => setMessage(null), 5000);

    // When message changes clear the queued timeout function.
    return () => clearTimeout(id);
  }, [message]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <MessageContext.Provider value={{ message, setMessage }}>
        <Router>
          <Navbar />
          <main role="main">
            <div className="container my-3">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users/" element={<Users />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/create" element={<CreateProduct />} />
                <Route path="/products/edit/:product_id" element={<EditProduct />} /> 
              </Routes>
            </div>
          </main>
          <Footer />
        </Router>
      </MessageContext.Provider>
    </div>
  );
}
