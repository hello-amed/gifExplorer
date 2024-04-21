import "./App.css";
import TrendingGifs from "./components/trendingGifs/TrendingGifs";
import SearchGifs from "./components/searchGifs/SearchGifs";
import SavedGifs from "./components/savedGifs/SavedGifs";
import NavBar from "./components/UI/nav/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <SearchGifs />
      <TrendingGifs />
      <SavedGifs />
    </>
  );
}

export default App;
