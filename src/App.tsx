import { Route, Routes } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";

function App() {


    return (
        <>
            <Routes>
                <Route path="/" element={<ProductList/>} />
                <Route path="/Add" element={<AddProduct/>}/>
                <Route path="/Edit/:id" element={<EditProduct/>}/>
            </Routes>
        </>
    );
}

export default App;
