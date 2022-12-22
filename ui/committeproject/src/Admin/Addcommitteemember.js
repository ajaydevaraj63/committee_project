import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import {
    Stack,
    Button,
    Container,
    Typography,
} from '@mui/material';
// import Iconify from '../components/iconify';
axios.interceptors.request.use(
    config => {
      config.headers.Authorization =JSON.parse(localStorage.getItem("Profile")).Token;
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );



export default function Addcommitteemember() {
    const [groupMember, setGroupmemebr] = useState('select');
    const [userList, setUserlist] = useState([]);
    const [objects, setObjects] = useState([]);
    const [mailist, setMaillist] = useState([]);
    const [employeelist, setEmployeelist] = useState([]);

    const disp = (e) => {

        console.log("efewfwef", e)
        const data = e;
        console.log('data', e);
        setMaillist(data);
    }


    useEffect(() => {
        const listgroupusers = []
        const listobject = []
        const getUserlist = async () => {
            console.log("ap call====================");
            const reqData = await axios.get('http://localhost:4006/users/Display/AddUsersToNewGroup');
            const reqsData = await reqData.data;
            console.log("reqData", reqsData);

            for (let i = 0; i < reqsData.length; i += 1) {
                listgroupusers.push(reqsData[i].Email);
                listobject.push(reqsData[i]);
                console.log('kk', listobject);
            }
            setUserlist(listgroupusers);
            setObjects(listobject);

        }
        getUserlist();

    }, []);

    const Groupmembersubmit = async () => {
        const emplist = []
        console.log('nnnnnnnnnnnnnnnnnnnnnnnn', mailist);
        console.log('ooooooooooooooooo', objects)
        const promise1 = new Promise((resolve, reject) => {

            for (let i = 0; i < mailist.length; i += 1) {
                for (let j = 0; j < objects.length; j += 1) {
                    if (mailist[i] === objects[j].Email) {
                        console.log(objects[i]._id)
                        emplist.push(objects[j]._id);
                        console.log('bbbbbbbbbbbb', emplist);
                    }
                }
            }
            resolve();
        });
        promise1.then(() => {
            setEmployeelist(emplist);
        });
        console.log('success', employeelist);
        const Gid = sessionStorage.getItem('Gid')
        console.log("AddUserto group=======", Gid);
        console.log(emplist);
        axios.put("http://localhost:4006/group/Update/Multiple/UsersGroup/".concat(Gid), emplist).then((response) => {
            console.log("check", response);


        })
    }

    return (
        <div>
            <Helmet>
                <title>Admin | AddCommitteeMember</title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

                    <Typography variant="h4" gutterBottom>
                        Add Committee Member
                    </Typography>
                </Stack>
                <Stack spacing={6}>
                    <Multiselect
                        value={groupMember}
                        isObject={false}
                        onRemove={(event) => { disp(event) }}
                        onSelect={(event) => { disp(event) }}
                        options={userList}
                        showCheckbox
                    />
                    <Button variant="contained" sx={{ m: 2, width: '15ch' }} onClick={() => Groupmembersubmit()} >
                        Submit
                    </Button>
                </Stack>
            </Container>
        </div>
    );

}