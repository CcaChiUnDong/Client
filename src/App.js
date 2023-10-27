import './App.css';
// https://velog.io/@soryeongk/ReactRouterDomV6
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ListBoardComponent from './components/ListBoardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import ReadBoardComponent from './components/ReadBoardComponent';


// https://m.blog.naver.com/rudnfskf2/222181299328
function App() {
    return (
        <div>
            <BrowserRouter>
                <HeaderComponent/>
                <div className="container">
                    <Routes>
                        <Route path = "/" exact element = {<ListBoardComponent/>}></Route>
                        <Route path = "/board" element = {<ListBoardComponent/>}></Route>
                        <Route path = "/create-board/:no" element = {<CreateBoardComponent/>}></Route>
                        <Route path = "/read-board/:no" element = {<ReadBoardComponent/>}></Route>
                    </Routes>
                </div>
                <FooterComponent/>
            </BrowserRouter>
        </div>
    );
}

export default App;