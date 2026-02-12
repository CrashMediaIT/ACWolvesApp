import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { sessionsApi } from '../../api/services';
import colors from '../../theme/colors';
import type { Session } from '../../types';

export default function SessionDetailScreen() {
  const route = useRoute();
  const { session } = route.params as { session: Session };
  const [actionLoading, setActionLoading] = useState(false);

  const handleBook = async () => {
    setActionLoading(true);
    try {
      await sessionsApi.book(session.id);
      Alert.alert('Success', 'Session booked successfully');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to book session';
      Alert.alert('Error', message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    setActionLoading(true);
    try {
      await sessionsApi.cancel(session.id);
      Alert.alert('Success', 'Booking cancelled successfully');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to cancel booking';
      Alert.alert('Error', message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Title</Text>
        <Text style={styles.value}>{session.title}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{session.description}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Session Type</Text>
        <Text style={styles.value}>{session.sessionType}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{session.date}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Time</Text>
        <Text style={styles.value}>{session.startTime} – {session.endTime}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{session.location}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Coach</Text>
        <Text style={styles.value}>{session.coachName}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{session.status}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Participants</Text>
        <Text style={styles.value}>
          {session.currentParticipants} / {session.maxParticipants}
        </Text>
      </View>

      {session.status === 'scheduled' && (
        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBook}
          disabled={actionLoading}
        >
          {actionLoading ? (
            <ActivityIndicator color={colors.textWhite} />
          ) : (
            <Text style={styles.buttonText}>Book Session</Text>
          )}
        </TouchableOpacity>
      )}

      {(session.status === 'in_progress') && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
          disabled={actionLoading}
        >
          {actionLoading ? (
            <ActivityIndicator color={colors.textWhite} />
          ) : (
            <Text style={styles.buttonText}>Cancel Booking</Text>
          )}
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain, padding: 16 },
  card: {
    backgroundColor: colors.bgCard,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: { fontSize: 12, color: colors.textSecondary, marginBottom: 4, textTransform: 'uppercase' },
  value: { fontSize: 16, color: colors.textWhite },
  bookButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  cancelButton: {
    backgroundColor: colors.error,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: { fontSize: 16, fontWeight: '600', color: colors.textWhite },
});
