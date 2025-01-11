import React from "react";
import { Routes, Route } from "react-router-dom";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import "./api/axiosDefault";
import styles from "../src/App.module.css";
import Container from "react-bootstrap/Container";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import LogInForm from "./pages/auth/LogInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import GeneralPostsPage from "./pages/posts/GeneralPostsPage";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import PageNotFound from "./components/PageNotFound";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={`${styles.App} psychic`}>
      <NavBar />
      <Container className={styles.Main}>
        {!currentUser ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <GeneralPostsPage message="No results found, try another keyword or tag?" />
              }
            />
            <Route
              path="/feed"
              element={
                <GeneralPostsPage
                  message="No results found, try another keyword or follow someone."
                  filter={`owner__followed__owner__profile=${profile_id}&`}
                />
              }
            />
            <Route
              path="/liked"
              element={
                <GeneralPostsPage
                  message="No results found, try another keyword or like a post."
                  filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                />
              }
            />
            <Route path="/posts/create" element={<PostCreateForm />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/posts/:id/edit" element={<PostEditForm />} />
            <Route path="/profiles/:id" element={<ProfilePage />} />
            <Route path="/profiles/:id/edit/password" element={<UserPasswordForm />} />
            <Route path="/profiles/:id/edit" element={<ProfileEditForm />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )}
      </Container>
    </div>
  );
}

export default App;