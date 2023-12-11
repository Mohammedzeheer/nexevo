import React, { useState } from 'react';
import { Axios } from "../api/axiosInstance";
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import { RiDeleteBin6Line } from 'react-icons/ri';

const ImageUpload = () => {
  const Token = localStorage.getItem('user')
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles1 = Array.from(e.target.files);
    setSelectedFiles(selectedFiles1);

    const uploadedImages = selectedFiles1.map((file) => ({
      title: title || file.name,
      file,
    }));
    setImages([...images, ...uploadedImages]);
    // setSelectedFiles([]);
    // setTitle('');
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    for (const image of selectedFiles) {
      formData.append('images', image)
    }
    formData.append(
      'titles',
      JSON.stringify(images.map((image) => image.title))
    );
    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    try {
      const response = await Axios.post('upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: Token
        },
      });
      toast.success(response.data.message)
      setImages([]);
      setSelectedFiles([]);
      setTitle('');
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };


  const handleDelete = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleEditTitle = (index, newTitle) => {
    const updatedImages = [...images];
    updatedImages[index].title = newTitle;
    setImages(updatedImages);
  };

  return (
    <>
      <Navbar />
      <div className="p-10">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Image Upload</h2>

          <div className="flex flex-col mb-4">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="border rounded py-2 px-4 mb-2"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image.file)}
                  alt={image.title}
                  className="rounded mb-2"
                />
                <input
                  type="text"
                  value={image.title}
                  onChange={(e) => handleEditTitle(index, e.target.value)}
                  className="border rounded py-1 px-2 absolute bottom-0 left-0 w-full bg-white"
                />
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white py-1 px-2 absolute top-0 right-0 rounded m-1"
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-4">
            <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-800">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;