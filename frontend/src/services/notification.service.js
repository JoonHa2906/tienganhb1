import http from '../config/http-common.js';

const findAll= data =>{
   return http.post('/notifications/find/', data);
}
const findNew= data =>{
   return http.post('/notifications/findNew/', data);
}

const deleteNotification= data =>{
   return http.post('/notifications/deleteNotification/', data);
}

const create= data =>{
   return http.post('/notifications/create/', data);
}

 const NotificationService = {findAll, findNew, deleteNotification, create};
 
 export default NotificationService;