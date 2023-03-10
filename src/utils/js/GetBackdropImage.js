const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w1920_and_h427_multi_faces/'

export default function GetBackdropImage(poster_path) {
  const image_url = new URL(BASE_IMAGE_URL + poster_path)
  return image_url
}