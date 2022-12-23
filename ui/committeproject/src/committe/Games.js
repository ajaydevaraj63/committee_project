import React, { useState, useEffect } from 'react'

import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Card, CardContent, Input, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import Configuration from './Configuration'


const Games = () => {
    const [file, setFile] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')


    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("Event Name=====");
        axios.get(Configuration.devUrl+'Event/events').then((response) => {
            console.log("sucess", response.data);
            setData(response.data);
        });

    }, []);



    axios.interceptors.request.use(
        config => {
          config.headers.Authorization =JSON.parse(localStorage.getItem("Profile")).Token;
              return config;
          },
          error => {
              return Promise.reject(error);
          }
      );


    function handleChange(event) {
        setFile(event.target.files[0])

    }

    async function handleSubmit(event) {
        event.preventDefault()



        const url = Configuration.devUrl+'game/postgame';
        const formData = new FormData();
        formData.append('RulesPdf', file);
        formData.append('GameName', name);
        formData.append('GameDesc', description);
        formData.append('UserId', "124235");
        formData.append('StartDate', new Date);
        formData.append('EndDate', new Date);

        alert("success");

        console.log(formData);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',

            },
        };
        try {
            await axios
                .post(url, formData)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log("res", err);
                });

        }
        catch (error) {
            console.log(error);
        }

    }


    return (


        <div>
            <Card sx={{ maxWidth: 900 }}
                style={{
                    borderRadius: '25px',
                    position: 'absolute',
                    top: '55%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    border: 'none',
                    boxShadow: '34',
                    padding: '40px',
                    width: '50%',
                    maxWidth: '750px'
                    
                }}

            >
                <CardContent>

                <Typography color="textSecondary" align="center" variant="h4">
                         Create Games
                           </Typography>
                    <hr />
                    <form className='' onSubmit={handleSubmit}>
                        <FormControl fullWidth sx={{ m: 3 }} >
                            <InputLabel id="demo-simple-select-label" sx={{ml:9,}}>Event Name</InputLabel>
                            <Select labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="EVent Name"
                                sx={{ ml:9,
                                    width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                    "& .MuiInputBase-root": {
                                        height: 60
                                    }
                                }}
                                >
                                {
                                    data.map(event=>{
                                        return (
                                            <MenuItem value={event.EventName}>{event.EventName}</MenuItem>

                                        )
                                    })

                                }
                                

                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 3 }} variant="filled">
                            <TextField id="outlined-basic" label="Game Name" variant="outlined"

                                sx={{ ml:9,
                                    width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                    "& .MuiInputBase-root": {
                                        height: 60
                                    }
                                }}
                                onChange={(e) => setName(e.target.value)} />


                        </FormControl>
                        <FormControl fullWidth sx={{ m: 3 }} variant="filled">
                            <TextField id="outlined-basic" label="Game Description" variant="outlined"

                                sx={{ ml:9,
                                    width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                    "& .MuiInputBase-root": {
                                        height: 60
                                    }
                                }}
                                onChange={(e) => setDescription(e.target.value)} />

                        </FormControl>

                        <FormControl fullWidth sx={{ m: 3 }} variant="filled">
                            <TextField type="Date"
                                sx={{ ml:9,
                                    width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                    "& .MuiInputBase-root": {
                                        height: 60
                                    }
                                }}
                                autoComplete="off" name='Date' size="small" id="exampleFormControlInput1" onChange={(e) => setName(e.target.value)} label="Start Date" InputLabelProps={{
                                    shrink: true,
                                }} />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 3 }} variant="filled">
                            <TextField type="Date"
                                sx={{ ml:9,
                                    width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                    "& .MuiInputBase-root": {
                                        height: 60
                                    }
                                }}
                                autoComplete="off" name='Date' size="small" id="exampleFormControlInput1" onChange={(e) => setName(e.target.value)} label="End Date" InputLabelProps={{
                                    shrink: true,
                                }} />
                        </FormControl>
                        <FormControl sx={{ m: 2 }}>
                            
                            <Input type="file" accept='.pdf' onChange={handleChange} sx={{ml:10}}></Input>
                            {/* <FileUpload value={file} onChange={setFile} /> */}
                            {/* <InputLabel type="file" accept='.pdf' onChange={handleChange}/> */}
                            {/* <input className='form-control' type="file" accept='.pdf' onChange={handleChange} /> */}
                        </FormControl>
                        <Button size="md" onClick={handleSubmit} color="primary" sx={{mt:3,ml:3}} >
                        Upload
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Games