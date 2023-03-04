import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from "./Payment";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promiseStripe = loadStripe(
  "pk_test_51MVeMZSAzZSq3i8LJtnq1fOT7hZIG5Pvh9wTZi6l6cha2mtZ4KCQAIKsVHavsUjSmktJlPw8ECL4uHKH9DNrrWSi00GMI3qg92"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //it is only going to run onces
    auth.onAuthStateChanged((authUser) => {
      console.log("the User is >>>>>>", authUser);
      if (authUser) {
        //The User just Logged In/Or the User was Logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //User is logged out

        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/orders"
          element={
            <div>
              <Header />
              <Orders />
            </div>
          }
        ></Route>
        <Route
          path="/payment"
          element={
            <div>
              <Header />
              <Elements stripe={promiseStripe}>
                <Payment />
              </Elements>
            </div>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <div>
              <Header /> <Login />
            </div>
          }
        ></Route>
        <Route
          path="/checkout"
          element={
            <div>
              <Header /> <Checkout />
            </div>
          }
        ></Route>
        <Route
          path="/"
          element={
            <div>
              <Header /> <Home />
            </div>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
