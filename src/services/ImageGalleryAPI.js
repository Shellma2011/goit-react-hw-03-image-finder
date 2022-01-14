function fetchImages(query) {
  const KEY = '24296481-49f21b132d362d0e842f769a1';
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
