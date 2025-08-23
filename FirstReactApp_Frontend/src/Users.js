import { Box, Typography, Paper, Divider } from "@mui/material";
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
            setisEdit(false);
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
            setisEdit(false);
            setSelectedUser(null);
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
         sx={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #e3f2fd 0%, #fff 100%)",
            py: 6,
         }}
      >
         <Paper
            elevation={4}
            sx={{
               maxWidth: 700,
               margin: "auto",
               p: 4,
               borderRadius: 4,
               boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}
         >
            <Typography variant="h4" align="center" fontWeight={700} color="primary" gutterBottom>
               User Management
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <UserForm
               addUser={addUser}
               updateUser={updateUser}
               submitted={submitted}
               data={selectedUser}
               isEdit={isEdit}
            />
            <Divider sx={{ my: 3 }} />
            <UsersTable
               rows={users}
               selectedUser={data => {
                  setSelectedUser(data);
                  setisEdit(true);
               }}
               deleteUser={deleteUser}
            />
         </Paper>
      </Box>
   );
}

export default Users;
