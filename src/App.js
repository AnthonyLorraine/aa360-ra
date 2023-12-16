import './static/my.css';
import './static/darkMode'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import DateTimeFormats from "./pages/DateTimeFormats"
import Code from "./pages/Code";
import Guides from "./pages/Guides";
import Guide from "./pages/Guide";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path={"date-time-formats"} element={<DateTimeFormats/>}/>
                    <Route path={"guides"} element={<Guides/>}/>
                    <Route path={"guide/:guideName"} element={<Guide/>}/>
                    <Route path={"code-viewer"} element={<Code/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
