import {useState} from "react";
import ProductList from "./components/ProductList.tsx";
import Cart from "./components/Cart.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

function App() {
    const[viewCart, setViewCart] = useState<boolean>(false)

    const pageContent = viewCart ? <Cart /> : <ProductList />

    const content = (
        <>
            <Header viewCart={viewCart} setViewCart={setViewCart} />
            {pageContent}
            <Footer viewCart={viewCart} />
        </>
    )

    return content
}

export default App
