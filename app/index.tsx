import { useState
 } from 'react';
import { StatusBar,
   StyleSheet } from 'react-native';
import { SafeAreaProvider,
   SafeAreaView } from 'react-native-safe-area-context';
import LoginScreen from './LoginScreen';
import MainFeed from './MainFeed';
import RegisterScreen from './RegisterScreen';
import { RegisteredUser } from './types/auth';

export default function App() {
  const [screen, setScreen] = useState<'login' | 'register' | 'feed'>('login');
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const [currentUser, setCurrentUser] = useState<RegisteredUser | null>(null);

  const handleRegister = (newUser: RegisteredUser) => {
    setRegisteredUsers((currentUsers) => [
      ...currentUsers.filter((user) => user.identity !== newUser.identity),
      newUser,
    ]);
    setCurrentUser(newUser);
    setScreen('feed');
  };

  const handleLogin = (identity: string, password: string): string | null => {
    const foundUser = registeredUsers.find(
      (user) => user.identity.toLowerCase() === identity.toLowerCase() && user.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      setScreen('feed');
      return null;
    }

    return 'Account not found or password incorrect. Please register first.';
  };

  const handleForgotPassword = (identity: string): string => {
    const normalizedIdentity = identity.trim().toLowerCase();
    if (!normalizedIdentity) {
      return 'Enter your phone number or email first.';
    }

    const userIndex = registeredUsers.findIndex(
      (user) => user.identity.toLowerCase() === normalizedIdentity
    );

    if (userIndex === -1) {
      return 'No account found with that phone number or email.';
    }

    const temporaryPassword = `Fade${Math.floor(100000 + Math.random() * 900000)}`;
    const updatedUser: RegisteredUser = {
      ...registeredUsers[userIndex],
      password: temporaryPassword,
    };

    setRegisteredUsers((currentUsers) =>
      currentUsers.map((user, index) => (index === userIndex ? updatedUser : user))
    );
    setCurrentUser((current) =>
      current && current.identity.toLowerCase() === normalizedIdentity ? updatedUser : current
    );

    return `Password reset successful. Your temporary password is: ${temporaryPassword}`;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        {!currentUser && screen === 'login' && (
          <LoginScreen
            onLogin={handleLogin}
            onGoToRegister={() => setScreen('register')}
          />
        )}
        {!currentUser && screen === 'register' && (
          <RegisterScreen onRegister={handleRegister} onBackToLogin={() => setScreen('login')} />
        )}
        {currentUser && (
          <MainFeed
            user={currentUser}
            onLogout={() => {
              setCurrentUser(null);
              setScreen('login');
            }}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
