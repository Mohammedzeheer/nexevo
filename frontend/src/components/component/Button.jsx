import React from 'react'
import { useNavigate } from 'react-router-dom'


function Button(props) {
    const Navigate = useNavigate()
  return (
//     <div>
// <button  onClick={()=>Navigate('/image-upload')}
// className=" m-5 rounded-xl border-2 border-gray-300 px-5 py-2 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200/10 active:bg-gray-300/10 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">

// {props.buttonName}
// </button>
//     </div>

<div className="flex justify-center sm:justify-start">
<button onClick={()=>Navigate('/image-upload')}
        className="m-5 rounded-xl border-2 border-gray-300 px-5 py-2 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200/10 active:bg-gray-300/10 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
  {props.buttonName}
</button>
</div>

  )
}

export default Button