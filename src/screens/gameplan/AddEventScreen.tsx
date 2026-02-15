import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '../../theme/icons';
import { teamEventsApi } from '../../api/services';
import colors from '../../theme/colors';
import type { Team } from '../../types';

type EventType = 'practice' | 'game';

export default function AddEventScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { team } = route.params as { team: Team };

  const [eventType, setEventType] = useState<EventType>('practice');
  const [title, setTitle] = useState('');
  const [opponent, setOpponent] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Required', 'Title is required.');
      return;
    }
    if (!date.trim()) {
      Alert.alert('Required', 'Date is required.');
      return;
    }

    setSaving(true);
    try {
      await teamEventsApi.create(team.id, {
        type: eventType,
        title: title.trim(),
        opponent: opponent.trim(),
        date,
        startTime,
        endTime,
        location,
        notes,
        season: team.season,
        status: 'scheduled',
      });
      navigation.goBack();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create event';
      Alert.alert('Error', message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Event Type</Text>
      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[styles.typeButton, eventType === 'practice' && styles.typeButtonActive]}
          onPress={() => setEventType('practice')}
        >
          <Text style={[styles.typeButtonText, eventType === 'practice' && styles.typeButtonTextActive]}>
            Practice
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, eventType === 'game' && styles.typeButtonActive]}
          onPress={() => setEventType('game')}
        >
          <Text style={[styles.typeButtonText, eventType === 'game' && styles.typeButtonTextActive]}>
            Game
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Title *</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder={eventType === 'game' ? 'e.g. Game vs Senators' : 'e.g. Morning Practice'}
        placeholderTextColor={colors.textMuted}
      />

      {eventType === 'game' && (
        <>
          <Text style={styles.label}>Opponent</Text>
          <TextInput
            style={styles.input}
            value={opponent}
            onChangeText={setOpponent}
            placeholder="e.g. Ottawa Senators U9"
            placeholderTextColor={colors.textMuted}
          />
        </>
      )}

      <Text style={styles.label}>Date *</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={colors.textMuted}
      />

      <Text style={styles.label}>Start Time</Text>
      <TextInput
        style={styles.input}
        value={startTime}
        onChangeText={setStartTime}
        placeholder="e.g. 09:00"
        placeholderTextColor={colors.textMuted}
      />

      <Text style={styles.label}>End Time</Text>
      <TextInput
        style={styles.input}
        value={endTime}
        onChangeText={setEndTime}
        placeholder="e.g. 10:30"
        placeholderTextColor={colors.textMuted}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="e.g. Rockland Arena"
        placeholderTextColor={colors.textMuted}
      />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Additional notes..."
        placeholderTextColor={colors.textMuted}
        multiline
        numberOfLines={3}
      />

      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          This event will appear on the {team.name} calendar and in the main
          schedule for the coach assigned to this team.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.saveButton, saving && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color={colors.textWhite} />
        ) : (
          <>
            <FontAwesomeIcon icon={faPlus} size={18} color={colors.textWhite} />
            <Text style={styles.saveButtonText}>
              Add {eventType === 'game' ? 'Game' : 'Practice'}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  content: { padding: 16, paddingBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.textWhite, marginBottom: 12 },
  typeRow: { flexDirection: 'row', marginBottom: 20, gap: 12 },
  typeButton: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    alignItems: 'center',
  },
  typeButtonActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  typeButtonText: { fontSize: 15, fontWeight: '600', color: colors.textSecondary },
  typeButtonTextActive: { color: colors.textWhite },
  label: { fontSize: 13, color: colors.textSecondary, marginBottom: 6, textTransform: 'uppercase' },
  input: {
    backgroundColor: colors.bgCard,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    fontSize: 15,
    color: colors.textWhite,
    marginBottom: 14,
  },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  infoCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.info,
    padding: 14,
    marginBottom: 14,
  },
  infoText: { fontSize: 13, color: colors.textSecondary, lineHeight: 18 },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  saveButtonDisabled: { opacity: 0.6 },
  saveButtonText: { fontSize: 16, fontWeight: '600', color: colors.textWhite, marginLeft: 8 },
});
