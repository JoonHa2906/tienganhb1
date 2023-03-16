import http from '../config/http-common.js';

const findAll= () =>{
   return http.get('/readings/find/');
}
const findSlug= slug =>{
   return http.get(`/readings/find/${slug}`);
}

const findNew= limit =>{
   return http.get(`/readings/findnew/${limit}`);
}

 const ReadingService = {findAll, findSlug, findNew};
 
 export default ReadingService;