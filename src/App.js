import './static/my.css';
import './static/darkMode'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import DateTimeFormats from "./pages/DateTimeFormats"

function App() {
    return (
       <BrowserRouter>
           <Routes>
               <Route path={"/"} element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path={"date-time-formats"} element={<DateTimeFormats />}/>
               </Route>
           </Routes>
       </BrowserRouter>
    );
}

export default App;
