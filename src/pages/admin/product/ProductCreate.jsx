import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";

const initialState = {
  title: "Macbook Pro",
  description: "This is the best Apple product",
  price: "45000",
  categories: [],
  // category: "",
  // subs: [],
  shipping: "Yes",
  quantity: "50",
  // images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "White",
  brand: "Apple",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);
  
const loadCategories = async () => {
  try {
    const c = await getCategories();
    setValues({ ...values, categories: c });
    return c;
  } catch (error) {
    console.error("Error loading categories:", error);
    // throw error;
  }
};

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(values, user.token);
      window.alert(`"${res.title}" is created`);
      window.location.reload();
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCatagoryChange = async (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, category: e.target.value });
    try {
      const res = await getCategorySubs(e.target.value);
      console.log("SUB OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
    } catch (err) {
      console.log("Error getting category subs", err);
    }
  };

  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <AdminNav />
      </div>

      <div className="col-md-10">
        <h4>Product create</h4>
        <hr />
        <ProductCreateForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          values={values}
          handleCatagoryChange={handleCatagoryChange}
        />
      </div>
    </div>
  </div>
  );
};

export default ProductCreate;
