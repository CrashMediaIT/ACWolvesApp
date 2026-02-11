import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function VideoScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>🎬</Text>
        <Text style={styles.title}>Video</Text>
        <Text style={styles.subtitle}>
          Game film review, practice clips, and video analysis
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Upload and review game footage, tag key moments, and share annotated
          clips with athletes and coaching staff.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.emptyText}>No videos uploaded yet</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  header: { padding: 24, alignItems: 'center' },
  icon: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#A8A8B8', textAlign: 'center' },
  card: {
    backgroundColor: '#16161F',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D2D3F',
  },
  cardText: { fontSize: 14, color: '#FFFFFF' },
  emptyText: { fontSize: 14, color: '#6B6B7B', textAlign: 'center' },
});
