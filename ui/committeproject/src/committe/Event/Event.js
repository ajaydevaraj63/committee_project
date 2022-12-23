import React, { useState } from 'react'

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Button from '@mui/material/Button';
import { CardContent, Input } from '@mui/material';
import { Typography } from '@material-ui/core';
import Configuration from '../Configuration'

axios.interceptors.request.use(
    config => {
      config.headers.Authorization =JSON.parse(localStorage.getItem("Profile")).Token;
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );



const Event = () => {
    
    const [file, setFile] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    function handleChange(event) {
        setFile(event.target.files[0])

    }

    async function handleSubmits(event) {
        event.preventDefault()
        
        const url = Configuration.devUrl+'event/postevent';
        const formData = new FormData();
        formData.append('File', file);
        formData.append('EventName', name);
        formData.append('EventDescription', description);
        formData.append('UserId', "124235365463125");
        console.log(formData);
        alert('success');
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

          <div >
            <card sx={{ maxWidth: 900 }}
                style={{ borderRadius:'25px',
                    position:'absolute',
                    top:'50%',
                    left:'50%',
                    transform:'translate(-50%, -50%)',
                    backgroundColor:'white',
                    border:'none',
                    boxShadow:'34',
                    padding:'40px',
                    width:'50%',
                    maxWidth:'750px'}}

                    
           >
              <CardContent>
              
              <Typography color="textSecondary" align="center" variant="h4">
            Create Events
      </Typography>
                <hr />
              <form className='' onSubmit={handleSubmits}>
            <FormControl fullWidth sx={{ m: 3 }} variant="filled">
            <TextField id="outlined-basic" label="Event Name" variant="outlined"
                              
                        sx={{ ml:9,
                             width: { sm: 200, md: 200, lg: 300, xl: 400 },
                             "& .MuiInputBase-root": {
                                 height: 60
                                 }
                                }}
                                onChange={(e) => setDescription(e.target.value)} />

                         </FormControl>
                        <FormControl fullWidth sx={{ m: 3}} variant="filled">
                        <TextField id="outlined-basic" label="Event Description" variant="outlined"
                                
                                sx={{ml:9,
                                    width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                    "& .MuiInputBase-root": {
                                        height: 60
                                    }
                                }}
                                onChange={(e) => setName(e.target.value)} />
                                 </FormControl> 
                                 <FormControl fullWidth sx={{ m: 3 }} variant="filled">
                                                        <TextField type="Date"  
                                                        sx={{ml:9,
                                                            width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                                            "& .MuiInputBase-root": {
                                                                height: 60
                                                            }
                                                        }}
                                                         autoComplete="off" name='Date' size="small" id="exampleFormControlInput1"  onChange={(e) => setName(e.target.value)} label="Start Date" InputLabelProps={{
                                                            shrink: true,
                                                        }} />
                                                     </FormControl>         
                                                     <FormControl fullWidth sx={{ m: 3 }} variant="filled">
                                                        <TextField type="Date"  
                                                        sx={{ml:9,
                                                            width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                                            "& .MuiInputBase-root": {
                                                                height: 60
                                                            }
                                                        }}
                                                         autoComplete="off" name='Date' size="small" id="exampleFormControlInput1"  onChange={(e) => setName(e.target.value)} label="End Date" InputLabelProps={{
                                                            shrink: true,
                                                        }} />
                                                  </FormControl>
                                 <FormControl sx={{ m: 3}}>
                                 
                                    <Input type="file" onChange={handleChange} sx={{ml:9}}/>
                                 </FormControl>
                                 <Button size="md" onClick={handleSubmits} color="primary"sx={{mt:3}} >
                                    Upload
                                    </Button>      
                            </form>
              </CardContent>
            </card>
          </div>
    )
}

export default Event