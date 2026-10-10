import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Memory cache for active downloads to easily render them in the UI
let activeDownloads = [];

/**
 * Syncs the in-memory activeDownloads array with AsyncStorage
 */
const saveDownloadsToStorage = async () => {
  try {
    await AsyncStorage.setItem('@downloads', JSON.stringify(activeDownloads));
  } catch (e) {
    console.log('Error saving downloads to storage:', e);
  }
};

/**
 * Loads previous downloads from AsyncStorage on startup
 */
export const loadDownloadsFromStorage = async () => {
  try {
    const data = await AsyncStorage.getItem('@downloads');
    if (data) {
      activeDownloads = JSON.parse(data);
    }
  } catch (e) {
    console.log('Error loading downloads:', e);
  }
};

/**
 * Starts a resumable download and tracks its progress
 */
export const startDownload = async (url, fileName) => {
  const fileUri = FileSystem.documentDirectory + fileName;

  // Create a record for our UI tracking
  const downloadRecord = {
    id: Date.now().toString(),
    url,
    fileName,
    fileUri,
    progress: 0,
    status: 'downloading',
  };

  activeDownloads.push(downloadRecord);
  await saveDownloadsToStorage();

  const callback = downloadProgress => {
    const progress = (downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite) * 100;

    // Find our record and update it
    const recordIndex = activeDownloads.findIndex(d => d.id === downloadRecord.id);
    if (recordIndex !== -1) {
      activeDownloads[recordIndex].progress = progress;
      // In a production app, you might not want to save to AsyncStorage on EVERY progress tick (performance).
      // Here we just keep memory up to date for the UI polling.
    }
  };

  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    fileUri,
    {},
    callback
  );

  try {
    const { uri } = await downloadResumable.downloadAsync();

    // Mark as completed
    const recordIndex = activeDownloads.findIndex(d => d.id === downloadRecord.id);
    if (recordIndex !== -1) {
      activeDownloads[recordIndex].status = 'completed';
      activeDownloads[recordIndex].progress = 100;
      await saveDownloadsToStorage();
    }

    console.log('Finished downloading to ', uri);
  } catch (e) {
    console.error('Download error:', e);

    const recordIndex = activeDownloads.findIndex(d => d.id === downloadRecord.id);
    if (recordIndex !== -1) {
      activeDownloads[recordIndex].status = 'error';
      await saveDownloadsToStorage();
    }
  }
};

/**
 * Returns the current active and completed downloads for the UI
 */
export const getActiveDownloads = () => {
  return [...activeDownloads].reverse(); // latest first
};
