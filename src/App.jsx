import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import axios from 'axios';
import {HomePage} from './pages/Home/HomePage';
import {Error404} from './pages/Errors/Error404';
import {ContactsPage} from './pages/Static/ContactsPage';
import {About} from "./pages/Static/About";
import {Payment} from "./pages/Static/Payment";
import {Delivery} from "./pages/Static/Delivery";
import {FlowerCare} from "./pages/Static/FlowerCare/FlowerCare";
import {Guarantee} from "./pages/Static/Guarantee";
import {HowOrder} from "./pages/Static/HowOrder";
import {Faq} from "./pages/Static/Faq";
import {Corporate} from "./pages/Static/Corporate";
import {Agreement} from "./pages/Static/Agreement";
import {PolicyPersonalData} from "./pages/Static/PolicyPersonalData";
import {Privacy} from "./pages/Static/Privacy";
import {QualityControl} from "./pages/Static/QualityControl/QualityControl";
import {ReviewsPage} from "./pages/Reviews/ReviewsPage/ReviewsPage";
import {PrivateRoute} from "./utils/PrivateRoute";
import {ReviewForm} from "./pages/Reviews/Forms/ReviewForm.jsx";
import {Login} from "./pages/Auth/Login.jsx";
import {Registration} from "./pages/Auth/Registration.jsx";
import {Unauthorized} from "./pages/Errors/Unauthorized";
import {Loader} from "./components/Loader.jsx";
import {ScrollToTop} from "./utils/ScrollToTop.jsx";
import {ImprovementForm} from "./pages/Reviews/Forms/ImprovementForm.jsx";
import {Toast} from "./utils/Toast.jsx";
import {Profile} from "./pages/Profile/Profile.jsx";
import {AdminWrapper} from "./utils/AdminWrapper.jsx";
import {Categories} from "./pages/Admin/Categories/Categories.jsx";
import {UnapprovedReviews} from "./pages/Admin/Reviews/UnapprovedReviews.jsx";
import {ApprovedReviews} from "./pages/Admin/Reviews/ApprovedReviews.jsx";
import {ApprovedReviewsHomepage} from "./pages/Admin/Reviews/ApprovedReviewsHomepage.jsx";
import {Improvements} from "./pages/Admin/Improvements/Improvements.jsx";
import {MainProducts} from "./pages/Admin/Products/MainProducts/MainProducts.jsx";
import {CreateProduct} from "./pages/Admin/Products/CreateProduct/CreateProduct.jsx";
import {ProductDetails} from "./pages/ProductDetails/ProductDetails.jsx";

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.withCredentials = true;
const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div>
      <Toast/>
      <Loader loading={isLoading}/>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ScrollToTop/>
          <Routes location={location}>
            {/* Основные страницы */}
            <Route path="/" element={<HomePage/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contacts" element={<ContactsPage/>}/>
            <Route path="/payment" element={<Payment/>}/>
            <Route path="/delivery" element={<Delivery/>}/>
            <Route path="/flower-care" element={<FlowerCare/>}/>
            <Route path="/guarantee" element={<Guarantee/>}/>
            <Route path="/how-order" element={<HowOrder/>}/>
            <Route path="/faq" element={<Faq/>}/>
            <Route path="/corporate" element={<Corporate/>}/>
            <Route path="/agreement" element={<Agreement/>}/>
            <Route path="/policy-personal-data" element={<PolicyPersonalData/>}/>
            <Route path="/privacy" element={<Privacy/>}/>
            <Route path="/quality-control" element={<QualityControl/>}/>

            {/*Детальная страница товара*/}
            <Route path="/catalog/:id" element={<ProductDetails/>}/>

            {/* Работа с отзывами */}
            <Route path="/reviews" element={<ReviewsPage/>}/>
            <Route path="/reviews/reviews-form" element={<PrivateRoute><ReviewForm/></PrivateRoute>}/>
            <Route path="/reviews/improvement-form" element={<ImprovementForm/>}/>

            {/* Авторизация, регистрация, профиль и ошибки */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Registration/>}/>
            <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
            <Route path="/unauthorized" element={<Unauthorized/>}/>
            <Route path="*" element={<Error404/>}/>

            {/* Админ панель */}
            <Route path="/admin/*" element={<AdminWrapper/>}>
              <Route path="products/*">
                <Route path="main" element={<MainProducts/>}/>
                <Route path="create" element={<CreateProduct/>}/>
                <Route path="*" element={<Error404/>}/>
              </Route>
              <Route path="categories" element={<Categories/>}/>
              <Route path="reviews/*">
                <Route path="unapproved" element={<UnapprovedReviews/>}/>
                <Route path="approved" element={<ApprovedReviews/>}/>
                <Route path="homepage" element={<ApprovedReviewsHomepage/>}/>
                <Route path="*" element={<Error404/>}/>
              </Route>
              <Route path="improvements" element={<Improvements/>}/>
              <Route path="*" element={<Error404/>}/>
            </Route>

          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
};

export default App;