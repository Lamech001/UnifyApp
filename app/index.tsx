import { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        {!currentUser && screen === 'login' && (
          <LoginScreen onLogin={handleLogin} onGoToRegister={() => setScreen('register')} />
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
