import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  View,
  Modal,
} from 'react-native';
import { RegisteredUser } from './types/auth';

// Kenyan cities for validation
const KENYAN_CITIES = [
  'nairobi', 'mombasa', 'kisumu', 'eldoret', 'nakuru', 'thika', 'malindi',
  'kitale', 'garissa', 'nyeri', 'meru', 'kilifi', 'lamu', 'machakos',
  'naivasha', 'kakamega', 'kericho', 'embu', 'limuru', 'kiambu'
];

// Gender options
const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

// Styles defined at the top
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
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
  inputText: {
    color: '#111827',
    fontSize: 14,
  },
  placeholderText: {
    color: '#9CA3AF',
    fontSize: 14,
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
  // Date Picker Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxHeight: '70%',
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  pickerLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 8,
  },
  pickerScroll: {
    height: 200,
    width: '100%',
  },
  pickerItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 4,
  },
  pickerItemSelected: {
    backgroundColor: '#006B3F',
  },
  pickerItemText: {
    fontSize: 14,
    color: '#111827',
  },
  pickerItemTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  pickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  pickerCancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
  },
  pickerCancelText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  pickerConfirmButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: '#006B3F',
    borderRadius: 8,
  },
  pickerConfirmText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  // Gender Selector Styles
  genderContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
  },
  genderButtonSelected: {
    backgroundColor: '#006B3F',
    borderColor: '#006B3F',
  },
  genderText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  genderTextSelected: {
    color: '#ffffff',
  },
});

// Simple date picker component
const DatePickerField = ({ value, onChange }: { value: string; onChange: (date: string) => void }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  const years = Array.from({ length: 100 }, (_, i) => String(2026 - i));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

  const handleConfirm = () => {
    if (selectedYear && selectedMonth && selectedDay) {
      onChange(`${selectedYear}-${selectedMonth}-${selectedDay}`);
    }
    setShowPicker(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
        <Text style={value ? styles.inputText : styles.placeholderText}>
          {value || 'Select Date of Birth'}
        </Text>
      </TouchableOpacity>
      
      <Modal visible={showPicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerTitle}>Select Date of Birth</Text>
            <View style={styles.pickerRow}>
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>Day</Text>
                <ScrollView style={styles.pickerScroll}>
                  {days.map((day) => (
                    <TouchableOpacity
                      key={day}
                      style={[styles.pickerItem, selectedDay === day && styles.pickerItemSelected]}
                      onPress={() => setSelectedDay(day)}
                    >
                      <Text style={[styles.pickerItemText, selectedDay === day && styles.pickerItemTextSelected]}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>Month</Text>
                <ScrollView style={styles.pickerScroll}>
                  {months.map((month) => (
                    <TouchableOpacity
                      key={month}
                      style={[styles.pickerItem, selectedMonth === month && styles.pickerItemSelected]}
                      onPress={() => setSelectedMonth(month)}
                    >
                      <Text style={[styles.pickerItemText, selectedMonth === month && styles.pickerItemTextSelected]}>
                        {month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>Year</Text>
                <ScrollView style={styles.pickerScroll}>
                  {years.map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[styles.pickerItem, selectedYear === year && styles.pickerItemSelected]}
                      onPress={() => setSelectedYear(year)}
                    >
                      <Text style={[styles.pickerItemText, selectedYear === year && styles.pickerItemTextSelected]}>
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
            <View style={styles.pickerButtons}>
              <TouchableOpacity style={styles.pickerCancelButton} onPress={() => setShowPicker(false)}>
                <Text style={styles.pickerCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pickerConfirmButton} onPress={handleConfirm}>
                <Text style={styles.pickerConfirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Gender selector component
const GenderSelector = ({ value, onChange }: { value: string; onChange: (gender: string) => void }) => {
  return (
    <View style={styles.genderContainer}>
      {GENDER_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option}
          style={[styles.genderButton, value === option && styles.genderButtonSelected]}
          onPress={() => onChange(option)}
        >
          <Text style={[styles.genderText, value === option && styles.genderTextSelected]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

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

  const validateLocation = (location: string): boolean => {
    const normalizedLocation = location.toLowerCase().trim();
    const isKenyanCity = KENYAN_CITIES.some(city => normalizedLocation.includes(city));
    const isKenya = normalizedLocation.includes('kenya');
    return isKenyanCity || isKenya;
  };

  const handleSubmit = () => {
    const requiredValues = Object.values(form).map((value) => value.trim());
    if (requiredValues.some((value) => !value)) {
      setError('All fields are required for registration.');
      return;
    }

    if (!validateLocation(form.location)) {
      setError('Please enter a valid Kenyan location (e.g., Nairobi, Kenya).');
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
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
    >
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
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
        <DatePickerField
          value={form.dateOfBirth}
          onChange={(date) => updateField('dateOfBirth', date)}
        />

        <Text style={styles.label}>Location (Kenya)</Text>
        <TextInput
          style={styles.input}
          value={form.location}
          onChangeText={(value) => updateField('location', value)}
          placeholder="e.g., Nairobi, Kenya"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.label}>Gender</Text>
        <GenderSelector
          value={form.gender}
          onChange={(gender) => updateField('gender', gender)}
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
    </KeyboardAvoidingView>
  );
}