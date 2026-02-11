import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../../theme/colors';

export default function ShopScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>🛍️</Text>
        <Text style={styles.title}>Shop</Text>
        <Text style={styles.subtitle}>
          Arctic Wolves merchandise, apparel, and equipment
        </Text>
      </View>

      {['Jerseys', 'Training Gear', 'Accessories', 'Equipment'].map((cat) => (
        <View key={cat} style={styles.card}>
          <Text style={styles.cardTitle}>{cat}</Text>
          <Text style={styles.cardText}>Browse {cat.toLowerCase()}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  header: { padding: 24, alignItems: 'center' },
  icon: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: '700', color: colors.textWhite, marginBottom: 4 },
  subtitle: { fontSize: 14, color: colors.textSecondary, textAlign: 'center' },
  card: {
    backgroundColor: colors.bgCard,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors.textWhite, marginBottom: 4 },
  cardText: { fontSize: 14, color: colors.textSecondary },
});
