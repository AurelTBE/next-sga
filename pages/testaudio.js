import React from 'react';
import { PlayButton, Timer } from 'react-soundplayer/components';

// it's just an alias for 'withSoundCloudAudio' but makes code clearer
import { withCustomAudio } from 'react-soundplayer/addons';

// audio source
const streamUrl = 'http://sga-gymfeminine.fr/bo/wp-content/uploads/2019/09/Sol-1er-et-2ème-degré.mp3';

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

export default class App extends React.Component {
  render() {
    return (
      <AWSSoundPlayer
        streamUrl={streamUrl}
        trackTitle={trackTitle}
        preloadType="metadata" />
    );
  }
}