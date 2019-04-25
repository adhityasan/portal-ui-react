import React from 'react';
import { Card, CardContent, CardHeader, TablePagination, Table, TableBody, TableCell, Checkbox, TableRow, TableHead, Tooltip, TableSortLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  root: {
    padding: '8px',
    height: '100%',
    maxHeight: '100%'
  },
  card: {
    padding: '8px',
    height: '100%'
  },
  title: {
    color: 'primary',
    fontSize: '20pt'
  }
};

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    const rows = [
      { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'nik', numeric: true, disablePadding: false, label: 'NIK' },
      { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
      { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
      { id: 'percentage', numeric: true, disablePadding: false, label: 'Percentage' },
    ];
    return (
      <TableHead>
        <TableRow>
          <CustomTableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </CustomTableCell>
          {rows.map(
            row => (
              <CustomTableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </CustomTableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const ListDataCheking = props => {
  const { classes } = props
  const component = new React.Component(props);
  component.state = {
    data: [
      createData('Abadi Jaya', 1023912378734, 'AbadiJaya@gmail.com', 'Verified', 80),
      createData('Bagus Kusuma', 345923782342, 'baguskum@gmail.com', 'Pending', 43),
      createData('Ceri', 1023912378734, 'ceri009@gmail.com', 'Pending', 60),
      createData('Hestika Wijaya', 1023912378734, 'hestwijay@gmail.com', 'Verified', 80),
      createData('Deno Gutaga', 1023912378734, 'polariaGutaga@gmail.com', 'Verified', 81),
      createData('Wulandari Polii', 1023912378734, 'wpolii@gmail.com', 'Pending', 86),
      createData('Ksatria Indonesia', 1023912378734, 'kioriginal@gmail.com', 'Verified', 100),
      createData('Putra Patinama', 1023912378734, 'putrapatinama90@gmail.com', 'Verified', 96.5),
      createData('Ningrati ore', 1023912378734, 'nigratiore@gmail.com', 'Verified', 68.8),
      createData('Lucy Latifah', 1023912378734, 'lusila@gmail.com', 'Verified', 83.7),
      createData('Mohammad Iqbal', 1023912378734, 'mohiqbaliquerz@gmail.com', 'Denied', 12),
      createData('Nuriwidaya Jurkam', 1023912378734, 'nuriwidjaya@gmail.com', 'Verified', 80),
    ],
    rowsPerPage: 10,
    page: 0,
    order: 'asc',
    orderBy: 'calories',
    selected: []
  }

  component.handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (component.state.orderBy === property && component.state.order === 'desc') {
      order = 'asc';
    }

    component.setState({ order, orderBy });
  };

  component.handleSelectAllClick = event => {
    if (event.target.checked) {
      component.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    component.setState({ selected: [] });
  };


  component.handleChangePage = (event, page) => {
    component.setState({ page });
  };

  component.handleChangeRowsPerPage = event => {
    component.setState({ rowsPerPage: event.target.value });
  };


  component.handleClick = (event, id) => {
    const { selected } = component.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

    component.setState({ selected: newSelected });
  };

  component.render = function() {
    const { data, rowsPerPage, page, order, orderBy, selected } = component.state

    return (
      <div className={classes.root}>
        <Card square className={classes.card}>
          <CardHeader
              classes={{
                title: classes.title,
              }}
              title="Users Data"
              subheader="Validation users data set"
            />
          <CardContent>


            <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={component.handleSelectAllClick}
                  onRequestSort={component.handleRequestSort}
                  rowCount={data.length}
                />
                <TableBody>
                  {stableSort(data, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(n => {
                      const isSelected = component.state.selected.indexOf(n.id) !== -1;
                      return (
                        <TableRow
                          hover
                          onClick={event => component.handleClick(event, n.id)}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={n.id}
                          selected={isSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isSelected} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            {n.name}
                          </TableCell>
                          <TableCell align="right">{n.calories}</TableCell>
                          <TableCell align="right">{n.fat}</TableCell>
                          <TableCell align="right">{n.carbs}</TableCell>
                          <TableCell align="right">{n.protein}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
            <TablePagination 
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={component.handleChangePage}
              onChangeRowsPerPage={component.handleChangeRowsPerPage}
            />


          </CardContent>
        </Card>
      </div>
    )
  }

  return component
}

export default withStyles(styles)(ListDataCheking);