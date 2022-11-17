import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartContainer } from "./components/CartContainer";
import { Modal } from "./components/Modal";
import { Navbar } from "./components/Navbar";
import { calculateTotal, getCartItems } from "./features/cart/cartSlice";

function App() {
  const {cartItems,isLoading} = useSelector((store)=> store.cart);
  const {isOpen} = useSelector(store=> store.modal)
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(calculateTotal());
  }, [cartItems])
  useEffect(()=>{
    dispatch(getCartItems());
  },[])

  return (
    <main>
      {isOpen && <Modal/>}
      <Navbar />
      {isLoading ? (<div className="loading"><h3>...Loading</h3></div>): null}
      <CartContainer />
    </main>
  );
}
export default App;
