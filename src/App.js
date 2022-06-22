import React from 'react'

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { DotWave } from '@uiball/loaders'

import Navbar from './Components/Navbar'
import Aside from "./Components/Aside"
import Home from "./Components/Home" 
import Article from './Components/Article';
import Footer from "./Components/Footer"
import Impressum from './Components/Impressum';
import Datenschutz from './Components/Datenschutz';

export default function App () {

    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
            function handleLoading() {
                setLoading(false)
            }
            setTimeout(handleLoading, 1000)
        }, [])

    return (
        loading ?
        <div className='loading'>
           <DotWave size={70} speed={1} color="#D9534F" />
        </div>:
        <Router>
            <div className='app'>
                <Navbar />
                <Aside />
                <div className='container--routes'>
                    <Routes>
                        <Route index 
                            element={<Home />} />
                        <Route path="article/:articleIndex" 
                            element={<Article />}  />
                        <Route path="/impressum" 
                            element={<Impressum />} />
                        <Route path="datenschutz" 
                            element={<Datenschutz />}/>
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    )
}
