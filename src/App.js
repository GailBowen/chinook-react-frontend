import { Link } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="dashboard">
        <div className="dashboard-row">
          <DashboardTile url="/albums" caption="Albums" />
          <DashboardTile url="/artists" caption="Artists" />
          <DashboardTile url="/customers" caption="Customers" />
          <DashboardTile url="/employees" caption="Employees" />
          <DashboardTile url="/genres" caption="Genres" />
          <DashboardTile url="/mediatypes" caption="Media Types" />
          <DashboardTile url="/playlists" caption="Playlists" />
          <DashboardTile url="/tracks" caption="Tracks" />
          <DashboardTile url="/spotifylinks" caption="Spotify Links" />
        </div>
      </div>
    </div>
  );
}

function DashboardTile(props) {
  const url = props.url;
  const caption = props.caption;

  return (
    <>
    <div className="dashboard-tile">
      <Link to={url}>{caption}</Link>
    </div>
    </>
  );
}

export default App;
