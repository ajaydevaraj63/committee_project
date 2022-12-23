import React, { useState, useEffect } from 'react'
import { Card, TableBody } from '@mui/material'
import axios from 'axios';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
axios.interceptors.request.use(
    config => {
      config.headers.Authorization =JSON.parse(localStorage.getItem("Profile")).Token;
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );


export const ListCommittee = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        console.log("api cal====");
        axios.get(Configuration.devUrl+'users/getCommitteMember').then((response) => {
            console.log("sucess", response.data);
            setData(response.data)
        });

    }, []);



    return (
        <div>
            <Card sx={{ maxWidth: 1300 }}>
                <TableBody >

                    <TableBody>
                        {data.map((value, key) => {

                            return (
                                <TableRow>

                                    <TableCell align="left">{value.UserName}</TableCell>
                                </TableRow>
                            );
                        })}

                    </TableBody>
                </TableBody>

            </Card>

        </div>
    )
}