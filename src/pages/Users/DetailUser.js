import React, { Component }  from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Grid, Typography, TextField, RadioGroup, Radio, FormControlLabel, FormLabel, FormControl, CardMedia } from '@material-ui/core';
import * as utils from '../../utils/utility'
import Alert from '../../utils/ui/Alert';


const styles = {
  root: {
    padding: '8px',
  },
  cardwrapper: {
    padding: '8px',
    height: '100%',
  },
  card: {
    maxWidth: '70%',
    padding: '8px',
    marginTop: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "8px",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    paddingTop: "56.25%"
  },
  title: {
    color: 'primary',
    fontSize: '20pt'
  }
};

class DetailUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tanggal_registrasi: "",
      tanggal_verifikasi: "",
      nik: "",
      nama: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      jenis_kelamin: "LAKI-LAKI",
      provinsi: "",
      kota: "",
      kecamatan: "",
      rw: "",
      rt: "",
      alamat: "",
      status_perkawinan: "",
      pekerjaan: "",
      email: "",
      nomor_handphone: "",
      nomor_npwp: "",
      openalert: false,
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const url = `${process.env.REACT_APP_PORTAL_API}/user/${id}`
    axios.get(url)
      .then(response => {
        const updateState = {
          tanggal_registrasi: response.data.identity.created_at || "",
          tanggal_verifikasi: response.data.identity.created_at || "",
          nik: response.data.identity.nik || "",
          nama: response.data.identity.nama_lengkap || "",
          tanggal_lahir: response.data.identity.tanggal_lahir || "",
          tempat_lahir: response.data.identity.tempat_lahir || "",
          jenis_kelamin: response.data.identity.jenis_kelamin,
          provinsi: response.data.identity.provinsi || "",
          kota: response.data.identity.kota ||response.data.identity.kabupaten || "",
          kelurahan: response.data.identity.kelurahan || "",
          kecamatan: response.data.identity.kecamatan || "",
          rw: response.data.identity.rw || "",
          rt: response.data.identity.rt || "",
          alamat: response.data.identity.alamat || "",
          status_perkawinan: response.data.identity.status_perkawinan || "",
          pekerjaan: response.data.identity.pekerjaan || "",
          nomor_handphone: response.data.support.nomor_handphone || "",
          nomor_npwp: response.data.support.nomor_npwp || "",
          email: response.data.support.email || "",
        }
        this.setState({...updateState})
      })
      .catch(error => {
        console.log({...error})
      })
  }

  render() {
    const { classes } = this.props 
    const { 
      tanggal_registrasi, 
      tanggal_verifikasi, 
      nik, 
      nama,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      provinsi,
      kota,
      rt,
      rw,
      alamat,
      status_perkawinan,
      pekerjaan,
      email,
      nomor_handphone,
      nomor_npwp
    } = this.state


    return (
      <div className={classes.root}>
        <Alert
          open={this.state.openalert}
          title={this.state.alerttitle}
          content={this.state.alertcontent} 
          firstoption={this.state.firstoption}
          firsthandler={this.state.firsthandler}
        />
        <Card square className={classes.cardwrapper}>
          <CardHeader
              classes={{
                title: classes.title,
              }}
              title="Users Data Detail"
              subheader="Cheking users data set"
            />
          <CardContent>
            <Grid container spacing={24} alignItems="flex-start" direction="row" justify="space-between">
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" gutterBottom>Tanggal Registrasi, {utils.dateGlobalFormat(new Date(tanggal_registrasi))}</Typography>
                <Typography variant="body1" gutterBottom>Tanggal Verifikasi, {utils.dateGlobalFormat(new Date(tanggal_verifikasi))}</Typography>
                <TextField
                  id="nik"
                  label="ID (KTP)"
                  value={nik}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  variant="filled"
                />

                <TextField
                  id="nama"
                  label="Nama"
                  value={nama}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  variant="filled"
                />

                <Grid container spacing={16}>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      id="tempat_lahir"
                      label="Tempat Lahir"
                      value={tempat_lahir}
                      className={classes.textField}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      id="tanggal_lahir"
                      label="Tanggal Lahir"
                      value={tanggal_lahir}
                      className={classes.textField}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      variant="filled"
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormControl component="fieldset" margin="normal" className={classes.formControl}>
                    <FormLabel component="legend">Jenis Kelamin</FormLabel>
                    <RadioGroup
                      row
                      aria-label="Gender"
                      name="gender1"
                      className={classes.group}
                      value={jenis_kelamin}
                      onChange={() => {}}>
                      <FormControlLabel disabled={!(jenis_kelamin === "PEREMPUAN")} value="PEREMPUAN" control={<Radio />} label="PEREMPUAN" />
                      <FormControlLabel disabled={!(jenis_kelamin === "LAKI-LAKI")} value="LAKI-LAKI" control={<Radio />} label="LAKI-LAKI" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <TextField
                  id="kewearganegaraan"
                  label="Kewarganegaran"
                  value={`WARGA NEGARA INDONESIA`}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  variant="filled"
                />
                <TextField
                  id="provinsi"
                  label="Provinsi"
                  value={provinsi}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  variant="filled"
                />
                <TextField
                  id="kota"
                  label="Kota/Kabupaten"
                  value={kota}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  variant="filled"
                />

                <Grid container spacing={16}>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      id="rt"
                      label="Rt"
                      value={rt}
                      className={classes.textField}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      id="rw"
                      label="Rw"
                      value={rw}
                      className={classes.textField}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      variant="filled"
                    />
                  </Grid>
                </Grid>

                <TextField
                  id="alamat"
                  label="Alamat"
                  value={alamat}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  multiline={true}
                  rows={2}
                  rowsMax={4}
                  variant="filled"
                />

                <TextField
                  id="status_perkawinan"
                  label="Status Perkawinan"
                  value={status_perkawinan}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  variant="filled"
                />
                
                <TextField
                  id="pekerjaan"
                  label="Pekerjaan"
                  value={pekerjaan}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  variant="filled"
                />

                <TextField
                  id="email"
                  label="email"
                  value={email}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  variant="filled"
                />

                <TextField
                  id="nomor_handphone"
                  label="Nomor Handphone"
                  value={nomor_handphone}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  variant="filled"
                />

                <TextField
                  id="nomor_npwp"
                  label="Nomor NPWP"
                  value={nomor_npwp}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  variant="filled"
                />

              </Grid>

              <Grid item  xs={12} sm={6} className="text-sm-left text-xs-left">
                <Card className={classes.card}>
                  <CardHeader className={classes.title} title="KTP" subheader="Kartu Tanda Penduduk" />
                  <CardMedia
                    className={classes.media}
                    image={nik ? `${process.env.REACT_APP_PORTAL_API}/user/${nik}/photo/ktp` : ""}
                    title="KTP Image"
                  />
                </Card>
                <Card className={classes.card}>
                  <CardHeader className={classes.title} title="PASFOTO" subheader="Pasfoto Kartu Tanda Penduduk" />
                  <CardMedia
                    className={classes.media}
                    image={nik ? `${process.env.REACT_APP_PORTAL_API}/user/${nik}/photo/foto` : ""}
                    title="KTP Image"
                  />
                </Card>
                <Card className={classes.card}>
                  <CardHeader className={classes.title} title="NPWP" subheader="Nomor Pokok Wajib Pajak" />
                  <CardMedia
                    className={classes.media}
                    image={nik ? `${process.env.REACT_APP_PORTAL_API}/user/${nik}/photo/npwp` : ""}
                    title="KTP Image"
                  />
                </Card>
                <Card className={classes.card}>
                  <CardHeader className={classes.title} title="SELFIE" subheader="Foto Selfie" />                  
                  <CardMedia
                    className={classes.media}
                    image={nik ? `${process.env.REACT_APP_PORTAL_API}/user/${nik}/photo/selfie` : ""}
                    title="KTP Image"
                  />
                </Card>
                <Card className={classes.card}>
                  <CardHeader className={classes.title} title="SELFIE & KTP" subheader="Foto Selfie Dengan KTP" />
                  <CardMedia
                    className={classes.media}
                    image={nik ? `${process.env.REACT_APP_PORTAL_API}/user/${nik}/photo/selfiektp` : ""}
                    title="KTP Image"
                  />
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(DetailUser))