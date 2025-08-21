import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import Axios from "axios";
import React, { useState, useEffect } from "react";

const Users = () => {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      getUsers();
   }, []);

   const getUsers = async () => {
      Axios.get("http://localhost:3001/api/users")
         .then((response) => {
            setUsers(response.data?.response || []);
         })
         .catch((error) => {
            console.error("There was an error fetching the users!", error);
         });
   }

   return (
      <Box 
         sx ={{width: 'calc(100% - 100px)', margin: 'auto',marginTop: '100px',}}>
         <UserForm />
         <UsersTable rows={users} />
      </Box>
   );
}

export default Users;
