import { useState
 } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface LoginScreenProps {
  onLogin: (identity: string, password: string) => string | null;
  onGoToRegister: () => void;
}

export default function LoginScreen({ onLogin, onGoToRegister }: LoginScreenProps) {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginPress = () => {
    if (!identity.trim() || !password.trim()) {
      setError('Phone number or email and password are required.');
      return;
    }
    const loginError = onLogin(identity.trim(), password);
    setError(loginError ?? '');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Branding Header */}
      <View style={styles.brandingSection}>
        <View style={styles.decorativeLine} />

        <View style={styles.brandingContent}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>⏳</Text>
            </View>
            <Text style={styles.appName}>FadeTima</Text>
            <View style={styles.divider} />
          </View>

          {/* Tagline */}
          <Text style={styles.tagline}>Share Your Moment, Watch It Fade</Text>
          <Text style={styles.subtitle}>Stories from Kenya that live for 48 hours</Text>
        </View>
      </View>

      {/* Login Form */}
      <View style={styles.formSection}>
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Welcome Back</Text>
            <Text style={styles.formSubtitle}>Join the conversation</Text>
          </View>

          {/* Phone Number or Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number or Email</Text>
            <TextInput
              style={styles.input}
              placeholder="+2547... or example@email.com"
              placeholderTextColor="#9CA3AF"
              value={identity}
              onChangeText={(value) => {
                setIdentity(value);
                setError('');
              }}
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setError('');
              }}
              secureTextEntry
            />
          </View>

          {!!error && <Text style={styles.errorText}>{error}</Text>}

          {/* Remember Me & Forgot Password */}
          <View style={styles.optionsRow}>
            <Text style={styles.rememberText}>Remember me</Text>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up */}
          <View style={styles.signupContainer}>
            <TouchableOpacity style={styles.signUpButton} onPress={onGoToRegister}>
              <Text style={styles.signUpButtonText}>Create an account</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>
            By continuing, you agree to FadeTima&apos;s Terms & Privacy
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  brandingSection: {
    backgroundColor: '#006B3F',
    paddingHorizontal: 32,
    paddingVertical: 48,
    position: 'relative',
  },
  decorativeLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#BA0C2F',
  },
  brandingContent: {
    alignItems: 'center',
    paddingTop: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoEmoji: {
    fontSize: 32,
  },
  appName: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  divider: {
    height: 4,
    width: 96,
    borderRadius: 2,
    backgroundColor: '#BA0C2F',
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  formSection: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  formContainer: {
    width: '100%',
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000000',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rememberText: {
    fontSize: 12,
    color: '#374151',
  },
  forgotPassword: {
    fontSize: 12,
    color: '#006B3F',
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 12,
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: '#006B3F',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },
  dividerText: {
    fontSize: 12,
    color: '#6B7280',
    paddingHorizontal: 12,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  socialButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  socialButtonText: {
    fontSize: 12,
    color: '#374151',
  },
  signupContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  signUpButton: {
    borderWidth: 1,
    borderColor: '#006B3F',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  signUpButtonText: {
    fontSize: 14,
    color: '#006B3F',
    fontWeight: '600',
  },
  footer: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
