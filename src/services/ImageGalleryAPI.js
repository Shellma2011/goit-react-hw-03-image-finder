function fetchImages(query) {
  const KEY = '24201171-f795c334c12b489d5c6645c6d';
  return fetch(
    `https://pixabay.com/api/?key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Нет покемона с именем ${query}`));
  });
}

const api = {
  fetchImages,
};

export default api;
