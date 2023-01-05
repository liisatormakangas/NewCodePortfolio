import { Routes, Route } from "react-router-dom";

import Header from './components/Header.js'
import LandingPage from './views/LandingPage.js'
import AnswerSurvey from './views/AnswerSurvey.js'
import CreateSurvey from './views/CreateSurvey.js'
import Results from './views/Results.js'
import Footer from './components/Footer.js'

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/answer" element={<AnswerSurvey />} />
          <Route path="/results" element={<Results />} />
          <Route path="/create" element={<CreateSurvey />} />
        </Routes>
        <Footer />
    </>

  );
}
export default App;
