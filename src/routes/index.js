import { Route, Routes } from "react-router-dom";


import Home from '../pages/Home'
import Registration from '../pages/Registration'
import Thanks from "../pages/Thanks";

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} ></Route>
            <Route path="/thanks" element={<Thanks />} />
        </Routes>
    )
}

export default RoutesApp;