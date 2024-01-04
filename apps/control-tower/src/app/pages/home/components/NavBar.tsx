import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  return (
    <div style={{"display": "flex", "justifyContent": "space-around", "alignItems": "center"}}>
        <button
         style={{'border': '1px solid black', 'borderRadius': '5px', 'padding': '5px'}}
         onClick={() => {
            navigate('/login')
         }}
         >log in</button>
        <button 
        style={{"border": "1px solid black", "borderRadius": "5px", "padding": "5px"}}
        onClick={() => {
            navigate('/signup')
        }}
        >sign up</button>
        <img src="./control-tower.png" alt="control tower logo" style={{"width": "100px"}}/>
    </div>
  )
}

export default NavBar