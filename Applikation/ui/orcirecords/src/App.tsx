import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardTemplate from "./components/templates/HomepageTemplate";
import Songs from "./components/pages/Songs";
import Playlists from "./components/pages/Playlists";
import Login from "./components/pages/Login";
import Homepage from "./components/pages/Homepage";
import Artists from "./components/pages/Artists";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import Genres from "./components/pages/Genres";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardTemplate />}>
              <Route path="homepage" element={<Homepage />} />
              <Route path="songs" element={<Songs />} />
              <Route path="playlists" element={<Playlists />} />
              <Route path="artists" element={<Artists />} />
              <Route path="genres" element={<Genres />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
