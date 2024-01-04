// eslint-disable-next-line @typescript-eslint/no-unused-vars
import MapComponent from './components/Map';
import Alerts from './components/Alerts';
import NavBar from './components/NavBar';


export function App() {
  return (
    <div className="app">
      <NavBar />
      <h1 
        className="text-center text-green-900 font-bold text-3xl" 
      >control tower</h1>
      <p 
        className="text-center text-green-900 font-bold text-2xl"
      >look at the map!🤯 what a beautiful map!🫨 literally the best map i have ever seen in my entire life🫠</p>
      <MapComponent points={[{height: 3893903, width: 3770461}, {height: 100, width: 20}, {height:35660000, width: 3280000}]}/>
      <Alerts />
    </div>
  );
}

export default App;
