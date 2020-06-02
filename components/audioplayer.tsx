import React, { useEffect, useRef, useState } from 'react';
import Loader from 'react-loader-spinner';
import { episode } from '../models/episode';
import { playtimeString } from '../logic/helper';

const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const AudioPlayer: React.FunctionComponent<{ episode: episode }> = ({
  episode,
}) => {
  const progressbar = useRef<HTMLDivElement>(null);
  const audioElement = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const togglePlay = () => {
    setCurrentTime(audioElement.current.currentTime);
    if (isPlaying) {
      audioElement.current.pause();
    } else {
      audioElement.current.play();
      if (!isLoaded) setLoading(true);
      setIsLoaded(true);
    }
  };

  const progressClick = (event: React.MouseEvent<HTMLElement>) => {
    const playheadWidth = progressbar.current.offsetWidth;
    const offsetWidht = progressbar.current.offsetLeft;
    const userClickWidht = event.clientX - offsetWidht;
    const userClickWidhtInPercent = (userClickWidht * 100) / playheadWidth;
    audioElement.current.currentTime =
      (duration / 100) * userClickWidhtInPercent;
    setCurrentTime(audioElement.current.currentTime);
  };

  useInterval(
    () => {
      setCurrentTime(audioElement.current.currentTime);
    },
    isPlaying ? 100 : null
  );

  const loader = (
    <div className="h-full w-full flex items-center justify-around">
      <Loader type="ThreeDots" color="#c05621" height={90} width={90} />
    </div>
  );

  const playerui = (
    <>
      {isLoaded ? (
        <div>
          <div className="pb-1 pt-5 px-3">
            <div
              className="h-2 bg-orange-700 rounded-full"
              onClick={progressClick}
              ref={progressbar}
            >
              {currentTime > 0 ? (
                <div
                  className="h-2 bg-orange-300 rounded-full relative"
                  style={{ width: (currentTime / duration) * 100 + '%' }}
                >
                  <span className="w-4 h-4 bg-orange-200 absolute right-0 -m-1 rounded-full shadow hover:bg-orange-400 transition duration-200 ease-in-out"></span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="px-3 text-orange-300 flex justify-between">
            <p>{playtimeString(currentTime)}</p>
            <p>{playtimeString(duration)}</p>
          </div>
        </div>
      ) : null}
      <div className="flex justify-around items-center">
        <button className="py-2 focus:outline-none" onClick={togglePlay}>
          {isPlaying ? (
            <svg
              className="w-8 h-8 fill-current text-orange-700 hover:text-orange-400 transition duration-200 ease-in-out"
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="188" height="500" />
              <rect x="312" width="188" height="500" />
            </svg>
          ) : (
            <svg
              className="w-8 w-8 fill-current text-orange-700 hover:text-orange-400 transition duration-200 ease-in-out"
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="500 250 0 0 0 500 500 250" />
            </svg>
          )}
        </button>
      </div>
    </>
  );

  return (
    <div className="bg-orange-500 shadow-md flex items-center lg:w-2/3 my-6">
      <audio
        ref={audioElement}
        src={episode.enclosure.url}
        onPlay={() => {
          setDuration(audioElement.current.duration);
          setIsPlaying(true);
        }}
        preload="none"
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onLoadedData={() => setDuration(audioElement.current.duration)}
        onPlaying={() => setLoading(false)}
      ></audio>
      <div className="w-1/3">
        <img src={episode.podcastImage} alt={episode.podcastTitle} />
      </div>
      <div className="flex-1 px-2">{!loading ? playerui : loader}</div>
    </div>
  );
};

export default AudioPlayer;
