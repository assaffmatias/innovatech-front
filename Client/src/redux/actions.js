import axios from 'axios';
export const BASE_URL = 'http://localhost:80';
export const GET_ORDER = 'GET_ORDER'
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const FILTER_BY_MODEL = 'FILTER_BY_MODEL';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const CLEAN_PRODUCT_BY_ID = 'CLEAN_PRODUCT_BY_ID';
export const GET_PRODUCTS_BY_CATEGORIES = 'GET_PRODUCTS_BY_CATEGORIES';
/* Types para el form */
export const LOGOUT = 'LOGOUT';
export const INJECT_USER = 'INJECT_USER';
export const CHANGE_FORM = 'CHANGE_FORM';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'
/* Type para la pasarela */
export const PAYMENT_ID = 'PAYMENT_ID';
/* Types para el carrito */
export const ADD_TO_CART = 'ADD_TO_CART';
export const INJECT_CART_DATA = 'INJECT_CART_DATA'
export const SHOW_SHOPPING_CART = 'SHOW_SHOPPING_CART';
export const REMOVE_ONE_FROM_CART = 'REMOVE_ONE_FROM_CART';
export const REMOVE_ALL_FROM_CART = 'REMOVE_ALL_FROM_CART,';
export const GET_ALL_USERS = 'GET_ALL_USERS'
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_USER_BY_NAME = 'GET_USER_BY_NAME';
/* Types para rating */
export const GET_RATING = 'GET_RATING';
export const CREATE_RATING = 'CREATE_RATING';
export const UPDATE_RATINGS = 'UPDATE_RATINGS';
export const RATING_MESSAGE_ERROR = 'RATING_MESSAGE_ERROR';
export const RATING_MESSAGE_APPROVE = 'RATING_MESSAGE_APPROVE';
export const CLEAN_RATINGS = 'CLEAN_RATINGS';
export const SHOW_FORM_RATING = 'SHOW_FORM_RATING';
export const CLEAN_MESSAGES_RATING = 'CLEAN_MESSAGES_RATING';
export const GET_ALL_SOLDS = 'GET_ALL_SOLDS';
export const GET_USER_SOLDS = 'GET_USER_SOLDS';

const localhost = 'http://localhost:80'
const deploy = 'https://innovatech-back-production.up.railway.app'



export const getUserSolds = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${deploy}/cart/${id}`)
      
      dispatch({ type: GET_USER_SOLDS, payload: response.data })
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}

export const cleanMessagesRating = () => {
  return{
    type: CLEAN_MESSAGES_RATING,
    payload: ''
  }
}



export const getAllSolds = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${deploy}/cart`)
      dispatch({ type: GET_ALL_SOLDS, payload: response.data })
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}

export const showFormRating = () => {
  return{
    type: SHOW_FORM_RATING,
    payload: true
  }
}
export const toggleUser = (id) => {
  return async function () {
    try {
      const response = await axios.post(`${deploy}/user`, {id: id})
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}


export const getUserByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${deploy}/get/user/${name}`)
      // const response = await axios.get(`https://innovatech-back-production.up.railway.app/get/user/${name}`)
      console.log(response.data);
      dispatch({ type: GET_USER_BY_NAME, payload: response.data })
    } catch (error) {
      console.log(error);
    }
  }
}


export const deleteProduct = (id) => {
  return async function () {
    try {
      await axios.delete(`${deploy}/products/${id}`)
      // await axios.delete(`https://innovatech-back-production.up.railway.app/${id}`)
    } catch (error) {
      console.log(error);
    }
  }
}


export const getAllProducts = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${deploy}/products?actives=true`)
      // const response = await axios.get('https://innovatech-back-production.up.railway.app/products?actives=true')
      dispatch({ type: GET_ALL_PRODUCTS, payload: response.data.data })
    } catch (error) {
      console.log(error);
    }
  };
};


export const toggleProduct = (id) => {
  return async function () {
    try {
      await axios.post(`${deploy}/products/toggle?id=${id}`)
      // const response = await axios.post(`https://innovatech-back-production.up.railway.app/products/toggle?id=${id}`)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}


export const getAllUsers = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${deploy}/users`)
      // const response = await axios.get("https://innovatech-back-production.up.railway.app/users")
      dispatch({ type: GET_ALL_USERS, payload: response.data })
    } catch (error) {
      console.log(error);
    }
  }
}


export const getRating = (id) => {
  return async function (dispatch){
    try{
      const { data } = await axios.get(`${deploy}/get-rating/`, { params: { productId: id }});
      return dispatch({
        type: GET_RATING,
        payload: data
      })
    }catch(err){   
      console.log(err)        
    }
  }
}
export const createRating = ({ productId, rating, commentary }, {id}) => {
  return async function (dispatch) {
    try{
      const ratingCreated = await axios.post(`${deploy}/create-rating`, {
        userId: id,
        productId,
        rating,
        commentary,
      })
      if(ratingCreated){
        return dispatch({
          type: UPDATE_RATINGS,
          payload: ratingCreated.data
        })
      }
    }catch(err){
      return dispatch({
        type: RATING_MESSAGE_ERROR,
        payload: 'An error occurred while submitting the review'
      })
    }
  }
} 
export const cleanRatings = () => {
  return{
    type: CLEAN_RATINGS,
    payload: []
  }
}
export const showShoppingCart = (data) => {
  return {
    type: SHOW_SHOPPING_CART,
    payload: data
  }
}

export const injectUser = (data) => {
  return {
    type: INJECT_USER,
    payload: data
  }
}

export const logout = () => {
  window.localStorage.setItem('user', JSON.stringify(null))
  return {
    type: LOGOUT,
  }

};

export function paymentGateway(cart,email) {
  console.log(`user email: ${email}`);
  return async function (dispatch) {
    try {

      const items = cart.map((prod) => ({
        title: prod.model,
        price: parseFloat(prod.price),
        quantity: parseInt(prod.quantity),
        productId:prod.id,
      }));

      const total = cart.map((prod) => prod.total)
      let totalPrice = 0;

      for (let i = 0; i < total.length; i++) {
        totalPrice += total[i];
      }

      const valueLocal = JSON.parse(localStorage.getItem("user"))

      const cartDB = {
        idUserLocal: valueLocal.id,
        cartItems: cart.map((prod) => ({
          name: prod.model,
          productId: prod.id,
          price: parseFloat(prod.price),
          quantity: parseInt(prod.quantity),
        })),
        total: totalPrice,
        paymentMethod: "mercadopago"
      }


      // const postCart = axios.post("http://localhost:80/cart", cartDB)
      const postCart = axios.post(`${deploy}/cart`, cartDB)

      // const response = await axios.post("http://localhost:80/create_preference", {
      const response = await axios.post(`${deploy}/create_preference`, {
        items: items,
        total: totalPrice,
        email: email
      })

      const { id } = response.data;
      dispatch({ type: PAYMENT_ID, payload: id })
      window.localStorage.removeItem('cart')
    } catch (error) {
      console.log(error);
    }
  }
}
export function getInfoGithub(codigoGithub) {
  return async function (dispatch) {
    try {
      // const response = await axios.get("http://localhost:80/get/github/" + codigoGithub)
      const response = await axios.get(`${deploy}/get/github/` + codigoGithub)
      console.log(response.data);
      window.localStorage.setItem('user', JSON.stringify(response.data))
      dispatch({ type: "GET_INFO_GITHUB", payload: response.data })
    } catch (error) {
      console.log(error);
    }
  }
}

export function getInfoGoogle(codigoGoogle) {
  return async function (dispatch) {
    try {
      // const response = await axios.get("http://localhost:80/get/google/" + codigoGoogle)
      const response = await axios.get(`${deploy}/get/google/` + codigoGoogle)
      // console.log(response.data);
      window.localStorage.setItem('user', JSON.stringify(response.data))
      dispatch({ type: "GET_INFO_GOOGLE", payload: response.data })
    } catch (error) {
      console.log(error);
    }
  }
}

// const { data } = await axios.post('https://innovatech-back-production.up.railway.app/api/signin', { email, password });
// const response = await axios.post('https://innovatech-back-production.up.railway.app/api/signup', { name, email, password });
export const LoginAction = ({ email, password }) => {
  return async (dispatch) => {
    try {
       const { data } = await axios.post(`${deploy}/api/signin`, { email, password });
      window.localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: SIGN_IN_SUCCESS, payload: data });
      swal("You have been logged in", "Welcome back!", "success");
    } catch (error) {
      dispatch({ type: SIGN_IN_FAILURE, payload: error });
      swal("Authentication failed", "Invalid email or password", "error");
    }
  };
}; 

export const signUpAction = ({ name, email, password }) => {
  return async (dispatch) => {
    try {
       const response = await axios.post(`${deploy}/api/signup`, { name, email, password });
      dispatch({ type: SIGN_UP_SUCCESS, payload: response.data });
      swal("User registered", "Welcome to our platform!", "success");
    } catch (error) {
      dispatch({ type: SIGN_UP_FAILURE, payload: error });
      swal("Signup Failed", "Please check your information and try again", "error");
    }
  };
};
export function changeForm(formType) {
  return {
    type: CHANGE_FORM,
    payload: formType
  };
}

export function postForm(payload) {
  return async function () {
    try {
      const response = await axios.post(`${deploy}/create`, payload);
      // const response = await axios.post("https://innovatech-back-production.up.railway.app/create", payload);

      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export const getProductsByCategories = (category, order, page, items) => {
  return async function (dispatch) {
    try {
      let url = `${deploy}/products`;
      // let url = "https://innovatech-back-production.up.railway.app/products";
      if (category || order || page || items) {
        url += "?";
        if (category) url += `category=${category}&`;
        if (order) url += `order=${order}&`;
        if (page) url += `page=${page}&`;
        if (items) url += `items=${items}&`;
        url = url.replace(/&$/, "");
      }
      console.log("URL:", url);
      const productsData = await axios.get(url);
      const products = productsData.data.data;
      console.log("melina", products);
      dispatch({
        type: GET_PRODUCTS_BY_CATEGORIES,
        payload: products,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProducts = (
  category,
  order,
  page = "1",
  items = "6",
  model
) => {
  return async function (dispatch) {
    try {
      let url = `${deploy}/products`;
      // let url = "https://innovatech-back-production.up.railway.app/products";
      if (category || order || page || items) {
        url += "?";
        if (category) url += `category=${category}&`;
        if (order) url += `order=${order}&`;
        if (page) url += `page=${page}&`;
        if (items) url += `items=${items}&`;
        if (model) url += `model=${model}&`;

        url = url.replace(/&$/, "");
      }
      console.log("URL:", url);
      const productsData = await axios.get(url);
      const products = productsData.data.data;
      console.log(products)

      // console.log("Products:", products);
      dispatch({ type: "TOTAL_PAGES", payload: productsData.data.totalPages });
      dispatch({
        type: GET_PRODUCTS,
        payload: products,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCategories = (categories) => {
  return {
    type: GET_CATEGORIES,
    payload: categories,
  };
};

export const getOrder = (order) => {
  return {
    type: GET_ORDER,
    payload: order,
  };
};

export const getProductById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${deploy}/products/${id}`);
      // const { data } = await axios.get(`https://innovatech-back-production.up.railway.app/products/${id}`);
      return dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const cleanProductById = () => {
  return {
    type: CLEAN_PRODUCT_BY_ID,
    payload: {},
  };
};
export const filterByModel = (model) => {
  console.log(model);
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${deploy}/model?model=${model}`
      );
      // const { data } = await axios.get(
      //   `https://innovatech-back-production.up.railway.app/model?model=${model}`
      // );
      console.log(data);
      return dispatch({
        type: FILTER_BY_MODEL,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToCart = (id) => {
  console.log('add to cart', id)
  return {
    type: ADD_TO_CART,
    payload: id
  }
}
export const removeOneFromCart = (id) => {
  console.log('remove one to cart', id)
  return {
    type: REMOVE_ONE_FROM_CART,
    payload: id
  }
}

export const removeFromCart = (id) => {
  console.log(id)
  return {
    type: REMOVE_ALL_FROM_CART,
    payload: id
  }
}
export const injectCartData = (data) => {
  return {
    type: INJECT_CART_DATA,
    payload: data
  }
}