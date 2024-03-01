import "./App.css";
import Footer from "./layout/footer";
import Header from "./layout/header";
import Createpost from "./pages/Createpost";
import Seepost from "./pages/Seepost";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Listpost from "./pages/ListPost";
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
    <div className="container-fluid">
      <Header />
      <section style={{margin:"10px 0 10px 0"}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<Createpost />} />
          <Route path="/editpost/:id" element={<Createpost />} />
          <Route path="/seepost/:id" element={<Seepost />} />
          <Route path="/listpost" element={<Listpost />} />
        </Routes>
      </section>
      <Footer />
    </div>
  </BrowserRouter>
  );
}

export default App;
