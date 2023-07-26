import React, { useState ,useEffect} from 'react'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Configuration from "../Configuration";
import Button from '@mui/material/Button';
import { CardContent, Input, Modal } from '@mui/material';
import { Typography } from '@material-ui/core';

axios.interceptors.request.use(
    config => {
      config.headers.Authorization =JSON.parse(localStorage.getItem("Profile")).Token;
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );



const Event = ({handleCloseModal,openModal}) => {
    
    const [file, setFile] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')

    function handleChange(event) {
        setFile(event.target.files[0])

    }
    const [value, setValue] = useState(null);

    useEffect(() => {
      const storedValue = window.localStorage.getItem("Profile");
      const pasedValue = JSON.parse(storedValue);
      setValue(pasedValue._id);
    }, []);

    const handleName = (e) =>{
        setName(e.target.value)
    }


    console.log(value);

    async function handleSubmits(event) {
        event.preventDefault()
        
        const url = Configuration.devUrl+"event/postevent";
        const formData = new FormData();
        formData.append('File', file);
        formData.append('EventName', name);
        formData.append('EventDescription', description);
        formData.append('StartDate', startDate);
        formData.append('EndDate', endDate);
        formData.append('UserId', value);
        
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

          <div >
            <Modal open={openModal} onClose={handleCloseModal}>
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
                                onChange={(e) => handleName(e)}
                               
                                 />
                               
                         </FormControl>
                        <FormControl fullWidth sx={{ m: 3}} variant="filled">
                        <TextField id="outlined-basic" label="Event Description" variant="outlined"
                                
                                sx={{ml:9,
                                    width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                    "& .MuiInputBase-root": {
                                        height: 60
                                    }
                                }}
                                onChange={(e) => setDescription(e.target.value)}
                                 />
                                 </FormControl> 
                                 <FormControl fullWidth sx={{ m: 3 }} variant="filled">
                                                        <TextField type="Date"  
                                                        sx={{ml:9,
                                                            width: { sm: 200, md: 200, lg: 300, xl: 400 },
                                                            "& .MuiInputBase-root": {
                                                                height: 60
                                                            }
                                                        }}
                                                         autoComplete="off" name='Date' size="small" id="exampleFormControlInput1"  onChange={(e) => setStartDate(e.target.value)}  label="Start Date" InputLabelProps={{
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
                                                         autoComplete="off" name='Date' size="small" id="exampleFormControlInput1"  onChange={(e) => setEndDate(e.target.value)} label="End Date" InputLabelProps={{
                                                            shrink: true,
                                                        }} />
                                                  </FormControl>
                                 <FormControl sx={{ m: 3}}>
                                 
                                    <Input type="file" onChange={handleChange} sx={{ml:9}}/>
                                 </FormControl>
                                 {/* <Button size="md" onClick={handleSubmits} color="primary"sx={{mt:3}} >
                                    Submit
                                    </Button>    */}
                                    <Button variant="contained" size="md" onClick={handleSubmits} sx={{mt:10,ml:15}}>Submit</Button>   
                            </form>
              </CardContent>
            </card>
            
            </Modal>
          </div>
    )
}

export default Event