import { useState, useRef, useEffect } from "react";
import openingMusic from "../../assets/audio/opening.mp3";

const GlobalAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2); // Start with logical volume
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      // Attempt to play on mount
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Autoplay prevented by browser:", error);
            setIsPlaying(false);
          });
      }
    }
  }, []); // Run once on mount

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((error) => console.error("Playback failed:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center bg-gray-900/80 backdrop-blur-md p-3 rounded-full border border-green-500/30 shadow-lg shadow-green-500/20 text-white transition-all hover:bg-gray-800">
      <audio ref={audioRef} src={openingMusic} loop />

      <button
        onClick={togglePlay}
        className="mr-3 p-2 rounded-full hover:bg-green-500/20 transition-colors focus:outline-none text-green-400"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </button>

      <div className="flex items-center group">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500 transition-all opacity-50 group-hover:opacity-100 hover:h-2"
        />
      </div>
    </div>
  );
};

export default GlobalAudioPlayer;
