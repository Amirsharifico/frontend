import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [products,setProducts] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const category = props.match.params.type ? props.match.params.type : '';

  useEffect(() => {
    listProducts();
},[category,sortOrder]);

  const listProducts = () => {
    setLoading(true)
    axios.get(
      `/api/products?category=${category}&searchKeyword=${searchKeyword}&sortOrder=${sortOrder}`
    ).then(res => {
      console.log(res)
      setLoading(false)
      setProducts(res.data)
    }).catch(er => {
      console.log(er)
      setLoading(false)
      setError('error happend')
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    listProducts()
 };


  return (
    <>
      {category && <h2>{category}</h2>}

      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button className="search-btn" type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{' '}
          <select name="sortOrder" onChange={e => setSortOrder(e.target.value)}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
      <img width="100%"  src="./nike.jpg" alt=""/>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}>
                  <img
                    className="product-image"
                    src={process.env.PUBLIC_URL +  product.image.replace('/frontend\\public','')}
                    alt="product"
                  />
                </Link>
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">

                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default HomeScreen;
