export const userImg = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";


export const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjVjZWFhMDcyZWI3YjI5NmMyZjk1NmM1ZTVkODVhYyIsInN1YiI6IjY0NzIwNTcyYmUyZDQ5MDBiZjlkN2RmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e4HDQbSNp_0kBM5glMFytHcegHjgpHTYK0G0PBWchss' ,
    }
  };

  export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500"


  export const bgImg = "./images/bgimg.png"


  export const SUPPORTED_LANGUAGES = [{identifier:"english",name:"English"},{identifier:"hindi",name:"Hindi"},{identifier:"spanish",name:"Spanish"}]

  export const OPENAI_KEY = process.env.REACT_APP_OPENAI_API_KEY;