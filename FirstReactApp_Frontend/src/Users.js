import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import Axios from "axios";
import React, { useState, useEffect } from "react";

const Users = () => {
   const [users, setUsers] = useState([]);
   const [submitted, setSubmitted] = useState(false);
   const [selectedUser, setSelectedUser] = useState();
   const [isEdit, setisEdit] = useState(false); 


   useEffect(() => {
      getUsers();
   }, []);

   const getUsers = async () => {
      Axios.get(process.env.REACT_APP_ENDPOINT + "/api/users")
         .then((response) => {
            setUsers(response.data?.response || []);
         })
         .catch((error) => {
            console.error("There was an error fetching the users!", error);
         });
   }

   const addUser = async (data) => {
      setSubmitted(true);
      const payload = {
         id: data.id,
         name: data.name,
      };
      Axios.post(process.env.REACT_APP_ENDPOINT + "/api/createusers", payload)
         .then((response) => {
            getUsers();
            setSubmitted(false);
            isEdit(false);
         })
         .catch((error) => {
            console.error("There was an error adding the user!", error);
         });
   }

   const updateUser = async (data) => {
      setSubmitted(true);
      const payload = {
         id: data.id,
         name: data.name,
      };
      Axios.put(process.env.REACT_APP_ENDPOINT +"/api/updateusers", payload)
         .then((response) => {
            getUsers();
            setSubmitted(false);
            setisEdit(false);        // Reset edit mode
            setSelectedUser(null);   // Clear selected user
         })
         .catch((error) => {
            console.error("There was an error updating the user!", error);
         });
   }

   const deleteUser = async (id) => {
      Axios.delete(process.env.REACT_APP_ENDPOINT + "/api/deleteusers", { data: { id } })
         .then((response) => {
            getUsers();
         })
         .catch((error) => {
            console.error("There was an error deleting the user!", error);
         });
   }

   return (
      <Box 
         sx ={{width: 'calc(100% - 100px)', margin: 'auto',marginTop: '100px',}}>
         <UserForm
            addUser={addUser}
            updateUser={updateUser}
            submitted={submitted}
            data= {selectedUser}  
            isEdit={isEdit}
         />
         <UsersTable 
            rows={users} 
            selectedUser={data => {
               setSelectedUser(data);
               setisEdit(true);
            }}
            deleteUser={deleteUser} // <-- pass deleteUser to table
         />
      </Box>
   );
}

export default Users;
