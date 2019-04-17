import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import SettingsIcon from '@material-ui/icons/Settings';
import MoreIcon from '@material-ui/icons/More';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Wrapper, NewsCard, StatCard } from '../../components';
import { mockFeed } from '../../utils/mock';

let id = 0;
function createData(name, date, progress) {
  id += 1;
  return { id, name, date, progress };
}

const data = [
  createData('UI prototyping', 'January 23', 67),
  createData('Design', 'February 2', 87),
  createData('Development', 'March 30', 54),
  createData('Testing and delivery', 'April 12', 34),
  createData('Ongoing maintanance', 'May 28', 56),
];

class Home extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const chartMenu = (
      <Menu
        id="chart-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.handleClose}
      >
        <MenuItem onClick={this.handleClose}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText inset primary="Settings" />
        </MenuItem>
        <MenuItem onClick={this.handleClose}>
          <ListItemIcon>
            <MoreIcon />
          </ListItemIcon>
          <ListItemText inset primary="View more" />
        </MenuItem>
        <MenuItem onClick={this.handleClose}>
          <ListItemIcon>
            <NotificationsOffIcon />
          </ListItemIcon>
          <ListItemText inset primary="Disable notifications" />
        </MenuItem>
        <MenuItem onClick={this.handleClose}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText inset primary="Remove panel" />
        </MenuItem>
      </Menu>
    );

    const exampledatapie = {
      labels: ['Gagal Terverifikasi', 'Terverifikasi', 'Pending'],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: ['#f44336', '#9c27b0', '#ffeb3b', '#4caf50', '#2196f']
      }]
    }

    const sharedOptionsPie = {
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        display: false
      }
    };

    return (
      <Wrapper>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              type="fill"
              title="Total"
              value={450}
              icon={<LocalOfferIcon />}
              color="#3f51b5"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              type="fill"
              title="Terverifikasi"
              value={50}
              icon={<LocalOfferIcon />}
              color="#9c27b0"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              type="fill"
              title="Gagal"
              value={300}
              icon={<LocalOfferIcon />}
              color="#f44336"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              type="fill"
              title="Pending"
              value={100}
              icon={<LocalOfferIcon />}
              color="#ffd740"
            />
          </Grid>
          {chartMenu}
          <Grid item xs={12} sm={12} md={4} key={10}>
            <Card>
              <CardHeader
                subheader={"Total Data KYC"}
                action={
                  <IconButton id={`4-menu-button`} onClick={this.handleClick}>
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Pie
                  data={exampledatapie}
                  height={182}
                  options={sharedOptionsPie}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <NewsCard
              title="Log Feed"
              subtitle="Last updated 24 mins ago"
              feed={mockFeed}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Paper className="table-responsive">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Project</TableCell>
                    <TableCell numeric>Due Date</TableCell>
                    <TableCell numeric>Current Progress</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { data.map(n => (
                    <TableRow key={n.id}>
                      <TableCell component="th" scope="row">
                        {n.name}
                      </TableCell>
                      <TableCell numeric>{n.date}</TableCell>
                      <TableCell numeric>{<LinearProgress variant="determinate" value={n.progress} />}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Wrapper>
    )
  }
}

export default Home;