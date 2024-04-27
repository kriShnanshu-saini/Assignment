import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "./components/PostList";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<PostList />} />

          {/* Add additional routes for other views */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
