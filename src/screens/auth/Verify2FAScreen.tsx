import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function Verify2FAScreen() {
  const { verify2FA, state, signOut } = useAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (!code.trim()) {
      setError('Please enter your 2FA code.');
      return;
    }
    setError('');
    try {
      await verify2FA(code.trim());
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Verification failed.';
      setError(message);
      Alert.alert('Verification Failed', message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Two-Factor Authentication</Text>
        <Text style={styles.subtitle}>
          Enter the verification code from your authenticator app.
        </Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Enter 6-digit code"
          placeholderTextColor="#999"
          keyboardType="number-pad"
          maxLength={6}
          value={code}
          onChangeText={setCode}
          editable={!state.isLoading}
          onSubmitEditing={handleVerify}
        />

        <TouchableOpacity
          style={[styles.button, state.isLoading && styles.buttonDisabled]}
          onPress={handleVerify}
          disabled={state.isLoading}
        >
          {state.isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={signOut}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B1929' },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 8 },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 32,
  },
  error: {
    color: '#EF4444',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 14,
  },
  input: {
    width: '100%',
    backgroundColor: '#1E293B',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  button: {
    width: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cancelButton: { marginTop: 16 },
  cancelText: { color: '#94A3B8', fontSize: 14 },
});
