import React, { Component } from 'react';
import styled from 'styled-components';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import Loader from './components/Loader';
import Button from './components/Button';
import { Toaster } from 'react-hot-toast';
// import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY = '24201171-f795c334c12b489d5c6645c6d';
const URI = `/?key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

export default class App extends Component {
  state = {
    images: [],
    page: 1,
    serchTerm: '',
    showModal: false,
    largeImageURL: '',
    status: 'idle',
    error: null,
  };

  setSerchTerm = serchTerm => {
    this.setState({ serchTerm });
  };

  onLargeImgClick = ({ largeImageURL }) => {
    this.setState({ largeImageURL: largeImageURL });
  };

  onToggleModal = img => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImageURL: img,
    }));
  };

  onLoadMoreButton = async () => {
    const { page, serchTerm } = this.state;
    const response = await axios.get(`${URI}&q=${serchTerm}&page=${page}`);
    const newArray = response.data.hits;
    this.setState(prevState => {
      return {
        images: [...prevState.images, ...newArray],
        page: prevState.page + 1,
      };
    });
  };

  async componentDidMount() {}

  async componentDidUpdate(_, prevState) {
    const { serchTerm } = this.state;

    if (prevState.serchTerm !== serchTerm) {
      this.setState({ images: [], status: 'pending' });
    }

    if (prevState.serchTerm !== serchTerm) {
      const { serchTerm } = this.state;
      const response = await axios.get(`${URI}&q=${serchTerm}&page=1`);
      const newArray = response.data.hits;

      try {
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...newArray],
            status: 'resolved',
          };
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
      console.log('this.state.error', this.state.error);
      console.log('this.state.status', this.state.status);
    }
  }

  render() {
    const { images, status } = this.state;

    if (status === 'idle') {
      return <Searchbar onSubmit={this.setSerchTerm} />;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return (
        <>
          <Toaster />
          {/* <p>Whoops, something went wrong: {error.message}</p> */}
          <p>Whoops, something went wrong</p>
          {/* <Toaster autoClose={1000} /> */}
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <AppWrapper>
          <Searchbar onSubmit={this.setSerchTerm} />
          {this.state.showModal && (
            <Modal onCloseModal={this.onToggleModal}>
              <img src={this.state.largeImageURL} alt="" />
            </Modal>
          )}
          <ImageGallery images={images} onOpenModal={this.onToggleModal} />
          <Button name={'Load more'} onLoadMoreButton={this.onLoadMoreButton} />
        </AppWrapper>
      );
    }
  }
}

// render() {
//   const { images, isLoading, error, showModal, largeImageURL, tags } = this.state;
//   return (
//     <AppWrapper>
//       <Toaster />
//       <Searchbar onSubmit={this.setSerchTerm} />
//       {error && <p>Whoops, something went wrong: {error.message}</p>}
//       {isLoading && <Loader />}
//       {images.length > 0 && <ImageGallery images={images} onOpenModal={this.onToggleModal} />}
//       {showModal && (
//         <Modal onCloseModal={this.onToggleModal}>
//           <img src={largeImageURL} alt={tags} />
//         </Modal>
//       )}
//       {images.length > 1 && (
//         <Button name={'Load more'} onLoadMoreButton={this.onLoadMoreButton} />
//       )}
//     </AppWrapper>
//   );
// }
// }
