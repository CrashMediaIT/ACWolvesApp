import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Switch,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLink, faUserPlus } from '../../theme/icons';
import { rostersApi, athletesApi } from '../../api/services';
import { useApiData } from '../../hooks/useApiData';
import colors from '../../theme/colors';
import type { Team, Athlete } from '../../types';

export default function AddPlayerScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { team } = route.params as { team: Team };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [position, setPosition] = useState('');
  const [jerseyNumber, setJerseyNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [linkToUser, setLinkToUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetcher = useCallback(() => athletesApi.list(), []);
  const { data: athletes } = useApiData<Athlete[]>(fetcher);

  const filteredAthletes = (athletes ?? []).filter((a) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      a.firstName.toLowerCase().includes(q) ||
      a.lastName.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q)
    );
  });

  const handleSelectUser = (athlete: Athlete) => {
    setSelectedUserId(athlete.id);
    setFirstName(athlete.firstName);
    setLastName(athlete.lastName);
    setEmail(athlete.email);
    setDateOfBirth(athlete.dateOfBirth);
    setPosition(athlete.position);
  };

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Required', 'First name and last name are required.');
      return;
    }

    setSaving(true);
    try {
      await rostersApi.addPlayer(team.id, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dateOfBirth,
        position,
        jerseyNumber,
        email,
        phone,
        notes,
        userId: linkToUser ? selectedUserId : null,
        isLinked: linkToUser && selectedUserId !== null,
      });
      navigation.goBack();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to add player';
      Alert.alert('Error', message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Player Information</Text>

      <Text style={styles.label}>First Name *</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First name"
        placeholderTextColor={colors.textMuted}
      />

      <Text style={styles.label}>Last Name *</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last name"
        placeholderTextColor={colors.textMuted}
      />

      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={colors.textMuted}
      />

      <Text style={styles.label}>Position</Text>
      <TextInput
        style={styles.input}
        value={position}
        onChangeText={setPosition}
        placeholder="e.g. Forward, Defense, Goalie"
        placeholderTextColor={colors.textMuted}
      />

      <Text style={styles.label}>Jersey Number</Text>
      <TextInput
        style={styles.input}
        value={jerseyNumber}
        onChangeText={setJerseyNumber}
        placeholder="e.g. 9"
        placeholderTextColor={colors.textMuted}
        keyboardType="number-pad"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="player@example.com"
        placeholderTextColor={colors.textMuted}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone number"
        placeholderTextColor={colors.textMuted}
        keyboardType="phone-pad"
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

      <View style={styles.divider} />
      <Text style={styles.sectionTitle}>Link to Existing Account</Text>
      <Text style={styles.hint}>
        If this player already has an Arctic Wolves account, you can link their
        roster profile to their existing account. No new account is created for
        unlinked players.
      </Text>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Link to existing user</Text>
        <Switch
          value={linkToUser}
          onValueChange={(val) => {
            setLinkToUser(val);
            if (!val) setSelectedUserId(null);
          }}
          trackColor={{ false: colors.border, true: colors.primaryLight }}
          thumbColor={linkToUser ? colors.primary : colors.textMuted}
        />
      </View>

      {linkToUser && (
        <View style={styles.linkSection}>
          <Text style={styles.label}>Search users</Text>
          <TextInput
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by name or email..."
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
          />
          <FlatList
            data={filteredAthletes}
            keyExtractor={(item) => String(item.id)}
            scrollEnabled={false}
            style={styles.userList}
            renderItem={({ item }) => {
              const isSelected = selectedUserId === item.id;
              return (
                <TouchableOpacity
                  style={[styles.userCard, isSelected && styles.userCardSelected]}
                  onPress={() => handleSelectUser(item)}
                >
                  <View style={styles.userCardBody}>
                    <Text style={styles.userCardTitle}>
                      {item.firstName} {item.lastName}
                    </Text>
                    <Text style={styles.userCardText}>{item.email}</Text>
                  </View>
                  {isSelected && (
                    <FontAwesomeIcon icon={faLink} size={14} color={colors.success} />
                  )}
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No matching users found</Text>
            }
          />
        </View>
      )}

      <TouchableOpacity
        style={[styles.saveButton, saving && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color={colors.textWhite} />
        ) : (
          <>
            <FontAwesomeIcon icon={faUserPlus} size={18} color={colors.textWhite} />
            <Text style={styles.saveButtonText}>Add Player</Text>
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
  hint: { fontSize: 13, color: colors.textSecondary, marginBottom: 16, lineHeight: 18 },
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
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 20 },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bgCard,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 14,
  },
  switchLabel: { fontSize: 15, color: colors.textWhite },
  linkSection: { marginBottom: 14 },
  userList: { maxHeight: 250 },
  userCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userCardSelected: { borderColor: colors.success },
  userCardBody: { flex: 1 },
  userCardTitle: { fontSize: 14, fontWeight: '600', color: colors.textWhite },
  userCardText: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  emptyText: { fontSize: 13, color: colors.textMuted, textAlign: 'center', paddingVertical: 16 },
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
  errorText: { fontSize: 14, color: colors.error, marginBottom: 12, textAlign: 'center' },
});
