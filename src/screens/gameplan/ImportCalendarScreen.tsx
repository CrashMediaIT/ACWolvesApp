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
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFileImport, faLink, faCheckCircle, faChevronRight } from '../../theme/icons';
import { calendarImportApi } from '../../api/services';
import colors from '../../theme/colors';
import type {
  Team,
  CalendarImportEntry,
  TeamNameMatch,
  CalendarImportPayload,
} from '../../types';

type ImportStep = 'upload' | 'season' | 'review' | 'confirm';

export default function ImportCalendarScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { team } = route.params as { team: Team };

  // Wizard step
  const [step, setStep] = useState<ImportStep>('upload');

  // Step 1 – Upload
  const [fileUri, setFileUri] = useState('');
  const [parsing, setParsing] = useState(false);

  // Parsed data from Step 1
  const [entries, setEntries] = useState<CalendarImportEntry[]>([]);
  const [teamMatches, setTeamMatches] = useState<TeamNameMatch[]>([]);

  // Step 2 – Season assignment
  const [season, setSeason] = useState(team.season || '');

  // Step 4 – Confirming
  const [confirming, setConfirming] = useState(false);

  // ── Step 1: Upload & parse ────────────────────────────────
  const handleParse = async () => {
    if (!fileUri.trim()) {
      Alert.alert('Required', 'Please enter a calendar file path or URL.');
      return;
    }
    setParsing(true);
    try {
      const res = await calendarImportApi.parse(fileUri);
      if (res.success && res.data) {
        setEntries(res.data.entries);
        setTeamMatches(res.data.teamMatches);
        setStep('season');
      } else {
        Alert.alert('Error', res.error ?? 'Failed to parse calendar file');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to parse file';
      Alert.alert('Error', message);
    } finally {
      setParsing(false);
    }
  };

  // ── Step 2: Assign season → go to review ──────────────────
  const handleSeasonNext = () => {
    if (!season.trim()) {
      Alert.alert('Required', 'Please assign a season to this import.');
      return;
    }
    setStep('review');
  };

  // ── Step 3: Update match action ───────────────────────────
  const cycleAction = (idx: number) => {
    setTeamMatches((prev) => {
      const updated = [...prev];
      const current = updated[idx].action;
      const next: TeamNameMatch['action'] =
        current === 'link' ? 'create' : current === 'create' ? 'skip' : 'link';
      updated[idx] = { ...updated[idx], action: next };
      return updated;
    });
  };

  // ── Step 4: Confirm import ────────────────────────────────
  const handleConfirm = async () => {
    setConfirming(true);
    try {
      const payload: CalendarImportPayload = {
        season,
        teamMappings: teamMatches,
        entries,
      };
      const res = await calendarImportApi.confirm(payload);
      if (res.success && res.data) {
        Alert.alert(
          'Import Complete',
          `${res.data.teamsCreated} team(s) created, ` +
            `${res.data.teamsLinked} linked, ` +
            `${res.data.eventsCreated} event(s) imported.`,
          [{ text: 'OK', onPress: () => navigation.goBack() }],
        );
      } else {
        Alert.alert('Error', res.error ?? 'Import failed');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Import failed';
      Alert.alert('Error', message);
    } finally {
      setConfirming(false);
    }
  };

  // ── Step indicator ────────────────────────────────────────
  const steps: { key: ImportStep; label: string }[] = [
    { key: 'upload', label: '1. Upload' },
    { key: 'season', label: '2. Season' },
    { key: 'review', label: '3. Review Teams' },
    { key: 'confirm', label: '4. Confirm' },
  ];

  const actionLabels: Record<TeamNameMatch['action'], string> = {
    link: 'Use Existing',
    create: 'Create New',
    skip: 'Skip',
  };

  const actionColors: Record<TeamNameMatch['action'], string> = {
    link: colors.success,
    create: colors.info,
    skip: colors.textMuted,
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Step indicator bar */}
      <View style={styles.stepBar}>
        {steps.map((s) => (
          <View
            key={s.key}
            style={[styles.stepItem, step === s.key && styles.stepItemActive]}
          >
            <Text style={[styles.stepText, step === s.key && styles.stepTextActive]}>
              {s.label}
            </Text>
          </View>
        ))}
      </View>

      {/* ── STEP 1: Upload ─────────────────────────────── */}
      {step === 'upload' && (
        <>
          <Text style={styles.sectionTitle}>Upload Calendar</Text>
          <Text style={styles.hint}>
            Provide a path or URL to a calendar file (CSV or ICS). The system
            will parse team names, dates, and event details automatically.
          </Text>

          <Text style={styles.label}>File Path / URL</Text>
          <TextInput
            style={styles.input}
            value={fileUri}
            onChangeText={setFileUri}
            placeholder="e.g. /path/to/schedule.csv"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={[styles.primaryButton, parsing && styles.buttonDisabled]}
            onPress={handleParse}
            disabled={parsing}
          >
            {parsing ? (
              <ActivityIndicator color={colors.textWhite} />
            ) : (
              <>
                <FontAwesomeIcon icon={faFileImport} size={18} color={colors.textWhite} />
                <Text style={styles.primaryButtonText}>Parse Calendar</Text>
              </>
            )}
          </TouchableOpacity>
        </>
      )}

      {/* ── STEP 2: Season assignment ──────────────────── */}
      {step === 'season' && (
        <>
          <Text style={styles.sectionTitle}>Assign Season</Text>
          <Text style={styles.hint}>
            All teams and events from this import will be tagged with the season
            you specify. This helps keep schedules organized across years.
          </Text>

          <Text style={styles.label}>Season *</Text>
          <TextInput
            style={styles.input}
            value={season}
            onChangeText={setSeason}
            placeholder="e.g. 2025-2026"
            placeholderTextColor={colors.textMuted}
          />

          <View style={styles.summaryCard}>
            <Text style={styles.summaryText}>
              {entries.length} event{entries.length !== 1 ? 's' : ''} parsed · {teamMatches.length} team name{teamMatches.length !== 1 ? 's' : ''} found
            </Text>
          </View>

          <View style={styles.navRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => setStep('upload')}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton} onPress={handleSeasonNext}>
              <Text style={styles.primaryButtonText}>Next</Text>
              <FontAwesomeIcon icon={faChevronRight} size={14} color={colors.textWhite} />
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* ── STEP 3: Review team names ──────────────────── */}
      {step === 'review' && (
        <>
          <Text style={styles.sectionTitle}>Review Team Names</Text>
          <Text style={styles.hint}>
            The system detected the following team names in the imported
            calendar. Tap each row to cycle between "Use Existing",
            "Create New", or "Skip". Similar names are flagged automatically.
          </Text>

          <FlatList
            data={teamMatches}
            keyExtractor={(_, idx) => String(idx)}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.matchCard}
                onPress={() => cycleAction(index)}
              >
                <View style={styles.matchBody}>
                  <Text style={styles.matchName}>{item.importedName}</Text>
                  {item.existingTeam && (
                    <View style={styles.matchRow}>
                      <FontAwesomeIcon icon={faLink} size={12} color={colors.success} />
                      <Text style={styles.matchExisting}>
                        {' '}Matches: {item.existingTeam.name} ({Math.round(item.confidence * 100)}%)
                      </Text>
                    </View>
                  )}
                </View>
                <View style={[styles.actionBadge, { backgroundColor: actionColors[item.action] }]}>
                  <Text style={styles.actionBadgeText}>{actionLabels[item.action]}</Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No team names to review</Text>
            }
          />

          <View style={styles.navRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => setStep('season')}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setStep('confirm')}
            >
              <Text style={styles.primaryButtonText}>Next</Text>
              <FontAwesomeIcon icon={faChevronRight} size={14} color={colors.textWhite} />
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* ── STEP 4: Confirm ────────────────────────────── */}
      {step === 'confirm' && (
        <>
          <Text style={styles.sectionTitle}>Confirm Import</Text>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Season</Text>
            <Text style={styles.summaryValue}>{season}</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Events to import</Text>
            <Text style={styles.summaryValue}>{entries.length}</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Teams to create</Text>
            <Text style={styles.summaryValue}>
              {teamMatches.filter((m) => m.action === 'create').length}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Teams to link</Text>
            <Text style={styles.summaryValue}>
              {teamMatches.filter((m) => m.action === 'link').length}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Teams skipped</Text>
            <Text style={styles.summaryValue}>
              {teamMatches.filter((m) => m.action === 'skip').length}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Imported events will appear on each team's calendar and in the
              main schedule for the assigned coach. Season "{season}" will be
              applied to all teams and events.
            </Text>
          </View>

          <View style={styles.navRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => setStep('review')}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmButton, confirming && styles.buttonDisabled]}
              onPress={handleConfirm}
              disabled={confirming}
            >
              {confirming ? (
                <ActivityIndicator color={colors.textWhite} />
              ) : (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} size={18} color={colors.textWhite} />
                  <Text style={styles.primaryButtonText}>Import</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  content: { padding: 16, paddingBottom: 40 },
  stepBar: { flexDirection: 'row', marginBottom: 20 },
  stepItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  stepItemActive: { borderBottomColor: colors.primary },
  stepText: { fontSize: 11, color: colors.textMuted, fontWeight: '600' },
  stepTextActive: { color: colors.primary },
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
  primaryButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: { fontSize: 15, fontWeight: '600', color: colors.textWhite, marginLeft: 8 },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.success,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: { opacity: 0.6 },
  backButton: {
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  backButtonText: { fontSize: 15, fontWeight: '600', color: colors.textSecondary },
  navRow: { flexDirection: 'row', marginTop: 20 },
  summaryCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryText: { fontSize: 14, color: colors.textSecondary },
  summaryLabel: { fontSize: 14, color: colors.textSecondary },
  summaryValue: { fontSize: 16, fontWeight: '700', color: colors.textWhite },
  matchCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchBody: { flex: 1 },
  matchName: { fontSize: 15, fontWeight: '600', color: colors.textWhite },
  matchRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  matchExisting: { fontSize: 13, color: colors.success },
  actionBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  actionBadgeText: { fontSize: 12, fontWeight: '700', color: colors.textWhite },
  infoCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.info,
    padding: 14,
    marginBottom: 14,
  },
  infoText: { fontSize: 13, color: colors.textSecondary, lineHeight: 18 },
  emptyText: { fontSize: 13, color: colors.textMuted, textAlign: 'center', paddingVertical: 16 },
});
