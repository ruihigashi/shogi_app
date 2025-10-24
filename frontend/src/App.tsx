import { Routes, Route } from "react-router"
import { SettingPage } from "./pages/SettingPage"
import { ShogiBattlePage } from "./pages/ShogiBattlePage"
import { MainPage } from "./pages/MainPage"

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/battle" element={<ShogiBattlePage />}/>
      </Routes>
    </div>
  )
}
