// https://reactrouter.com/en/main/start/tutorial
// https://reactrouter.com/en/main/components/outlet
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import "./App.css";
import Footer from './Components/Footer';

function App() {

    return (
        <div id='app'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}
export default App;