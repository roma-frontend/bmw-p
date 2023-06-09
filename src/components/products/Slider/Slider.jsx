import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTrail, useSpring, animated } from "react-spring";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import {
  setProducts,
  updateProduct,
  deleteProduct,
  addFavoriteProduct,
  removeFavoriteProduct,
} from "../../../store/slice/products.slice";
import { setLoader } from "../../../store/slice/global.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  productsApi,
  updateProductApi,
  deleteProductApi,
} from "../../../api/products";
import "./Slider.scss";
import { setActiveProduct } from "../../../store/slice/active.slice";
import Modal from "../dialog/Dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoriteProducts from "../favorites/FavoriteProducts";

const Slideshow = React.memo(() => {
  const favoriteProducts = useSelector((state) => state.products.favoriteProducts);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [openFavorites, setOpenFavorites] = useState(false); 
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    (async () => {
      const res = await productsApi();
      dispatch(setProducts(res.data.data));
    })();
  }, [dispatch]);

  const toggleLike = useCallback(async (id, isLiked) => {
    try {
      dispatch(setLoader(true));
      const products = useSelector((state) => state.products.products);
      const product = products.find((product) => product.id === id);
      const updatedProduct = { ...product, is_favorite: isLiked };
      await updateProductApi(id, updatedProduct);
      dispatch(updateProduct({ id, key: "is_favorite", value: isLiked }));
      if (isLiked) {
        dispatch(addFavoriteProduct(updatedProduct));
        toast.success("Product added to favorites");
      } else {
        dispatch(removeFavoriteProduct(id));
        toast.success("Product removed from favorites");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoader(false));
    }
  }, [dispatch]);

  const trail = useTrail(products.length, {
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { duration: 500 },
  });

  const swiperAnimationProps = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { duration: 500 },
  });

  const handleClickEye = useCallback((product) => {
    setSelectedProduct(product);
    dispatch(setActiveProduct(product));
    setOpenModal(true);
  }, [dispatch]);
  
  const handleDelete = useCallback((id) => {
    setDeleteProductId(id);
    setOpenConfirmModal(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    try {
      dispatch(setLoader(true));
      await deleteProductApi(deleteProductId);
      dispatch(deleteProduct(deleteProductId));
      toast.success("Successfully deleted ");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoader(false));
      setOpenConfirmModal(false);
    }
  }, [deleteProductId, dispatch]);

  return (
    <>
      <div className="products-wrapper">
        {products &&
          products.length > 0 &&
          trail.map((animationProps, index) => (
            <animated.div
              key={products[index].id}
              className="one-product"
              style={animationProps}
            >
              <div className={"images"}>
                <animated.div style={swiperAnimationProps}>
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{
                      type: "fraction",
                    }}
                    navigation={true}
                  >
                    {products[index].images.map((image) => (
                      <SwiperSlide key={image.md}>
                        <animated.div
                          className="one-slide"
                          style={animationProps}
                        >
                          <div className="icons">
                            <FontAwesomeIcon
                              className={`eye ${
                                products[index].is_favorite ? "active" : ""
                              }`}
                              icon={faEye}
                              onClick={() => {
                                handleClickEye(products[index]);
                              }}
                            />
                            <FontAwesomeIcon
                              className="heart"
                              icon={faHeart}
                              color={products[index].is_favorite ? "red" : null}
                              onClick={() =>
                                toggleLike(
                                  products[index].id,
                                  !products[index].is_favorite
                                )
                              }
                            />
                            <FontAwesomeIcon
                              className="delete"
                              icon={faTrash}
                              onClick={() => handleDelete(products[index].id)}
                            />
                          </div>
                          <img
                            src={image.md}
                            alt={products[index].name}
                            style={{ maxWidth: "100%" }}
                          />
                        </animated.div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </animated.div>
              </div>
            </animated.div>
          ))}
        {selectedProduct && (
          <Modal
            onClose={() => setOpenModal(false)}
            open={openModal}
            selectedProduct={selectedProduct}
          />
        )}
        {openFavorites && <FavoriteProducts favoriteProducts={favoriteProducts} onClose={() => setOpenFavorites(false)} />} {}
      </div>
      <Dialog
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <p>Do you really want to delete this product?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmModal(false)}>No</Button>
          <Button onClick={confirmDelete} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
});

Slideshow.displayName = 'Slideshow';

export default Slideshow;