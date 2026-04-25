import { useState
 } from 'react';
import { ScrollView,
   StyleSheet,
    Text, TextInput,
     TouchableOpacity } from 'react-native';
import { RegisteredUser } from './types/auth';

interface RegisterScreenProps {
  onRegister: (user: RegisteredUser) => void;
  onBackToLogin: () => void;
}

export default function RegisterScreen({ onRegister, onBackToLogin }: RegisterScreenProps) {
  const [form, setForm] = useState({
    fullName: '',
    identity: '',
    dateOfBirth: '',
    location: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError('');
  };

  const handleSubmit = () => {
    const requiredValues = Object.values(form).map((value) => value.trim());
    if (requiredValues.some((value) => !value)) {
      setError('All fields are required for registration.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Password and verify password must match.');
      return;
    }

    const newUser: RegisteredUser = {
      fullName: form.fullName.trim(),
      identity: form.identity.trim(),
      dateOfBirth: form.dateOfBirth.trim(),
      location: form.location.trim(),
      gender: form.gender.trim(),
      password: form.password,
    };

    onRegister(newUser);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Register with phone number or email</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={form.fullName}
        onChangeText={(value) => updateField('fullName', value)}
        placeholder="Your full name"
        placeholderTextColor="#9CA3AF"
      />

      <Text style={styles.label}>Phone Number or Email</Text>
      <TextInput
        style={styles.input}
        value={form.identity}
        onChangeText={(value) => updateField('identity', value)}
        placeholder="+2547... or example@email.com"
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        value={form.dateOfBirth}
        onChangeText={(value) => updateField('dateOfBirth', value)}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#9CA3AF"
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={form.location}
        onChangeText={(value) => updateField('location', value)}
        placeholder="City, Country"
        placeholderTextColor="#9CA3AF"
      />

      <Text style={styles.label}>Gender</Text>
      <TextInput
        style={styles.input}
        value={form.gender}
        onChangeText={(value) => updateField('gender', value)}
        placeholder="Gender"
        placeholderTextColor="#9CA3AF"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={form.password}
        onChangeText={(value) => updateField('password', value)}
        placeholder="Create password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
      />

      <Text style={styles.label}>Verify Password</Text>
      <TextInput
        style={styles.input}
        value={form.confirmPassword}
        onChangeText={(value) => updateField('confirmPassword', value)}
        placeholder="Re-enter password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
      />

      {!!error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
        <Text style={styles.primaryButtonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={onBackToLogin}>
        <Text style={styles.secondaryButtonText}>Back to Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#111827',
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 12,
    marginTop: 12,
  },
  primaryButton: {
    backgroundColor: '#006B3F',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryButtonText: {
    color: '#374151',
    fontWeight: '500',
  },
});
