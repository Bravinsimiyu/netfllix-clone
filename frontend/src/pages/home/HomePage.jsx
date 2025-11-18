
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
	const { user } = true;

	return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};
export default HomePage;