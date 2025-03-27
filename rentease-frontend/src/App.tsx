import './App.css';
import { SignInForm } from './components/Auth/SignInForm';
import { SignUpForm } from './components/Auth/SignUpForm';
import { UserProfile } from './components/Auth/UserProfile';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated, clearToken } = useAuthStore();

  return (
    <div>
      {!isAuthenticated() ? (
        <>
          <SignUpForm />
          <SignInForm />
        </>
      ) : (
        <>
          <UserProfile />
          <button onClick={clearToken}>Logout</button>
        </>
      )}
    </div>
  );
}

export default App;
