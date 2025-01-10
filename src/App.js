import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.module.css';
import NavBar from "./components/NavBar";
import LogInForm from "./pages/auth/LogInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import HomePage from "./components/HomePage";
import ProfilePage from "./pages/profiles/ProfilePage";
import PopularProfiles from "./pages/profiles/PopularProfiles";
import Profiles from "./pages/profiles/Profile";
import { DropdownMenu } from "./components/DropdownMenu";
import Toolbar from "./components/Toolbar";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import './api/axiosDefault';

// Placeholder Components for Routes
const CreatePost = () => <div>Create Post Page</div>;

function App() {
  return (
    <div className="App">
      <Router>
        <CurrentUserProvider>
          <NavBar />
          <DropdownMenu />
          <Toolbar />
          <ScrollToTopButton />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profiles/:id" element={<ProfilePage />} />
            <Route path="/popular-profiles" element={<PopularProfiles />} />
            <Route path="/dj-rest-auth/login" element={<LogInForm />} />
            <Route path="/dj-rest-auth/registration" element={<SignUpForm />} />
          </Routes>
        </CurrentUserProvider>
      </Router>
    </div>
  );
}

export default App;
