import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer, Header } from "./components";
import {
  AddBlogs,
  EditBlog,
  BlogDetails,
  AllBlogsTable,
  LoginPage,
  SigninPage,
  FacePage,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";
import { authAction } from "./redux/manageUser";

function App() {
  const newUser = useSelector((state) => state.authManager.user);
  const dispatch = useDispatch();
  const user = Cookie.get("blogger");

  useEffect(() => {
    if (user) {
      const userName = JSON.parse(user).name;
      toast.success(`Hi ${userName}`);

      dispatch(authAction.defineUser(JSON.parse(user)));
    }
  }, [user]);

  return (
    <BrowserRouter>
      <div className="app_bg w-full overflow-hidden bg-no-repeat bg-cover min-h-screen f-c-between">
        <header className="w-full h-auto sticky z-[500]">
          <Header />
          <ToastContainer position="top-center" autoClose={3000} />
        </header>

        <main className="min-h-[600px] h-full">
          <Routes>
            <Route
              path="/"
              element={
                newUser ? (
                  <AllBlogsTable user={newUser} type="ME" />
                ) : (
                  <FacePage />
                )
              }
            />
            <Route path="/:id" element={<BlogDetails />} />
            <Route path="/:id/edit" element={<EditBlog type="EDIT" />} />
            <Route path="/create" element={<AddBlogs type="ADD" />} />
            <Route
              path="/my-blogs"
              element={<AllBlogsTable user={newUser} type="ALL" />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signin" element={<SigninPage />} />
          </Routes>
        </main>

        <footer className="mt-auto">
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
