/* eslint-disable lines-around-comment */
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, Grid, Tab } from '@mui/material'
import React, { useEffect, useState, useMemo } from 'react'
import Images from './Images'
import Map from './Map/Map'
import News from './News'
import RelatedTopic from './Relatedtopic/RelatedTopic'
import Topic from './Topic'
import TopicLinks from './TopicLinks'
// import TopicTable from './TopicTable/TopicTable'
import Videos from './Videos'

import dynamic from 'next/dynamic'

const TopicTable = dynamic(() => import('./TopicTable/TopicTable'))

// const countries = {
//   France : [
//     {"paris": "paris"},
//   ],
//   Usa: ["New York", "San Francisco", "Austin", "Dallas"]
// };

const Index = () => {
  const [value, setValue] = useState()
  const [inputList, setInputList] = useState([{ dropDown: '' }])

  const handleDropDown = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)
  }

  const handleOnChange = () => {
    setInputList([...inputList, { dropdown: '' }])
  }

  // const [countryData, setCountryData] = useState(["Usa"]);
  // const [selectedCountry, setSelectedCountry] = useState("");

  // const checkInsertInArray = newCountry => {
  //   let findStatus = countryData.find(x => {
  //     return x === newCountry;
  //   });
  //   if (!findStatus) {
  //     setCountryData([...countryData, newCountry]);
  //   }
  // };

  // const countryChange = event => {
  //   if (event.target.value) {
  //     setSelectedCountry(event.target.value);
  //   }
  // };

  // useEffect(() => {
  //   Object.keys(countries).forEach(country => {
  //     checkInsertInArray(country);
  //   });
  // });
  const [subject, setSubject] = useState()
  const [response, setResponse] = useState('200')

  // const options = useMemo(() => lookup[dataValue], dataValue[dataValue] , [dataValue]);

  const subjectApi = event => {
    if (event.target.value) {
      setSubject(event.target.value)
    }
  }

  function newDropdown() {
    if (response === 200) {
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    // <div className='topic-container'>
    //   <div className='sidebar-category'>
    //     <Box sx={{ width: '100%', typography: 'body1' }}>
    //       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    //         <h4>category container</h4>
    //       </Box>
    //     </Box>
    //     <div>
    //       <select onChange={subjectApi}>
    //         <option value='Select Subject' />
    //         {Subject?.data?.map((value, index) => {
    //           return (
    //             <option key={index} value={JSON.stringify(value)} onChange={handleChange}>
    //               {value.SubjectName}
    //             </option>
    //           )
    //         })}
    //       </select>
    //     </div>
    //   </div>
    //   <div className='tabs-container xyz'>
    //     <Box sx={{ width: '100%', typography: 'body1' }}>
    //       <TabContext value={value}>
    //         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    //           <TabList onChange={handleChange} aria-label='lab API tabs example'>
    //             <Tab label='Topic' value='1' />
    //             <Tab label='Related Topic' value='2' />
    //             <Tab label='Topic Links' value='3' />
    //             <Tab label='News' value='4' />
    //             <Tab label='Images' value='5' />
    //             <Tab label='Videos' value='6' />
    //             <Tab label='Map' value='7' />
    //           </TabList>
    //         </Box>
    //         <TabPanel value='1'>
    //           <Topic />
    //         </TabPanel>
    //         <TabPanel value='2'>
    //           <RelatedTopic />
    //         </TabPanel>
    //         <TabPanel value='3'>
    //           <TopicLinks />
    //         </TabPanel>
    //         <TabPanel value='4'>
    //           <News />
    //         </TabPanel>
    //         <TabPanel value='5'>
    //           <Images />
    //         </TabPanel>
    //         <TabPanel value='6'>
    //           <Videos />
    //         </TabPanel>
    //         <TabPanel value='7'>
    //           <Map />
    //         </TabPanel>
    //       </TabContext>
    //       <Grid item sm={12}>
    //         <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
    //           <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
    //             Cancel
    //           </Button>
    //           <Button size='large' type='submit' variant='contained'>
    //             Send
    //           </Button>
    //         </div>
    //       </Grid>
    //     </Box>
    //   </div>
    // </div>
    <>
      <TopicTable />
    </>
  )
}

export default Index
