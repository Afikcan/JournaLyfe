import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import theme from "./theme";

import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pricing from "./pages/Pricing";
import CreateJournal from "./pages/CreateJournal";
import ImageUpload from "./pages/ImageUpload";
import MyJournal from "./pages/MyJournal";
import Blog from "./pages/Blog";

/*


*/
function App() {
  const dispatch = useDispatch();

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/createJournal" element={<CreateJournal />} />
          <Route path="/imageUpload" element={<ImageUpload />} />
          <Route path="/myJournal" element={<MyJournal />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
