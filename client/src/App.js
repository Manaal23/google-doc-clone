import TextEditor from "./pages/TextEditor/TextEditor"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { v4 as uuidV4 } from "uuid"
import Login from "./pages/Login/Login"
import PrivateGuard from "./Routing/PrivateGuard"
import PrivateRoutes from "./Routing/PrivateRoutes"

function App() {
  return (
    <Router>
      <Route path="/" component = {PrivateRoutes} />
    </Router>
  )
}

export default App
