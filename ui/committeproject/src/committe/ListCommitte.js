import React, { useState, useEffect } from 'react'
import { Card, TableBody } from '@mui/material'
import axios from 'axios';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


export const ListCommittee = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        console.log("api cal====");
        axios.get('http://localhost:4006/users/getCommitteMember').then((response) => {
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