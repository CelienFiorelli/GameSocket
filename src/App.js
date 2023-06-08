import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from './views/Home';
import RoomContainer from './views/RoomContainer';
import SocketProvider from './components/SocketProvider';
import UserProvider from './components/UserProvider';
import RoomHome from './components/RoomHome';
import RoomGame from './components/RoomGame';

function App() {
	document.body.style.backgroundColor = "black";
	document.body.style.color = "white";
	return (
		<UserProvider>
			<SocketProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" Component={Home}></Route>
						<Route path="/room/:roomId" element={
							<RoomContainer>
								<RoomHome/>
							</RoomContainer>
						}/>
						<Route path="/game/:gameType/:roomId" element={
							<RoomContainer>
								<RoomGame/>
							</RoomContainer>
						}/>
					</Routes>
				</BrowserRouter>
			</SocketProvider>
		</UserProvider>
	);
}

export default App;
