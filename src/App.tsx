import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import AboutMe from "./pages/AboutMe"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutMe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
