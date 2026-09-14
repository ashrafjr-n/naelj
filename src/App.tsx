import { useCallback, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Loader from "./components/Loader"
import Home from "./pages/Home"
import AboutMe from "./pages/AboutMe"
import Contact from "./pages/Contact"

function App() {
  const [loading, setLoading] = useState(true)
  const hideLoader = useCallback(() => setLoading(false), [])

  return (
    <BrowserRouter>
      {loading && <Loader onDone={hideLoader} />}
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutMe />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
