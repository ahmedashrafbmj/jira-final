import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../components/dashboard/index.js";
import SearchContainer from "../components/sharedComponents/index.js";
import Dnd from "../DND.js";
import YourComponent from "../pin.js";
import Beautiful from "../DNDBeautiful.js";
import DndAssignee from "../DndAssignee.js";

const RouterComponenet = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard2" element={<Dashboard />} />
        <Route path="/search/:searchAssignee" element={<SearchContainer />} />
        <Route path="/Dnd" element={<Dnd />} />
        <Route path="/YourComponent" element={<YourComponent />} />
        <Route path="/Beautiful" element={<Beautiful />} />
        <Route path="/DndAssignee" element={<DndAssignee />} />
       
      </Routes>
    </Router>
  );
};
export default RouterComponenet;
