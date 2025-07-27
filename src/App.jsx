import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlashcardSection from "./components/FlashcardSection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/flashcards" element={<FlashcardSection />} />
        {/* Add other sections here */}
      </Routes>
    </Router>
  );
}

export default App;
