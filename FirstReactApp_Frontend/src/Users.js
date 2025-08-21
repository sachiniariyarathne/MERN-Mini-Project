import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import Axios from "axios";
import React, { useState, useEffect } from "react";

const Users = () => {
   const [users, setUsers] = useState([]);
   const [submitted, setSubmitted] = useState(false);

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

   const addUser = async (data) => {
      setSubmitted(true);
      const payload = {
         id: data.id,
         name: data.name,
      };
      Axios.post("http://localhost:3001/api/createusers", payload)
         .then((response) => {
            getUsers();
            setSubmitted(false);
         })
         .catch((error) => {
            console.error("There was an error adding the user!", error);
         });
   }

   return (
      <Box 
         sx ={{width: 'calc(100% - 100px)', margin: 'auto',marginTop: '100px',}}>
         <UserForm
            addUser={addUser}
            submitted={submitted}
         />
         <UsersTable rows={users} />
      </Box>
   );
}

export default Users;
