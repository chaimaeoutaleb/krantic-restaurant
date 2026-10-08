import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./Components/Navbar";
import AboutRestaurant from "./Components/AboutRestaurant";
import OpeningHoursBooking from "./Components/OpeningHoursBooking";
import SpecialsMenu from "./Components/SpecialsMenu";
import VideoSection from "./Components/VideoSection";
import KranticFooter from "./Components/KranticFooter";
import KranticAboutPage from "./Pages/KranticAboutPage";
import ContactPage from "./Pages/ContactPage";
import MenuPage from "./Pages/MenuPage";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <AboutRestaurant />
                <OpeningHoursBooking />
                <SpecialsMenu />
                <VideoSection />
                <KranticFooter />
              </>
            }
          ></Route>
          <Route path="/about" element={<KranticAboutPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
          <Route path="/menu" element={<MenuPage />}></Route>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
