    import * as React from 'react';
    import { useEffect, useState} from 'react';
    import PropTypes from 'prop-types';
    import { alpha } from '@mui/material/styles';
    import Box from '@mui/material/Box';
    import Table from '@mui/material/Table';
    import TableBody from '@mui/material/TableBody';
    import TableCell from '@mui/material/TableCell';
    import TableContainer from '@mui/material/TableContainer';
    import TableHead from '@mui/material/TableHead';
    import TablePagination from '@mui/material/TablePagination';
    import TableRow from '@mui/material/TableRow';
    import TableSortLabel from '@mui/material/TableSortLabel';
    import Toolbar from '@mui/material/Toolbar';
    import Typography from '@mui/material/Typography';
    import Paper from '@mui/material/Paper';
    import Checkbox from '@mui/material/Checkbox';
    import IconButton from '@mui/material/IconButton';
    import Tooltip from '@mui/material/Tooltip';
    import FormControlLabel from '@mui/material/FormControlLabel';
    import Switch from '@mui/material/Switch';
    import DeleteIcon from '@mui/icons-material/Delete';
    import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
    import FilterListIcon from '@mui/icons-material/FilterList';
    import { visuallyHidden } from '@mui/utils';
    import axios from 'axios';
    import { Link, useLocation } from 'react-router-dom';
    import Label from 'src/components/label';
    import './UserPage';
    import './UserPage.css'
    
    import { Stack } from '@mui/system';
    axios.interceptors.request.use(
        config => {
          config.headers.Authorization =JSON.parse(localStorage.getItem("Profile")).Token;
              return config;
          },
          error => {
              return Promise.reject(error);
          }
      );



    function createData(GameName, StartDate, EndDate) {
    return {
    GameName,
    StartDate,
    EndDate,

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
    return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
    }

    // This method is created for cross-browser compatibility, if you don't
    // need to support IE11, you can use Array.prototype.sort() directly

    function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
    return order;
    }
    return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
    }

    // table headings //

    const headCells = [
    {
    id: 'GameName',
    numeric: false,
    disablePadding: true,
    label: 'GameName',
    },
    {
    id: 'StartDate',
    numeric: true,
    disablePadding: false,
    label: 'StartDate',
    },
    {
    id: 'EndDate',
    numeric: true,
    disablePadding: false,
    label: 'EndDate',
    },
    {
    numeric: true,
    disablePadding: false,
    label: 'Status',
    },
    {
    numeric: true,
    disablePadding: false,
    label: 'Action',
    }
    ];

    function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
    const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
    };

    return (
    <TableHead>
    <TableRow>
    <TableCell padding="checkbox">
    <Checkbox
    color="primary"
    indeterminate={numSelected > 0 && numSelected < rowCount}
    checked={rowCount > 0 && numSelected === rowCount}
    onChange={onSelectAllClick}
    inputProps={{
    'aria-label': 'select all desserts',
    }}
    />
    </TableCell>
    {headCells.map((headCell) => (
    <TableCell
    key={headCell.id}
    align='left'
    padding={headCell.disablePadding ? 'none' : 'normal'}
    sortDirection={orderBy === headCell.id ? order : false}
    >
    <TableSortLabel
    active={orderBy === headCell.id}
    direction={orderBy === headCell.id ? order : 'asc'}
    onClick={createSortHandler(headCell.id)}
    >
    {headCell.label}
    {orderBy === headCell.id ? (
    <Box component="span" sx={visuallyHidden}>
    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
    </Box>
    ) : null}
    </TableSortLabel>
    </TableCell>
    ))}
    </TableRow>
    </TableHead>
    );
    }

    EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    };

    


    const handleAddMembers = () => {
    console.log('loooo');
    } 

    function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
    <Toolbar
        sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
        bgcolor: (theme) =>
        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
        }}
    >
       {numSelected > 0 ? (
    <Typography
        sx={{ flex: '1 1 100%' }}
        color="inherit"
        variant="subtitle1"
        component="div"
        >
        {numSelected} selected
    </Typography>
    ) : (
    <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
        >
        List Games
    </Typography>
    )}

       {numSelected > 0 ? (
    <Tooltip title="Delete">
    <IconButton>
    <DeleteIcon />
    </IconButton>
    </Tooltip>
    ) : (
    <Tooltip title="Add Group Member">
      <IconButton onClick={handleAddMembers} >
      <Link to="">
      </Link>
    </IconButton>
    </Tooltip>
    )}
    </Toolbar>
            );
            }

            EnhancedTableToolbar.propTypes = {
            numSelected: PropTypes.number.isRequired,
            };

    export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('GroupRole');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    
    

    const [data,setData]=useState([]);
    useEffect(() => {
            console.log("api cal====");
            axios.get(Configuration.devUrl+'game/allgame').then((response) => {
                console.log("sucess",response.data);
                setData(response.data)
            });
                
        },[]);
    const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
    if (event.target.checked) {
    const newSelected = data.map((n) => n._id);
    setSelected(newSelected);
    return;
    }
    setSelected([]);
    };

    const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
    selected.slice(0, selectedIndex),
    selected.slice(selectedIndex + 1),
    );
    }

    setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    };

    const handleChangeDense = (event) => {
    setDense(event.target.checked);
    };

    const isSelected = (_id) => selected.indexOf(_id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    return (
    <Box sx={{ width: '90%' }} justifyContent="center">
            <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
                        <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        >
            <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={data.length}
            />
            <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
            rows.sort(getComparator(order, orderBy)).slice() */}
            {stableSort(data, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
            const isItemSelected = isSelected(row._id);
            const labelId = `enhanced-table-checkbox-${index}`;

    return (
    <TableRow
        hover
        onClick={(event) => handleClick(event, row._id)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row._id}
        selected={isItemSelected}
        >
     <TableCell padding="checkbox">
        <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
            'aria-labelledby': labelId,
            }}
    />
    </TableCell>
    <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="none"
        
        >
    {row.GameName}
    </TableCell>
        <TableCell align='left'>{row.StartDate}</TableCell>
        <TableCell align='left'>{row.EndDate}</TableCell>
        <TableCell align="left">
        {/* <Label color={(row.Status === '0' && 'InActive') || 'success'}></Label> */}
        <Label className={row.Status?"labelcolorred":"labelcolorgreen"} >{row.Status?"InActive": 'Active'}</Label>
      </TableCell>
        <TableCell align='right'>
        <Stack direction="row" spacing={2}>
        <button variant="outlined" className='btn btn-primary'>Edit</button>
        </Stack>
        </TableCell>
    </TableRow>
    );
    })}
    {emptyRows > 0 && (
    <TableRow
    style={{
    height: (dense ? 33 : 53) * emptyRows,
    }}
    >
    <TableCell colSpan={6} />
    </TableRow>
    )}
    </TableBody>
    </Table>
    </TableContainer>
    <TablePagination  
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    count={data.length}
    rowsPerPage={rowsPerPage} 
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </Paper>
   
    </Box>
    );
    }





   