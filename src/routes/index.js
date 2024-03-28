import { Route, Routes } from "react-router-dom";


import Home from '../pages/Home'
import Registration from '../pages/Registration'

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} ></Route>
        </Routes>
    )
}

export default RoutesApp;