// // import PropTypes from 'prop-types';
// import React from 'react';
import styled from 'styled-components';

const ImageGalleryItems = styled.li`
  height: 260px;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;
const ImageGalleryItemsImage = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 4px;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;

const ImageGalleryItem = ({ id, tags, webformatURL, onOpenModal, largeImageURL }) => (
  <ImageGalleryItems key={id} id={id}>
    <ImageGalleryItemsImage
      src={webformatURL}
      alt={tags}
      onClick={() => onOpenModal(largeImageURL)}
    />
  </ImageGalleryItems>
);

export default ImageGalleryItem;