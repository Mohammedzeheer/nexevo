import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineBars } from 'react-icons/ai';
import { FaSave } from 'react-icons/fa';
import { Axios } from '../../api/axiosInstance';

const Card = ({ imageUrl, title, onDelete, index }) => {
  const [editing, setEditing] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(title);

  const handleDelete = () => {
    onDelete(imageUrl);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await Axios.put('/updateimage', {
        imageUrl,
        newTitle,
      });

      if (response.status === 200) {
        setEditing(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Error updating image title: ', error);
    }
  };

  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  return (
    <Draggable draggableId={imageUrl} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="relative w-30 h-30 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center"
        >
          <div className="absolute top-0 right-0 flex space-x-2 p-2">
            {editing ? (
              <button onClick={handleSave}>
                <FaSave />
              </button>
            ) : (
              <>
                <button onClick={handleEdit}>
                  <AiOutlineEdit />
                </button>
                <button onClick={handleDelete}>
                  <AiOutlineDelete />
                </button>
              </>
            )}
          </div>
          <div className="pt-10 flex justify-center items-center h-3/5">
            <img className="rounded-lg w-20 h-25" src={imageUrl} alt={title} />
          </div>
          <div className="p-5 flex justify-between items-center h-2/5 relative w-full">
            {editing ? (
              <input
                type="text"
                value={newTitle}
                onChange={handleChange}
                className="mb-2 w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            ) : (
              <a href="#">
                <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                  {title}
                </h5>
              </a>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;








// import React, { useEffect, useState } from 'react';
// import { AiOutlineEdit, AiOutlineDelete, AiOutlineBars } from 'react-icons/ai';
// import { FaSave } from "react-icons/fa";
// import { Axios } from '../../api/axiosInstance';


// const Card = ({ imageUrl, title, onDelete }) => {
//   const [editing, setEditing] = useState(false);
//   const [newTitle, setNewTitle] = useState(title);

//   const handleDelete = () => {
//     onDelete(imageUrl);
//   };

//   const handleEdit = async () => {
//     setEditing(true);
//   };

//   const handleSave = async () => {
//     try {
//       const response = await Axios.put('/updateimage', {
//         imageUrl,
//         newTitle,
//       });

//       if (response.status === 200) {
//         setEditing(false);
//       }
//     } catch (error) {
//       console.error('Error updating image title: ', error);
//     }
//   };

//   const handleChange = (e) => {
//     setNewTitle(e.target.value);
//   };

//   return (
//     // <div className="relative max-w-sm  bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
//     <div className="relative w-30 h-30 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center">
//     <div className="absolute top-0 right-0 flex space-x-2 p-2">
//         {editing ? (
//           <button onClick={handleSave}>
//             <FaSave />
//           </button>
//         ) : (
//           <>
//             <button onClick={handleEdit}>
//               <AiOutlineEdit />
//             </button>
//             <button onClick={handleDelete}>
//               <AiOutlineDelete />
//             </button>
//           </>
//         )}
//       </div>
//     <div className="pt-10 flex justify-center items-center h-3/5">
//       <img className="rounded-lg w-20 h-25" src={imageUrl} alt={title} />
//     </div>
//     <div className="p-5 flex justify-between items-center h-2/5 relative w-full">
//       {editing ? (
//         <input
//           type="text"
//           value={newTitle}
//           onChange={handleChange}
//           className="mb-2 w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
//         />
//       ) : (
//         <a href="#">
//           <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
//             {title}
//           </h5>
//         </a>
//       )}
     
//     </div>
//   </div>
  
//   );
// };


// export default Card;