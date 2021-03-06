import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Pie } from 'react-chartjs-2'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import SettingsIcon from '@material-ui/icons/Settings'
import MoreIcon from '@material-ui/icons/More'
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { Wrapper, NewsCard, StatCard } from '../../components'
import axios from '@root/axios.instances'
import { dateGlobalFormat } from '@utils/utility'


let id = 0
function createData(name, date, progress) {
  id += 1
  return { id, name, date, progress }
}


class Home extends Component {
  state = {
    anchorEl: null,
    backgroundColor: ['#f44336', '#9c27b0', '#ffeb3b', '#4caf50', '#2196f'],
    gagal: 0,
    terverifikasi: 0,
    pending: 0,
    total: 0,
    lastUpdateLogFeed: 0,
    logFeed: [{
      from: '',
      message: '',
      subject: '',
    }, {
      from: '',
      message: '',
      subject: '',
    }, {
      from: '',
      message: '',
      subject: '',
    }, {
      from: '',
      message: '',
      subject: '',
    }],
    dataTable: [
      createData('Data Terverifikasi', dateGlobalFormat(new Date('tanggal_registrasi')), 67),
      createData('Data Gagal', 'February 2', 87),
      createData('Data Pending', 'March 30', 54),
      createData('Total Data', 'April 12', 34)
    ]
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = () => {
    this.setState({ anchorEl: null })
  };

  // COMPONENT DID MOUNT
  componentDidMount() {
    this.requestData()
    this.requestLogFeed()
  }

  requestData() {

    axios.get('/dashboard')
      .then(dashboardResp => {

        const { 
          last_done, 
          last_fail, 
          last_pending, 
          last_update,
          total_data_kyc,
          total_gagal,
          total_pending,
          total_terverifikasi
        } = dashboardResp.data



        const dataTable = [
          createData('Data Terverifikasi', last_done ? dateGlobalFormat(new Date(last_done)) : '', ((total_terverifikasi*100)/ total_data_kyc)),
          createData('Data Gagal', last_fail ? dateGlobalFormat(new Date(last_fail)) : '', ((total_gagal*100)/total_data_kyc)),
          createData('Data Pending', last_pending ? dateGlobalFormat(new Date(last_pending)) : '-', ((total_pending*100)/total_data_kyc)),
          createData('Total Data', last_update ? dateGlobalFormat(new Date(last_update)) : '', 100),
        ]

        this.setState({
          total: total_data_kyc,
          gagal: total_gagal,
          pending: total_pending,
          terverifikasi: total_terverifikasi,
          dataTable: dataTable
        })
      })
    
  }

  requestLogFeed() {
    axios.get('/ocrlog?limit=4')
      .then(response => {
        const { logFeed } = this.state
        const { data } = response

        data.content.forEach((content, index) => {
          logFeed[index].from = `${content._id}`
          logFeed[index].subject = `${content.nama} - ${content.status}`
          logFeed[index].message = `${content.created_at}`
        })

        this.setState({logFeed: logFeed})
      })
      .catch(error => {
        if (error !== undefined) {
          this.props.history.push({pathname: '/500'})
        }
      })
  }

  render() {
    const { anchorEl, gagal, terverifikasi, pending, total, lastUpdateLogFeed, logFeed, dataTable } = this.state
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
    )

    const exampledatapie = {
      labels: ['Gagal Terverifikasi', 'Terverifikasi', 'Pending'],
      datasets: [{
        data: [gagal, terverifikasi, pending],
        backgroundColor: ['#f44336', '#9c27b0', '#ffeb3b', '#4caf50', '#2196f']
      }]
    }

    const sharedOptionsPie = {
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        display: false
      }
    }

    return (
      <Wrapper>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              type="fill"
              title="Total"
              value={total}
              icon={<LocalOfferIcon />}
              color="#3f51b5"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              type="fill"
              title="Terverifikasi"
              value={terverifikasi}
              icon={<LocalOfferIcon />}
              color="#9c27b0"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              type="fill"
              title="Gagal"
              value={gagal}
              icon={<LocalOfferIcon />}
              color="#f44336"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              type="fill"
              title="Pending"
              value={pending}
              icon={<LocalOfferIcon />}
              color="#ffd740"
            />
          </Grid>
          {chartMenu}
          <Grid item xs={12} sm={12} md={4} key={6}>
            <Card>
              <CardHeader
                subheader={'Total Data KYC'}
                action={
                  <IconButton id={'4-menu-button'} onClick={this.handleClick}>
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
            <Paper className="table-responsive" style={{height: '100%'}}>
              <Table style={{height: '100%', padding: '8px'}}>
                <TableHead>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Updated</TableCell>
                    <TableCell>Percentage Bar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { dataTable.map(n => (
                    <TableRow key={n.id}>
                      <TableCell component="th" scope="row">
                        {n.name}
                      </TableCell>
                      <TableCell>{n.date}</TableCell>
                      <TableCell>{<LinearProgress variant="determinate" value={n.progress} />}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <NewsCard
              title="OCR Log Feed"
              subtitle={`Last updated ${lastUpdateLogFeed} mins ago`}
              feed={logFeed}
            />
          </Grid>
        </Grid>
      </Wrapper>
    )
  }
}

Home.propTypes = {
  history: PropTypes.object
}

export default Home