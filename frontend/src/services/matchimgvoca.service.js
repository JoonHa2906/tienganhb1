import http from '../config/http-common.js';

const findAll= () =>{
   return http.get('/matchimgvocas/find/');
}
const findSlug= slug =>{
   return http.get(`/matchimgvocas/find/${slug}`);
}


const findNew= limit =>{
   return http.get(`/matchimgvocas/findnew/${limit}`);
}

 const MatchimgvocaService = {findAll, findSlug, findNew};
 
 export default MatchimgvocaService;