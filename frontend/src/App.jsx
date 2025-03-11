import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegistrationForm';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';

//const HomePage = () => <h1>Home Page</h1>;

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/buy" element={<SearchPage />} />
        <Route path="/rent" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;