import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from './views/Home';
import Game from './views/Game';
import SocketProvider from './components/SocketProvider';
import UserProvider from './components/UserProvider';

function App() {
	document.body.style.backgroundColor = "black";
	document.body.style.color = "white";
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" Component={Home}></Route>
				<Route path="/game/:roomId" element={
					<UserProvider>
						<SocketProvider>
							<Game />
						</SocketProvider>
					</UserProvider>
				}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
