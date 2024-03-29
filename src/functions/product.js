import axios from "axios";

export const createProduct = async (product, authtoken) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API}/product`, product, {
      headers: {
        authtoken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating category', error);
    throw error;
  }
}


export const getProductsByCount = async (count) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch products: ${error}`);
    throw error;
  }
};

export const removeProduct = async (slug, authtoken) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
      headers: {
        authtoken,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to remove product: ${error}`);
    throw error;
  }
};

export const getProduct = async (slug) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product: ${error}`);
    throw error;
  }
};

export const updateProduct = async (slug, product, authtoken) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
      headers: {
        authtoken,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProducts = async (sort, order, page) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API}/products`, {
      sort,
      order,
      page,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductsCount = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/products/total`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const productStar = async (productId, star, authtoken) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API}/product/star/${productId}`,
      { star },
      {
        headers: {
          authtoken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRelated = async (productId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // re-throw the error so it can be caught and handled by the calling function
  }
};

export const fetchProductsByFilter = async(arg) => {
  try {
    const response =  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}