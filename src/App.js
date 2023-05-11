import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from './views/Home';
import Game from './views/Game';
import UserProvider from './components/UserProvider';

function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/game/:roomId" element={<Game />}></Route>
				</Routes>
			</BrowserRouter>
		</UserProvider>
	);
}

export default App;
