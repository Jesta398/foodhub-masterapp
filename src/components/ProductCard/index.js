import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart, setProduct } from './../../redux/Products/products.actions';
import { addProduct } from './../../redux/Cart/cart.actions';
import Button from './../forms/Button';
import './styles.scss';

const mapState = state => ({
  product: state.productsData.product
});

const ProductCard = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productID } = useParams();
  const { product } = useSelector(mapState);

  const {
    productThumbnail,
    productName,
    productPrice,
    productDesc,
  } = product;

  useEffect(() => {
    dispatch(
      fetchProductStart(productID)
    )

    return () => {
      dispatch(
        setProduct({})
      )
    }

  }, []);

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(
      addProduct(product)
    );
    // history.push('/cart');
  }

  const configAddToCartBtn = {
    type: 'button'
  }

  return (
    <div className="productCard">
      <div className="hero">
      <li>
            <h1>
              {productName}
            </h1>
          </li>
        <img src={productThumbnail} />
      </div>
      <div className="productDetails">
        <ul>
         
          <li>
            <span>
            The ultimate comfort food your entire family will love! Make the best flavour-packed, creamy and delicious Indian butter chicken at home with this easy recipe. Serve it with Butter naan, Roti, Paratha, Steamed basmati rice or Jeera rice for a simple Indian meal. There are numerous versions to make Butter chicken recipe. In this post I share the recipe to make the authentic North Indian version known as Murgh Makhani
            </span>
          </li>
          
          <li>
            <span>
            Cost:{productPrice}
            </span>
          </li>
          <li>
            <div className="addToCart">
              <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
                Add to cart
              </Button>
            </div>
          </li>
          {/* <li>
            <span
              className="desc"
              dangerouslySetInnerHTML={{ __html: productDesc }} />
          </li> */}
        </ul>
      </div>  
    </div>
  );
}

export default ProductCard;
