import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLink, faLinkSlash } from '../../theme/icons';
import { rostersApi, athletesApi } from '../../api/services';
import { useApiData } from '../../hooks/useApiData';
import colors from '../../theme/colors';
import type { Team, RosterPlayer, Athlete } from '../../types';

export default function PlayerDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { team, player } = route.params as { team: Team; player: RosterPlayer };

  const [showLinkUI, setShowLinkUI] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [linkLoading, setLinkLoading] = useState(false);

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

  const handleLink = async (userId: number) => {
    setLinkLoading(true);
    try {
      await rostersApi.linkUser(team.id, player.id, userId);
      Alert.alert('Linked', 'Player has been linked to the user account.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to link account';
      Alert.alert('Error', message);
    } finally {
      setLinkLoading(false);
    }
  };

  const handleUnlink = () => {
    Alert.alert(
      'Unlink Account',
      'This will remove the connection to the user account. The roster profile data will be preserved.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unlink',
          style: 'destructive',
          onPress: async () => {
            setLinkLoading(true);
            try {
              await rostersApi.unlinkUser(team.id, player.id);
              Alert.alert('Unlinked', 'Player has been unlinked from the user account.', [
                { text: 'OK', onPress: () => navigation.goBack() },
              ]);
            } catch (err: unknown) {
              const message = err instanceof Error ? err.message : 'Failed to unlink account';
              Alert.alert('Error', message);
            } finally {
              setLinkLoading(false);
            }
          },
        },
      ],
    );
  };

  const initials = `${player.firstName.charAt(0)}${player.lastName.charAt(0)}`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.avatarWrapper}>
        <View style={[styles.avatar, player.isLinked ? styles.avatarLinked : styles.avatarUnlinked]}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        {player.isLinked && (
          <View style={styles.linkedBadge}>
            <FontAwesomeIcon icon={faLink} size={12} color={colors.textWhite} />
            <Text style={styles.linkedBadgeText}>Linked</Text>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>First Name</Text>
        <Text style={styles.value}>{player.firstName}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Last Name</Text>
        <Text style={styles.value}>{player.lastName}</Text>
      </View>

      {player.position ? (
        <View style={styles.card}>
          <Text style={styles.label}>Position</Text>
          <Text style={styles.value}>{player.position}</Text>
        </View>
      ) : null}

      {player.jerseyNumber ? (
        <View style={styles.card}>
          <Text style={styles.label}>Jersey Number</Text>
          <Text style={styles.value}>#{player.jerseyNumber}</Text>
        </View>
      ) : null}

      {player.dateOfBirth ? (
        <View style={styles.card}>
          <Text style={styles.label}>Date of Birth</Text>
          <Text style={styles.value}>{player.dateOfBirth}</Text>
        </View>
      ) : null}

      {player.email ? (
        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{player.email}</Text>
        </View>
      ) : null}

      {player.phone ? (
        <View style={styles.card}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{player.phone}</Text>
        </View>
      ) : null}

      {player.notes ? (
        <View style={styles.card}>
          <Text style={styles.label}>Notes</Text>
          <Text style={styles.value}>{player.notes}</Text>
        </View>
      ) : null}

      <View style={styles.card}>
        <Text style={styles.label}>Team</Text>
        <Text style={styles.value}>{team.name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Account Status</Text>
        <Text style={[styles.value, player.isLinked ? styles.statusLinked : styles.statusUnlinked]}>
          {player.isLinked ? 'Linked to Arctic Wolves account' : 'Not linked – roster only'}
        </Text>
      </View>

      {/* Link / Unlink actions */}
      {player.isLinked ? (
        <TouchableOpacity
          style={styles.unlinkButton}
          onPress={handleUnlink}
          disabled={linkLoading}
        >
          {linkLoading ? (
            <ActivityIndicator color={colors.textWhite} />
          ) : (
            <>
              <FontAwesomeIcon icon={faLinkSlash} size={16} color={colors.textWhite} />
              <Text style={styles.actionButtonText}>Unlink from User Account</Text>
            </>
          )}
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => setShowLinkUI(!showLinkUI)}
          >
            <FontAwesomeIcon icon={faLink} size={16} color={colors.textWhite} />
            <Text style={styles.actionButtonText}>
              {showLinkUI ? 'Cancel Linking' : 'Link to Existing Account'}
            </Text>
          </TouchableOpacity>

          {showLinkUI && (
            <View style={styles.linkSection}>
              <Text style={styles.linkHint}>
                Search for an existing Arctic Wolves user to link this player profile.
                Once linked the player's roster data is preserved and connected to
                their user account.
              </Text>
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
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.userCard}
                    onPress={() => handleLink(item.id)}
                    disabled={linkLoading}
                  >
                    <View style={styles.userCardBody}>
                      <Text style={styles.userCardTitle}>
                        {item.firstName} {item.lastName}
                      </Text>
                      <Text style={styles.userCardText}>{item.email}</Text>
                    </View>
                    <FontAwesomeIcon icon={faLink} size={14} color={colors.primary} />
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>No matching users found</Text>
                }
              />
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  content: { padding: 16, paddingBottom: 40 },
  avatarWrapper: { alignItems: 'center', marginVertical: 24 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLinked: { backgroundColor: colors.success },
  avatarUnlinked: { backgroundColor: colors.primary },
  avatarText: { fontSize: 32, fontWeight: '700', color: colors.textWhite },
  linkedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
  },
  linkedBadgeText: { fontSize: 12, fontWeight: '600', color: colors.textWhite, marginLeft: 4 },
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
  statusLinked: { color: colors.success },
  statusUnlinked: { color: colors.textMuted },
  linkButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  unlinkButton: {
    backgroundColor: colors.danger,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  actionButtonText: { fontSize: 15, fontWeight: '600', color: colors.textWhite, marginLeft: 8 },
  linkSection: { marginTop: 16 },
  linkHint: { fontSize: 13, color: colors.textSecondary, marginBottom: 12, lineHeight: 18 },
  input: {
    backgroundColor: colors.bgCard,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    fontSize: 15,
    color: colors.textWhite,
    marginBottom: 12,
  },
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
  userCardBody: { flex: 1 },
  userCardTitle: { fontSize: 14, fontWeight: '600', color: colors.textWhite },
  userCardText: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  emptyText: { fontSize: 13, color: colors.textMuted, textAlign: 'center', paddingVertical: 16 },
});
