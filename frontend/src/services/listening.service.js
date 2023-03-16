import http from '../config/http-common.js';

const findAll= () =>{
   return http.get('/listenings/find/');
}
const findSlug= slug =>{
   return http.get(`/listenings/find/${slug}`);
}


const findNew= limit =>{
   return http.get(`/listenings/findnew/${limit}`);
}

 const ListeningService = {findAll, findSlug, findNew};
 
 export default ListeningService;