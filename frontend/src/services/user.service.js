import http from '../config/http-common.js';

const createByEmail=data =>{
   return http.post('/users/email/', data);
}
const createByGoogle=data =>{
   return http.post('/users/google/',data);
}
const updateVerification=(email, verificationCode) =>{
   return http.put(`/users/verification/${email}/${verificationCode}`);
}
const sendPassword = email=>{
   return http.post(`/users/sendpassword`, email);
}

const loginUser = data=>{
   return http.post(`/users/loginuser`, data);
}
const findAll= () =>{
   return http.get('/users/find/');
}

const findOne=email =>{
   return http.get(`/users/find/${email}`);
}
const update=(id, data) =>{
   return http.put(`/users/update/${id}`, data);
}
// Delete a User with id
const del=id =>{
   return http.delete(`/users/del/${id}`);
}
const deleteAll=() =>{
   return http.delete(`/users/del/`);
}
 const UserService = {createByEmail,createByGoogle,updateVerification,sendPassword,loginUser,findAll,findOne,update,del,deleteAll};
 
 export default UserService;