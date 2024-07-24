import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import JobList from "./components/JobList";
import AdminPanel from "./components/AdminPanel";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
