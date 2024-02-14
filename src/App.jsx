import "./App.css";
import Blogs from "./component/Blogs/Blogs";
import { Route, Routes } from "react-router-dom";
import Main from "./component/Main";
import Home from "./component/Home/Home";
import About from "./component/About/About";
import FAQ from "./component/FAQ/Faq";
import SignIn from "./component/SignIn/SignIn";
import SignUp from "./component/SignUp/SignUp";
import Group from "./component/Group/Group";
import GetGroup from "./component/Group/GetGroup/GetGroup";
import JoinGroup from "./component/Group/JoinGroup/JoinGroup";
import MakeGroup from "./component/Group/MakeGroup/MakeGroup";
import MakeBlog from "./component/Blogs/MakeBlog/MakeBlog";
import Review from "./component/Review/Review";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/join-group" element={<Group />} />
          <Route path="/get-group" element={<GetGroup />} />
          <Route path="/all-joined-group" element={<JoinGroup />} />
        </Route>
        <Route path="/create-review" element={<Review />} />
        <Route path="/create-group" element={<MakeGroup />} />
        <Route path="/upload-blog" element={ <MakeBlog />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
