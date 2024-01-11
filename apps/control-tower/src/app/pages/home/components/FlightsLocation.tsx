import { useAtom } from 'jotai';
import { flightsLocation } from '../app';
import { useState } from 'react';

function FlightsLocation() {

    const [location, setLocation] = useAtom(flightsLocation);
    const [visible, setVisible] = useState<boolean>(false)
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">

        <h2 className="text-center text-green-900 font-bold text-2xl">change location</h2>

        <button
        onClick={() => setVisible(!visible)}
        >
            {visible ? "close menu 🔼" : "open menu 🔽"}
        </button>

        {visible && 
        <div className="flex flex-row items-center justify-center gap-4">
            {location.map((item, index) =>(
                <div key={index} className="flex flex-col items-center justify-center border-2 rounded-lg p-4">

                    <p>{`hight: ${item.height}, width: ${item.width}`}</p>

                    <input 
                    type="text" 
                    placeholder={`height: ${item.height}`}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    id={`height-${index}`}
                    />
                    <button
                    onClick={() => {
                        const newLocation = [...location];
                        newLocation[index].height = parseInt(document.querySelector(`#height-${index}`)!.value);
                        setLocation(newLocation);
                    }}
                    className= "bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded m-2"
                    >
                        change height
                    </button>

                    <input 
                    type="text" 
                    placeholder={`width: ${item.width}`}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    id= {`width-${index}`}
                    />
                    <button
                    onClick={() => {
                        const newLocation = [...location];
                        newLocation[index].width = parseInt(document.querySelector(`#width-${index}`)!.value);
                        setLocation(newLocation);
                    }}
                    className= "bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded m-2"
                    >
                        change width
                    </button>
                </div>
            ))}
        </div>
        }


    </div>
  )
}

export default FlightsLocation