import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchSong = async () => {
    setLoading(true);
    setError('');
    setDownloadLink('');
    const videoId = videoUrl.split('v=')[1];

    const options = {
      method: 'GET',
      url: `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`,
      headers: {
        'x-rapidapi-key': '5149801459mshc73f6dd56a0de63p1fde6djsn014b47b2b314',
        'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setDownloadLink(response.data.link);
      setVideoTitle(response.data.title);
    } catch (err) {
      setError('Failed to fetch the song. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>YouTube MP3 Downloader</h1>
      <input
      className='input'
        type="text"
        placeholder="Enter YouTube video URL"
        
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <button className='button-fetch' onClick={handleFetchSong} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Song'}
      </button>
      {error && <p className="error">{error}</p>}
      {downloadLink && (
        <div>
          <h3>{videoTitle}</h3>
          <a href={downloadLink} download>
            Download MP3
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
