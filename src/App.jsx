import { Route, Routes } from "react-router-dom";
import RateChickens from "./pages/RateChickens";
import SubmitChicken from "./pages/SubmitChicken";
import ViewChickens from "./pages/ViewChickens";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RateChickens />} />
      <Route path="/submit" element={<SubmitChicken />} />
      <Route path="/view" element={<ViewChickens />} />
    </Routes>
  );
}

export default App;
