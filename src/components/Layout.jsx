import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div className="layout">
                {children}
            </div>
        </>
    );
}

export default Layout;
