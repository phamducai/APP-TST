import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOCAL_AUDIOS = 'LOCAL_AUDIOS_';

export async function saveToLocal(id) {
  await AsyncStorage.setItem(LOCAL_AUDIOS + id, true);
}

export async function downloadAudio(id) {}
