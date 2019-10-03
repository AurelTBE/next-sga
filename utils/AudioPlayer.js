import React from 'react';
import { PlayButton, Timer } from 'react-soundplayer/components';

// it's just an alias for 'withSoundCloudAudio' but makes code clearer
import { withCustomAudio } from 'react-soundplayer/addons';

// some track meta information
const trackTitle = 'Great song by random artist';

const AWSSoundPlayer = withCustomAudio(props => {
  const { trackTitle } = props;

  return (
    <div>
      <PlayButton {...props} />
      <h2>{trackTitle}</h2>
      <Timer {...props} />
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