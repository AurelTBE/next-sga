import React from 'react';
import { PlayButton, Progress, VolumeControl, Timer, Icons } from 'react-soundplayer/components';

// it's just an alias for 'withSoundCloudAudio' but makes code clearer
import { withCustomAudio } from 'react-soundplayer/addons';

const AWSSoundPlayer = withCustomAudio(props => {
  const { trackTitle, streamUrl } = props;

  return (
    <div>
      <PlayButton {...props} />
      <h2>{trackTitle}</h2>
      <VolumeControl
        className={String}
        buttonClassName={String}
        rangeClassName={String}
        volume={Number} // in range 0-1
        onVolumeChange={Function}
        onToggleMute={Function}
        soundCloudAudio={streamUrl} />
      <Timer {...props} />
      <Progress
        className={String}
        innerClassName={String}
        value={Number} // in range 0-100
        onSeekTrack={Function}
        soundCloudAudio={streamUrl} />
    </div>
  );
});

export default function AudioPlayer({music}) {

    return (
        <AWSSoundPlayer
            streamUrl={music.musique}
            trackTitle={music.titre}
            preloadType="metadata" />
    );
  
}