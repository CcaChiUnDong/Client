import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListBoardComponent from './components/ListBoardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import ReadBoardComponent from './components/ReadBoardComponent';
import LoginComponent from './components/LoginComponent';
// import LandingComponent from './components/LandingComponent';
import RegisterComponent from './components/RegisterComponent';
// import Auth from './hoc/auth';
import MainComponent from './components/MainComponent';

function App() {
    return (
        <div>
            <BrowserRouter>
                <HeaderComponent />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<MainComponent />}></Route>
                        <Route path="/board" element={<ListBoardComponent />}></Route>
                        <Route path="/create-board/:no" element={<CreateBoardComponent />}></Route>
                        <Route path="/read-board/:no" element={<ReadBoardComponent />}></Route>
                        {/* <Route path="/login" element={<Auth(LoginComponent)} /> */}
                        {/* <Route path="/login" element={Auth(<LoginComponent/>,false)} /> */}

                        <Route path="/login" element={<LoginComponent/>} /> 
                        <Route path="/register" element={<RegisterComponent />} />
                    </Routes>
                </div>
                <FooterComponent />
            </BrowserRouter>
        </div>
    );
}

export default App;