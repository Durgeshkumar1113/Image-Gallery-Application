import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchData();
  }, []);

  const handleNewImageSubmit = (e) => {
    e.preventDefault();
    const newImage = {
      albumId: 1,
      id: images.length + 1,
      title: 'Image Added By You.',
      url: newImageUrl,
      thumbnailUrl: newImageUrl,
    };
    setImages((prevImages) => [newImage, ...prevImages]);
    setNewImageUrl('');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>IMAGE GALLERY</h1>
        </div>
        <div className="navbar-search">
          <form onSubmit={handleNewImageSubmit}>
            <input
              type="text"
              placeholder="Enter image URL"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
            />
            <button type="submit">Add Image</button>
          </form>
        </div>
      </nav>

      <div className="image-container">
        {images.map((image) => (
          <div className="card" key={image.id}>
            <img className="card-img-top" src={image.thumbnailUrl} alt={image.title} />
            <div className="card-body">
              <h5 className="card-title">{image.title}</h5>
            </div>
          </div>
        ))}
      </div>

      <footer>
        <p>© 2023 Image Gallery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ImageGallery;
