import React, { useState } from 'react'
import './Games.css';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Card, CardContent } from '@mui/material';




const Games = () => {
    const [file, setFile] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')


    function handleChange(event) {
        setFile(event.target.files[0])

    }

    async function handleSubmit(event) {
        event.preventDefault()



        const url = 'http://localhost:4006/game/postgame';
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
                    top: '50%',
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
                                onChange={(e) => setName(e.target.value)} />


                        </FormControl>
                        <FormControl fullWidth sx={{ m: 3 }} variant="filled">
                            <TextField id="outlined-basic" label="Game Description" variant="outlined"

                                sx={{
                                    width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                    "& .MuiInputBase-root": {
                                        height: 60
                                    }
                                }}
                                onChange={(e) => setDescription(e.target.value)} />

                        </FormControl>

                        <FormControl fullWidth sx={{ m: 3 }} variant="filled">
                            <TextField type="Date"
                                sx={{
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
                                sx={{
                                    width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                    "& .MuiInputBase-root": {
                                        height: 60
                                    }
                                }}
                                autoComplete="off" name='Date' size="small" id="exampleFormControlInput1" onChange={(e) => setName(e.target.value)} label="End Date" InputLabelProps={{
                                    shrink: true,
                                }} />
                        </FormControl>
                        <FormControl>
                            <input className='form-control' type="file" accept='.pdf' onChange={handleChange} />
                        </FormControl>
                        <button onClick={handleSubmit} className='btn btn-dark' >Upload</button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Games



