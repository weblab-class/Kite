import { useGoogleLogin } from '@react-oauth/google';
import { post } from "../utilities";

function Login() {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google login success, token:", tokenResponse);
      
      try {
        const userResponse = await post("/api/login", { 
          token: tokenResponse.access_token 
        });
        console.log("Server login response:", userResponse);
        
        // Verify the user was set in the response
        if (userResponse.user) {
          console.log("Login successful, user:", userResponse.user);
        } else {
          console.error("No user in response");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    onError: error => console.error("Login Failed:", error)
  });

  return (
    <button onClick={() => login()}>
      Sign in with Google
    </button>
  );
}

export default Login; 