import { useAuth } from "oidc-react";
import MainLayout from "./MainLayout";

function OAuthWrapper() {
	const auth = useAuth();

	return <MainLayout auth={auth} />;
}

export default OAuthWrapper;
