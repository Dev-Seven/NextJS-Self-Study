import { Grid } from '@mui/material'
import React from 'react'

// import Table from './Table'
import dynamic from 'next/dynamic'

const Table = dynamic(() => import('./Table'))

const index = () => {
  return (
    <Grid container spacing={6}>
      {/* <PageHeader
        title={<Typography variant='h5'>Roles List</Typography>}
        subtitle={
          <Typography variant='body2'>
            A role provided access to predefined menus and features so that depending on assigned role an administrator
            can have access to what he need
          </Typography>
        }
      />
      <Grid item xs={12} sx={{ mb: 5 }}>
        <RoleCards />
      </Grid> */}
      {/* <PageHeader
        title={<Typography variant='h5'>Total users with their roles</Typography>}
        subtitle={
          <Typography variant='body2'>
            Find all of your company’s administrator accounts and their associate roles.
          </Typography>
        }
      /> */}
      <Grid item xs={12}>
        {/* <Link href='/second-page/Roles/AddRoles' style={{textDecoration:"none"}} ><Button variant='contained' >Add</Button></Link> */}
        <Table />
      </Grid>
    </Grid>
  )
}

export default index
