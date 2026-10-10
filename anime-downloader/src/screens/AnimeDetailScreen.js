import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { colors } from '../theme/colors';
import { mockQualities, mockLanguages } from '../services/mockData';
import { startDownload } from '../services/downloadService';

export default function AnimeDetailScreen({ route }) {
  const { anime } = route.params;
  const [selectedSeason, setSelectedSeason] = useState(anime.seasons[0]);
  const [selectedQuality, setSelectedQuality] = useState(mockQualities[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(mockLanguages[0]);

  const handleDownloadEpisode = async (episode) => {
    Alert.alert(
      "İndirme Başlatılıyor",
      `${anime.title} - ${selectedSeason.title} - ${episode.title}\nKalite: ${selectedQuality.label}\nDil: ${selectedLanguage.label}`,
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Başlat",
          onPress: async () => {
            const fileName = `${anime.title.replace(/ /g, '_')}_${selectedSeason.id}_${episode.id}_${selectedQuality.id}.mp4`;
            // Using the episode's dummy URL
            await startDownload(episode.url, fileName);
            Alert.alert("Başarılı", "İndirme arka planda başlatıldı. İndirilenler sekmesinden takip edebilirsiniz.");
          }
        }
      ]
    );
  };

  const handleDownloadSeason = () => {
    Alert.alert(
      "Sezonu İndir",
      `${selectedSeason.title} tüm bölümler indirilecek. Emin misiniz?`,
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Evet",
          onPress: () => {
            selectedSeason.episodes.forEach(async (ep) => {
               const fileName = `${anime.title.replace(/ /g, '_')}_${selectedSeason.id}_${ep.id}_${selectedQuality.id}.mp4`;
               await startDownload(ep.url, fileName);
            });
            Alert.alert("Başarılı", "Tüm bölümler indirme kuyruğuna eklendi.");
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: anime.thumbnail }} style={styles.banner} />

      <View style={styles.content}>
        <Text style={styles.title}>{anime.title}</Text>
        <Text style={styles.description}>{anime.description}</Text>

        {/* Seçenekler */}
        <View style={styles.optionsContainer}>
          <Text style={styles.sectionTitle}>Sezon Seçimi</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {anime.seasons.map(season => (
              <TouchableOpacity
                key={season.id}
                style={[styles.chip, selectedSeason.id === season.id && styles.chipActive]}
                onPress={() => setSelectedSeason(season)}
              >
                <Text style={[styles.chipText, selectedSeason.id === season.id && styles.chipTextActive]}>
                  {season.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Dil / Altyazı</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mockLanguages.map(lang => (
              <TouchableOpacity
                key={lang.id}
                style={[styles.chip, selectedLanguage.id === lang.id && styles.chipActive]}
                onPress={() => setSelectedLanguage(lang)}
              >
                <Text style={[styles.chipText, selectedLanguage.id === lang.id && styles.chipTextActive]}>
                  {lang.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Kalite</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mockQualities.map(quality => (
              <TouchableOpacity
                key={quality.id}
                style={[styles.chip, selectedQuality.id === quality.id && styles.chipActive]}
                onPress={() => setSelectedQuality(quality)}
              >
                <Text style={[styles.chipText, selectedQuality.id === quality.id && styles.chipTextActive]}>
                  {quality.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bölüm Listesi */}
        <View style={styles.episodesHeader}>
          <Text style={styles.sectionTitle}>Bölümler</Text>
          <TouchableOpacity onPress={handleDownloadSeason}>
            <Text style={styles.downloadAllText}>Tüm Sezonu İndir</Text>
          </TouchableOpacity>
        </View>

        {selectedSeason.episodes.map(episode => (
          <View key={episode.id} style={styles.episodeCard}>
            <View style={styles.episodeInfo}>
              <Text style={styles.episodeTitle}>{episode.title}</Text>
              <Text style={styles.episodeDuration}>{episode.duration}</Text>
            </View>
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => handleDownloadEpisode(episode)}
            >
              <Text style={styles.downloadButtonText}>İndir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
    lineHeight: 20,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 15,
    marginBottom: 10,
  },
  chip: {
    backgroundColor: colors.card,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.text,
    fontWeight: 'bold',
  },
  episodesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  downloadAllText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  episodeCard: {
    backgroundColor: colors.card,
    flexDirection: 'row',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  episodeInfo: {
    flex: 1,
    paddingRight: 10,
  },
  episodeTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  episodeDuration: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  downloadButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  downloadButtonText: {
    color: colors.text,
    fontWeight: 'bold',
  }
});
