import AudioRecorderPlayer from 'react-native-nitro-sound';

export const playRecording = async (
  isPlaying,
  setIsPlaying,
  currentFile,
  setRecordTime,
  setPlayProgress,
  stopPlay
) => {
  try {
    if (!isPlaying && currentFile) {
      await AudioRecorderPlayer.startPlayer(currentFile.path);
      setIsPlaying(true);
      console.log('Playing:', currentFile.path);

      AudioRecorderPlayer.addPlayBackListener(e => {
        const current = Math.floor(e.currentPosition / 1000);
        const total = Math.floor(e.duration / 1000);
        const progress = current / total;
        setPlayProgress(progress);

        // Convert seconds -> HH:MM:SS
        const h = Math.floor(current / 3600)
          .toString()
          .padStart(2, '0');
        const m = Math.floor((current % 3600) / 60)
          .toString()
          .padStart(2, '0');
        const s = Math.floor(current % 60)
          .toString()
          .padStart(2, '0');
        setRecordTime(`${h}:${m}:${s}`);

        if (e.currentPosition >= e.duration) {
          stopPlay(setIsPlaying, setRecordTime, setPlayProgress);
        }
      });
    } else {
      await AudioRecorderPlayer.pausePlayer();
      setIsPlaying(false);
      console.log('Playback paused');
    }
  } catch (err) {
    console.log('Playing error:', err);
  }
};

export const stopPlay = async (setIsPlaying, setRecordTime, setPlayProgress) => {
  try {
    await AudioRecorderPlayer.stopPlayer();
    setIsPlaying(false);
    setRecordTime('00:00:00');
    setPlayProgress(0);
    console.log('Playback stopped');
  } catch (err) {
    console.log('Stop play error:', err);
  }
};

export const handleSelectRecording = async (
  item,
  setCurrentFile,
  setIsPlaying,
  setRecordTime,
  setPlayProgress
) => {
  setCurrentFile(item);
  await stopPlay(setIsPlaying, setRecordTime, setPlayProgress);
  await AudioRecorderPlayer.startPlayer(item.path);
  setIsPlaying(true);
  console.log('Now playing:', item.path);

  AudioRecorderPlayer.addPlayBackListener(e => {
    if (e.currentPosition && e.duration) {
      const current = Math.floor(e.currentPosition / 1000);
      const total = Math.floor(e.duration / 1000);
      const progress = current / total;
      setPlayProgress(progress);

      const h = Math.floor(current / 3600)
        .toString()
        .padStart(2, '0');
      const m = Math.floor((current % 3600) / 60)
        .toString()
        .padStart(2, '0');
      const s = Math.floor(current % 60)
        .toString()
        .padStart(2, '0');
      setRecordTime(`${h}:${m}:${s}`);

      if (e.currentPosition >= e.duration) {
        stopPlay(setIsPlaying, setRecordTime, setPlayProgress);
      }
    }
  });
};
