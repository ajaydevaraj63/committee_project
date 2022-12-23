import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Popover,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
axios.interceptors.request.use(
  config => {
    config.headers.Authorization =JSON.parse(localStorage.getItem("Profile")).Token;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "", label: "", alignRight: false },
  { id: "name", label: "Event ", alignRight: false },
  { id: "role", label: "Point", alignRight: false },
  { id: "createDate", label: "Date", alignRight: false },
];
const TABLE2_HEAD = [
  { id: "", label: "", alignRight: false },
  { id: "name", label: "Event ", alignRight: false },
  { id: "role", label: "Point", alignRight: false },
  { id: "createDate", label: "Date", alignRight: false },
];

// ----------------------------------------------------------------------
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(3);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("ap call====================");
    axios.get(Configuration.devUrl+"Point/getAll").then((response) => {
      console.log("sucess", response.data);
      setData(response.data);
    });
  }, []);

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      // array.filter(user=>{
      //   console.log('====================================');
      //   console.log(user.Eventlist[0].EventName);
      //   console.log('====================================');
      // })
      // return array;
      return filter(
        array,
        (_user) =>
          _user.Eventlist[0].EventName.toLowerCase().indexOf(
            query.toLowerCase()
          ) !== -1 ||
          _user.grouplist[0].GroupName.toLowerCase().indexOf(
            query.toLowerCase()
          ) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.UserName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, UserName) => {
  //   const selectedIndex = selected.indexOf(UserName);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, UserName);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredUsers = applySortFilter(
    data,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <>
      <Helmet>
        <title> Game and Events | point table </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Events
          </Typography>
        </Stack>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Live" {...a11yProps(0)} />
              <Tab label="All" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Card>
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 200, maxWidth: 1200 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={data.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredUsers
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          const {
                            id,
                            GameId,
                            // role,
                            Eventlist,
                            grouplist,
                            createdAt,
                            gameList,
                            GamePoint,
                            // avatarUrl,
                          } = row;
                          const selectedUser = selected.indexOf(GameId) !== -1;

                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={selectedUser}
                            >
                              <TableCell padding="checkbox"></TableCell>

                              <TableCell component="th" scope="row" padding="">
                                {/* <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            > */}
                                {/* <Avatar alt={UserName} src={avatarUrl} /> */}
                                {Eventlist.map((value) => (
                                  <Typography variant="subtitle2" noWrap>
                                    {value.EventName}
                                  </Typography>
                                ))}
                                {/* </Stack> */}
                              </TableCell>
                              

                              <TableCell align="left">{GamePoint}</TableCell>
                              <TableCell align="left">
                                {new Date(createdAt).toLocaleDateString(
                                  "en-us",
                                  options
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={9} />
                        </TableRow>
                      )}
                    </TableBody>

                    {isNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={3} sx={{ py: 3 }}>
                            <Paper
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              <Typography variant="h6" paragraph>
                                Not found
                              </Typography>

                              <Typography variant="body2">
                                No results found for &nbsp;
                                <strong>&quot;{filterName}&quot;</strong>.
                                <br /> Try checking for typos or using complete
                                words.
                              </Typography>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[2, 3, 4]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Card>
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 200, maxWidth: 1200 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE2_HEAD}
                      rowCount={data.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredUsers
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          const {
                            id,
                            GameId,
                            // role,
                            Eventlist,
                            grouplist,
                            createdAt,
                            gameList,
                            GamePoint,
                            // avatarUrl,
                          } = row;
                          const selectedUser = selected.indexOf(GameId) !== -1;

                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={selectedUser}
                            >
                              <TableCell padding="checkbox"></TableCell>

                              <TableCell component="th" scope="row" padding="">
                                {/* <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            > */}
                                {/* <Avatar alt={UserName} src={avatarUrl} /> */}
                                {Eventlist.map((value) => (
                                  <Typography variant="subtitle2" noWrap>
                                    {value.EventName}
                                  </Typography>
                                ))}
                                {/* </Stack> */}
                              </TableCell>
                              <TableCell component="th" scope="row" padding="">
                                {/* <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            > */}
                                {/* <Avatar alt={UserName} src={avatarUrl} /> */}
                                {gameList.map((value) => (
                                  <Typography variant="subtitle2" noWrap>
                                    {value.GameName}
                                  </Typography>
                                ))}
                                {/* </Stack> */}
                              </TableCell>
                              

                              <TableCell align="left">{GamePoint}</TableCell>
                              <TableCell align="left">
                                {new Date(createdAt).toLocaleDateString(
                                  "en-us",
                                  options
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={9} />
                        </TableRow>
                      )}
                    </TableBody>

                    {isNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={3} sx={{ py: 3 }}>
                            <Paper
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              <Typography variant="h6" paragraph>
                                Not found
                              </Typography>

                              <Typography variant="body2">
                                No results found for &nbsp;
                                <strong>&quot;{filterName}&quot;</strong>.
                                <br /> Try checking for typos or using complete
                                words.
                              </Typography>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[2, 3, 4]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </TabPanel>
        </Box>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      ></Popover>
    </>
  );
}