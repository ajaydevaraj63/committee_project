import FilledInput from '@mui/material/FilledInput';
import React, { useState } from 'react'
import './Event.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';


const Event = () => {
    const [file, setFile] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')


    function handleChange(event) {
        setFile(event.target.files[0])

    }

    async function handleSubmit(event) {
        event.preventDefault()
        
        const url = Configuration.devUrl+'event/postevent';
        const formData = new FormData();
        formData.append('File', file);
        formData.append('EventName', name);
        formData.append('EventDescription', description);
        formData.append('UserId', "124235365463125");
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
        <div className='body'>
            <div className="container">
                <div className="row">
                    <div className="col col-12">
                        <div className="headContainer">
                            <h1 className="heading">Create Event</h1>

                        </div>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-12'>
                        <div className='row'>

                            <div className='col col-5'>
                                <div className='row g-2'>

                                    <div><div className='EventDetailsContainer'>
                                        <div className=' col col-12' >
                                            <form className='' onSubmit={handleSubmit}>
                                                <FormControl fullWidth sx={{ m: 3 }} variant="filled">
                                                    <InputLabel htmlFor="filled-adornment-amount" >Event Name</InputLabel>
                                                    <FilledInput

                                                        id="filled-adornment-amount"
                                                        sx={{
                                                            width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                                            "& .MuiInputBase-root": {
                                                                height: 80
                                                            }
                                                        }}

                                                        onChange={(e) => setName(e.target.value)} />
                                                </FormControl>
                                                <FormControl fullWidth sx={{ m: 3 }} variant="filled">
                                                    <InputLabel htmlFor="filled-adornment-amount" >Event Dscription</InputLabel>
                                                    <FilledInput
                                                        id="filled-adornment-amount"
                                                        sx={{
                                                            width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                                            "& .MuiInputBase-root": {
                                                                height: 80
                                                            }
                                                        }}
                                                        onChange={(e) => setDescription(e.target.value)} />
                                                </FormControl>
                                                                                           

                                            </form>

                                        </div>
                                
                                    </div></div>
                                   

                                </div>
                               

                            </div>

                        </div>

                    </div>
                </div>
                <div className='row m-4'>
                                <div className='col col-2'></div>

                                <div className='col col-3'> 
                                             <input className='form-control' type="file" onChange={handleChange} />
                                             </div>
                                             <div className='col col-3'>
                                                  <div className='row'><button onClick={handleSubmit} className='btn btn-dark' >Upload</button>
                                                  </div>
                                         </div>
                                </div>
            </div>
        </div>
    )
}

export default Event