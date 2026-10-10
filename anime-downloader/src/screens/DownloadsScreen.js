import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getActiveDownloads } from '../services/downloadService';
import { colors } from '../theme/colors';

export default function DownloadsScreen() {
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    // In a real app, you would use an event emitter or polling to keep this updated.
    // For demo, we just poll every second.
    const interval = setInterval(async () => {
      const active = await getActiveDownloads();
      setDownloads(active);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.fileName} numberOfLines={1}>{item.fileName}</Text>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${item.progress}%` }]} />
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.statusText}>
          {item.status === 'downloading' ? `İndiriliyor... ${item.progress.toFixed(1)}%` : 'Tamamlandı'}
        </Text>
        {item.status === 'completed' && (
           <Text style={styles.successText}>Hazır</Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {downloads.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Henüz bir indirme yok.</Text>
        </View>
      ) : (
        <FlatList
          data={downloads}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: 15,
  },
  card: {
    backgroundColor: colors.card,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  fileName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressContainer: {
    height: 10,
    backgroundColor: colors.border,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  successText: {
    color: colors.success,
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
  }
});
