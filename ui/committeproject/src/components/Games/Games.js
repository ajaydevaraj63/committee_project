// import React,{useState} from 'react'
// import './Games.css';
// import FormControl from '@mui/material/FormControl';
// import axios from 'axios';
// import TextField from '@mui/material/TextField';
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // import { CKEditor } from '@ckeditor/ckeditor5-react';
// // import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// //  import {CKEditor} from '../../../build/ckeditor';




// const Games = () => {
//     const [value, setValue] = React.useState(null);
//     const [values, setValues] = React.useState(null);
//     const [file, setFile] = useState('')
//     const [name, setName] = useState('')
//     const [description, setDescription] = useState('')
    
    
//     function handleChange(event) {
//         setFile(event.target.files[0])

//     }

//     async function handleSubmit(event) {
//         event.preventDefault()



//         const url = Configuration.devUrl+'game/postgame';
//         const formData = new FormData();
//         formData.append('RulesPdf', file);
//         formData.append('GameName', name);
//         formData.append('GameDesc', description);
//         formData.append('UserId', "124235");
//         formData.append('StartDate', new Date);
//         formData.append('EndDate', new Date);

//        alert("success");

//         console.log(formData);
//         const config = {
//             headers: {
//                 'content-type': 'multipart/form-data',

//             },
//         };
//         try {
//             await axios
//                 .post(url, formData)
//                 .then((res) => {
//                     console.log(res);
//                 })
//                 .catch((err) => {
//                     console.log("res", err);
//                 });

//         }
//         catch (error) {
//             console.log(error);
//         }
//     }




//   return (
//     <div className='body'>
//             <div className="container">
//                 <div className="row">
//                     <div className="col col-12">
//                         <div className="headContainer">
//                             <h1 className="heading">Create Games</h1>

//                         </div>
//                         <hr />
//                     </div>
//                 </div>
//                 <div className='row'>
//                     <div className='col col-12'>
//                         <div className='row'>

//                             <div className='col col-5'>
//                                 <div className='row g-2'>

//                                     <div><div className='EventDetailsContainer'>
//                                         <div className=' col col-12' >
//                                             {/* <CKEditor
//                                                 editor={ ClassicEditor } /> */}

//                                             <form className='' onSubmit={handleSubmit}>
//                                                 <FormControl fullWidth sx={{ m: 3 }} variant="filled">
//                                                 <TextField id="outlined-basic" label="Game Description" variant="outlined" 

//                                                         sx={{
//                                                         width: { sm: 200, md: 200, lg: 300, xl: 400 },
//                                                         "& .MuiInputBase-root": {
//                                                             height: 60
//                                                         }
//                                                         }}
//                                                         onChange={(e) => setName(e.target.value)} />  

//                                                     {/* <InputLabel htmlFor="filled-adornment-amount" >Game Name</InputLabel>
//                                                     <FilledInput

//                                                         id="filled-adornment-amount"
//                                                         sx={{
//                                                             width: { sm: 200, md: 200, lg: 300, xl: 400 },
//                                                             "& .MuiInputBase-root": {
//                                                                 height: 80
//                                                             }
//                                                         }}

//                                                         onChange={(e) => setName(e.target.value)} /> */}
//                                                 </FormControl>
//                                                 <FormControl fullWidth sx={{ m: 3 }} variant="filled">
//                                                 <TextField id="outlined-basic" label="Game Name" variant="outlined" 

//                                                             sx={{
//                                                             width: { sm: 200, md: 200, lg: 300, xl: 400 },
//                                                             "& .MuiInputBase-root": {
//                                                                 height: 60
//                                                             }
//                                                             }}
//                                                             onChange={(e) => setDescription(e.target.value)} />
                                                            
//                                                     {/* <InputLabel htmlFor="filled-adornment-amount" >Game Dscription</InputLabel>
//                                                     <FilledInput
//                                                         id="filled-adornment-amount"
//                                                         sx={{
//                                                             width: { sm: 200, md: 200, lg: 300, xl: 400 },
//                                                             "& .MuiInputBase-root": {
//                                                                 height: 80
//                                                             }
//                                                         }}
//                                                         onChange={(e) => setDescription(e.target.value)} /> */}
//                                                 </FormControl> 
//                                                 <FormControl fullWidth sx={{ m: 3 }} variant="filled">
//                                                 {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                                     <DatePicker
//                                                         label="Start Date"
//                                                         value={value}
//                                                         onChange={(newValue) => {
//                                                         setValue(newValue);
//                                                         }}
//                                                         renderInput={(params) => <TextField {...params} />}
                                                    
//                                                         sx={{
//                                                             width: { sm: 200, md: 200, lg: 300, xl: 400 },
//                                                             "& .MuiInputBase-root": {
//                                                                 height: 60
//                                                             }
//                                                             }}
//                                                     />
//                                                     </LocalizationProvider>    */}
//                                                     </FormControl>    

//                                                  <FormControl fullWidth sx={{ m: 3 }} variant="filled">
//                                                 {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                                     <DatePicker
//                                                         label="End Date"
//                                                         value={values}
//                                                         onChange={(newValue) => {
//                                                         setValues(newValue);
//                                                         }}
//                                                         renderInput={(params) => <TextField {...params} />}
                                                    
//                                                         sx={{
//                                                             width: { sm: 200, md: 200, lg: 300, xl: 400 },
//                                                             "& .MuiInputBase-root": {
//                                                                 height: 60
//                                                             }
//                                                             }}
//                                                     />
//                                                     </LocalizationProvider>    */}
//                                                     </FormControl>                        
//                                          </form>
//                                         </div>
//                                     </div></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='row m-4'>
//                                 <div className='col col-2'></div>

//                                 <div className='col col-3'> 
//                                      <input className='form-control' type="file" accept='.pdf' onChange={handleChange} />
//                                          </div>
//                                         <div className='col col-3'>
//                                      <div className='row'><button onClick={handleSubmit} className='btn btn-dark' >Upload</button>
//                                  </div>
//                              </div>
//                        </div>
//                   </div>
//              </div>
//   )
// }

// export default Games




    