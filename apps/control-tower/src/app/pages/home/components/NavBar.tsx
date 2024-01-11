import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  return (
    <div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center"}}>

      <div style={{"display": "flex", "alignItems": "center"}}>
        <img src="./control-tower.png" alt="control tower logo" style={{"width": "75px", "padding": "5px"}}/>
        <h1 
          className="text-center text-green-900 font-bold text-3xl" 
        >control tower</h1>
      </div>

      <div style={{"display": "flex", "alignItems": "center"}}>
        <button
         onClick={() => {
            navigate('/login')
         }}
         className= "bg-gray-500 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded m-2"
         >go to pilot page</button>

        <button 
        onClick={() => {
            navigate('/signup')
        }}
        className= "bg-gray-500 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded m-2"
        >sign up</button>

      </div>
      



    </div>
  )
}

export default NavBar