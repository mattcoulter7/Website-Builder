import Navbar from '../components/Navbar'

export default ({ children }) => {
    return (
        <>
            <Navbar />
            <main>
                <div className="container">
                    {children}
                </div>
            </main>
        </>
    )
}