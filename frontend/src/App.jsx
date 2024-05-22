import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
import ChatPage from "./pages/ChatPage";
import { SettingsPage } from "./pages/SettingsPage";
import Analytics from "./pages/Analytics";
import TicketsPage from "./pages/TicketsPage";
import CalendarPage from "./pages/CalendarPage";
import QRVerificationPage from "./pages/QRVerificationPage";

function  App() {
	const user = useRecoilValue(userAtom);
	const { pathname } = useLocation();
	return (
		<Box position={"relative"} w='full'>
			<Container maxW={pathname === "/" ? { base: "620px", md: "900px" } : "60vw"}>
				<Header />
				<Routes>
					<Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
					<Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
					<Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />} />

					<Route
						path='/:username'
						element={
							user ? (
								<>
									<UserPage />
									<CreatePost />
								</>
							) : (
								<UserPage />
							)
						}
					/>
					<Route path='/:username/post/:pid' element={<PostPage />} />
					<Route path='/chat' element={user ? <ChatPage /> : <Navigate to={"/auth"} />} />
					<Route path='/settings' element={user ? <SettingsPage /> : <Navigate to={"/auth"} />} />
					<Route path='/analytics' element={user ? <Analytics /> : <Navigate to={"/auth"} />} />
					<Route path='/tickets' element={user ? <TicketsPage /> : <Navigate to={"/auth"} />} />
					<Route path='/calendar' element={user ? <CalendarPage /> : <Navigate to={"/auth"} />} />
					<Route path='/qr-verification' element={user ? <QRVerificationPage /> : <Navigate to={"/auth"} />} />
				</Routes>
			</Container>
		</Box>
	);
}

export default App;
