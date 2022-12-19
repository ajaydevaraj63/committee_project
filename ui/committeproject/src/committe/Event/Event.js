import React, { useState } from 'react'
import './Event.css';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Button from '@mui/material/Button';
import { CardContent } from '@mui/material';

const Event = () => {
    const [file, setFile] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    function handleChange(event) {
        setFile(event.target.files[0])

    }

    async function handleSubmit(event) {
        event.preventDefault()
        
        const url = 'http://localhost:4006/event/postevent';
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
              <div className="headContainer">
                <h1 className="heading" >Create Games</h1>
                </div>
                <hr />
              <form className='' onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ m: 3 }} variant="filled">
            <TextField id="outlined-basic" label="Game Name" variant="outlined"

                                sx={{
                                    width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                    "& .MuiInputBase-root": {
                                        height: 60
                                    }
                                }}
                                onChange={(e) => setDescription(e.target.value)} />

                         </FormControl>
                        <FormControl fullWidth sx={{ m: 3 }} variant="filled">
                        <TextField id="outlined-basic" label="Game Description" variant="outlined"

                                sx={{
                                    width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                    "& .MuiInputBase-root": {
                                        height: 60
                                    }
                                }}
                                onChange={(e) => setName(e.target.value)} />
                                 </FormControl> 
                                 <FormControl sx={{ m: 3 }}   >
                                 <input className='form-control' type="file" onChange={handleChange} 
                                 />
                                 </FormControl>
                                 <Button size="md" onClick={handleSubmit} color="success" >
                                    Upload
                                    </Button>
                                    
                            </form>
              </CardContent>
            </card>
          </div>
    )
}

export default Event