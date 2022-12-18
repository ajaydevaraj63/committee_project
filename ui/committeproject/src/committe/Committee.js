import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Button, Card, CardActions, CardContent, Menu, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';


export default function Committee() {

    // Open Menu ============================================================================================

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // close menu =============================================================================================

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Modify Committee modal =================================================================================

    const [modify, setModify] = useState(false);
    function handleModifyCommitteeModal() {
        setModify(true);
        handleClose();
    }
    const handleModalClose = () => setModify(false);



    return (

        <div>
            <Card sx={{ maxWidth: 1300 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 20 }} variant="h4" color="text.dark" gutterBottom>
                        Committee Room
                        <ArrowDropDownIcon
                            onClick={handleClick}
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        />
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button"
                            }}
                        >
                            <MenuItem  >View Members</MenuItem>
                            <MenuItem onClick={() => handleModifyCommitteeModal()}>Modify Committee</MenuItem>
                        </Menu>
                    </Typography>
                    <Typography component="div" sx={{ fontSize: 13 }} variant>
                        17 Members &nbsp; Restricted
                    </Typography>




                </CardContent>
            </Card>

            {/* Modify Committee modal=============================================================== */}

            <Modal open={modify} onClose={handleModalClose} center>
                <Card 
                sx={{ borderRadius:'10px',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%, -50%)',
                backgroundColor:'white',
                border:'none',
                boxShadow:'24',
                padding:'40px',
                width:'50%',
                maxWidth:'750px'}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" align="center" component="div">
                            Modify Committee
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align="center">
                            <form>
                                <TextField id="outlined-basic" label="Captain" variant="outlined" sx={{ width: 500 }} />
                                <Button> Change</Button>
                                <br />
                                <br />
                                <TextField id="outlined-basic" label=" Vice Captain" variant="outlined" sx={{ width: 500 }} />
                                <Button> Change</Button>
                            </form>
                        </Typography>
                    </CardContent>
                    <CardActions >
                        <Typography gutterBottom variant="h5" component="div">
                            <Button size="small">Save</Button>
                        </Typography>
                    </CardActions>
                </Card>
            </Modal>
        </div>
    )
}

