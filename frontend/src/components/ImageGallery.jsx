import React, { useEffect, useState } from 'react';
import { Axios } from '../api/axiosInstance';
import Card from './component/Card';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const ImageGallery = () => {
  const [userData, setUserData] = useState([]);
  const [originalUserData, setOriginalUserData] = useState([]);
  const Token = localStorage.getItem('user');
  const headers = {authorization: Token}
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('allimages', { headers });
        const data = response.data.user || [];
        setUserData(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteImage = async (imageUrl) => {
    try {
      const response = await Axios.delete('/deleteimage', {
        headers,
        data: { imageUrl },
      });

      if (response.status === 200) {
        const updatedUserData = userData.map((user) => ({
          ...user,
          imageDetails: user.imageDetails.filter(
            (imageDetail) => imageDetail.image !== imageUrl
          ),
        }));
        setUserData(updatedUserData);
      }
    } catch (error) {
      console.error('Error deleting image: ', error);
    }
  };



  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) {
      return; 
    }

    const updatedUserData = userData.map((user, index) => {
      if (index === source.droppableId) {
        const updatedUser = { ...user };
        if (updatedUser.imageDetails) {
          const reorderedItems = Array.from(updatedUser.imageDetails);
          const [reorderedItem] = reorderedItems.splice(source.index, 1);
          reorderedItems.splice(destination.index, 0, reorderedItem);
          updatedUser.imageDetails = reorderedItems;
        }
        return updatedUser;
      }
      return user;
    });
  
    try {
      setUserData(updatedUserData);
      await Axios.put('/updateImageOrder', { updatedUserData }); 
    } catch (error) {
      console.error('Error updating image order: ', error);
      setUserData(originalUserData);
    }
  };
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-wrap justify-center gap-4">
        {userData.map((user, index) => (
          <Droppable droppableId={`droppable-${index}`} key={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-wrap gap-4"
              >
                {user.imageDetails && Array.isArray(user.imageDetails) ? (
                  user.imageDetails.map((imageDetail, imgIndex) => (
                    <Card
                      key={imgIndex}
                      imageUrl={imageDetail.image}
                      title={imageDetail.title}
                      onDelete={handleDeleteImage}
                      index={imgIndex}
                    />
                  ))
                ) : (
                  <p>No image details available</p>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
 }
export default ImageGallery;





// import React, { useEffect, useState } from 'react';
// import { Axios } from '../api/axiosInstance';
// import Card from './component/Card';

// const ImageGallery = () => {
//   const [userData, setUserData] = useState([]);
//   const Token = localStorage.getItem('user');
//   const headers = { authorization: Token };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await Axios.get('allimages', { headers });
//         const data = response.data.user || [];
//         setUserData(data);
//       } catch (error) {
//         console.error('Error fetching data: ', error);
//       }
//     };

//     fetchData();
//   }, []);


//   const handleDeleteImage = async (imageUrl) => {
//     try {
//       const response = await Axios.delete('/deleteimage', {
//         headers, data: { imageUrl },
//       });

//       if (response.status === 200) {
//         const updatedUserData = userData.map((user) => ({
//           ...user,
//           imageDetails: user.imageDetails.filter(
//             (imageDetail) => imageDetail.image !== imageUrl
//           ),
//         }));
//         setUserData(updatedUserData);
//       }
//     } catch (error) {
//       console.error('Error deleting image: ', error);
//     }
//   };


//   return (
//     <div className="flex flex-wrap justify-center gap-4">
//       {userData.map((user, index) => (
//         <div key={index} className="flex flex-wrap gap-4">
//           {user.imageDetails.map((imageDetail, imgIndex) => (
//             <Card
//               key={imgIndex}
//               imageUrl={imageDetail.image}
//               title={imageDetail.title}
//               onDelete={handleDeleteImage}
//             />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ImageGallery;
