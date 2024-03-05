/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs
} from '@mui/material'
import { Formik, useFormik, useFormikContext } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  createTopic,
  editTopic,
  getCategoryById,
  getCategoryBySubject,
  getSubjectById,
  getTopicById,
  setImagesTopics,
  setMapTopics,
  setRelatedTopics
} from 'src/store/slices/LearningSlice'
import { JSONToFormData } from 'src/store/Utilities/Functions'
import Images from '../Images'
import Map from '../Map/Map'
import News from '../News'
import RelatedTopic from '../Relatedtopic/RelatedTopic'
import Topic from '../Topic'
import TopicLinks from '../TopicLinks'
import Videos from '../Videos'
import { useTheme } from '@mui/material/styles'
import { toast } from 'react-hot-toast'
import { addLinkItem, addNewItem, clearLinkItem, clearNewsItem, clearSelectedChild } from 'src/store/slices/TopicSlice'
import { TopicSchema } from 'src/schemas'
import FallbackSpinner from 'src/@core/components/spinner'
import Toast from 'src/pages/Common/Toast'
import { setData } from 'src/store/slices/StorageSlice'

const Index = () => {
  const [value, setValue] = useState(0)
  const [inputList, setInputList] = useState([{ dropDown: '' }])
  const [subject, setSubject] = useState()
  const [response, setResponse] = useState(false)
  const [topicById, setTopicById] = useState()
  const [treeViewData, setTreeViewData] = useState([])
  const [categoryRes, setCategoryRes] = useState([])
  const [categoryName, setCategoryName] = useState({})
  const [parentId, setParentId] = useState()
  const [subjectName, setSubjectName] = useState('')
  const [category, setCategory] = React.useState('')
  const [status, setStatus] = useState(false)
  const [disable, setDisable] = useState(false)

  const theme = useTheme()

  const dispatch = useDispatch()
  const router = useRouter()

  // const { id, _id } = router.query
  const id = localStorage.getItem('SubjectId')
  const _id = localStorage.getItem('id')

  // console.log('🚀 ~ file: index.js:69 ~ Index ~ _id:', _id)
  const params = router.query.AddTopic

  const getCategory = useSelector(state => state.LearningSlice.getSubjectCategory)
  const categoryObj = useSelector(state => state.LearningSlice.catgeoryId)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)
  const finalData = useSelector(state => state.TopicSlice)

  // useEffect(() => {
  // const lastIndex = treeViewData[treeViewData - 1]
  // setCategoryName(lastIndex)
  // }, [setCategoryName])

  useEffect(() => {
    if (_id || !id) {
      dispatch(getTopicById(_id)).then(res => {
        if (res?.payload?.status === 200) {
          let updateData = res?.payload?.data
          setTopicById(updateData)
          setTreeViewData(updateData?.categoryHierarchy)
          setDisable(true)

          // updateData?.TopicNews?.map(item => {
          dispatch(addNewItem(updateData?.TopicNews))

          // })
          // updateData?.TopicLink?.map(item => {
          dispatch(addLinkItem(updateData?.TopicLink))

          // })
          setSubjectName(updateData?.SubjectName)
        }
      })
    }
  }, [dispatch, _id, id])

  const handleLinksById = () => {
    if (_id && !id) {
      let updateData = res?.payload?.data

      // console.log('🚀 ~ file: index.js:66 ~ dispatch ~ updateData:', updateData)
      setTopicById(updateData)
      updateData?.TopicLink?.map(item => {
        dispatch(addLinkItem(item))
      })
      setSubjectName(updateData?.SubjectName)
    }
  }

  const handleDropDown = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)
  }

  const handleOnChange = () => {
    setInputList([...inputList, { dropdown: '' }])
  }

  useEffect(() => {
    if (topicById || !id) {
      dispatch(
        getCategoryBySubject({ SubjectId: topicById?.SubjectId, ParentCategoryId: topicById?.ParentCategoryId || '' })
      )

      // console.log('ParentCategoryId', topicById?.ParentCategoryId)
    } else if (!topicById && id) {
      dispatch(getCategoryBySubject({ SubjectId: id, ParentCategoryId: '' }))
    }
  }, [dispatch, id, topicById])

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

  // const options = useMemo(() => lookup[dataValue], dataValue[dataValue] , [dataValue]);

  const subjectApi = event => {
    if (event.target.value) {
      setSubject(event.target.value)
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const initialValues = {
    SubjectId: id,
    ParentCategoryId: '64201167ea8c6901f90e81ab'
  }

  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: values => {
      // const data = new FormData()
      // data.append(values)
      setLoading(true)
      dispatch(createTopic(values)).then(res => {
        if (res?.payload?.status === 200) {
          router.push('/Learning/Topic')
        }
      })
      setLoading(false)
    }
  })

  const handleDropDownChange = async e => {
    if (topicById && _id) {
      try {
        const { payload } = await dispatch(
          getCategoryBySubject({ SubjectId: topicById?.SubjectId, ParentCategoryId: e.target.value })
        )
        if (payload?.status === 400) {
          setStatus(true)

          // toast.success(`${payload.message} please add new category`, {
          //   style: {
          //     padding: '16px',
          //     color: theme.palette.primary.main,
          //     border: `1px solid ${theme.palette.primary.main}`
          //   },
          //   iconTheme: {
          //     primary: theme.palette.primary.main,
          //     secondary: theme.palette.primary.contrastText
          //   }
          // })
        }
      } catch (error) {
        toast.error(error, {
          style: {
            padding: '16px',
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}`
          },
          iconTheme: {
            primary: theme.palette.primary.main,
            secondary: theme.palette.primary.contrastText
          }
        })
      }
    } else {
      try {
        const { payload } = await dispatch(getCategoryBySubject({ SubjectId: id, ParentCategoryId: e.target.value }))
        if (payload?.status === 400) {
          setStatus(true)

          // toast.success(`${payload.message} please add new category`, {
          //   style: {
          //     padding: '16px',
          //     color: theme.palette.primary.main,
          //     border: `1px solid ${theme.palette.primary.main}`
          //   },
          //   iconTheme: {
          //     primary: theme.palette.primary.main,
          //     secondary: theme.palette.primary.contrastText
          //   }
          // })
        }
      } catch (error) {
        toast.error(error, {
          style: {
            padding: '16px',
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}`
          },
          iconTheme: {
            primary: theme.palette.primary.main,
            secondary: theme.palette.primary.contrastText
          }
        })
      }
    }

    try {
      if (topicById && _id) {
      }
      const { payload } = await dispatch(getCategoryById(e.target.value))
      const categoryObj = payload?.data
      setCategoryRes(categoryObj)
      setTreeViewData(prevData => [...prevData, categoryObj])
      setCategoryName(payload?.data)

      if (payload?.data?.ParentCategoryId !== undefined) {
        setParentId(payload?.data?.ParentCategoryId)
      }
    } catch (error) {
      toast.error(error, {
        style: {
          padding: '16px',
          color: theme.palette.primary.main,
          border: `1px solid ${theme.palette.primary.main}`
        },
        iconTheme: {
          primary: theme.palette.primary.main,
          secondary: theme.palette.primary.contrastText
        }
      })
    }
  }

  if (categoryRes?.ParentCategoryId == '' || treeViewData?.length > 0) {
    dispatch(setData(treeViewData))
    localStorage.setItem('Topictree', JSON.stringify(treeViewData))
  }

  const handleRemoveCategory = async item => {
    const index = treeViewData.findIndex(e => e.CategoryName === item.CategoryName)

    if (index >= 0) {
      setTreeViewData(prevTreeViewData => prevTreeViewData.slice(0, index))
      localStorage.setItem('Topictree', JSON.stringify(treeViewData.slice(0, index)))

      const lastElement = treeViewData[index - 1]

      formik.setFieldValue('ParentCategoryId', lastElement?._id)
      const promises = []

      if (lastElement) {
        promises.push(dispatch(getCategoryBySubject({ SubjectId: id, ParentCategoryId: lastElement?._id })))
      } else {
        promises.push(dispatch(getCategoryBySubject({ SubjectId: id, ParentCategoryId: '' })))
      }

      setCategoryName(lastElement)

      Promise.all(promises).then(results => {
        const res = results[0]
        if (res?.payload?.status === 200) {
        } else {
        }
      })
      setStatus(false)
    }
  }

  function fileToBlobUrl(file) {
    return URL.createObjectURL(file)
  }

  // ** function to handle open next tab
  const handleClick = () => {
    if (value < 6) {
      setValue(value + 1)
    }
  }

  // ** function to handle previous tab
  const handlePrevious = () => {
    if (value > 0) {
      setValue(value - 1)
    }
  }
  const CatDropdownTree = JSON.parse(localStorage.getItem('Topictree'))

  // ** function to handle topic form submission
  const handleSubmit = async (values, actions) => {
    function addBorderCollapseToTable(htmlContent) {
      let parser = new DOMParser()
      let doc = parser.parseFromString(htmlContent, 'text/html')
      let tables = doc.querySelectorAll('figure.table table')

      tables.forEach(table => {
        table.style.borderCollapse = 'collapse'
      })

      return new XMLSerializer().serializeToString(doc)
    }
    setLoading(true)
    const data = new FormData()
    if (_id || !id) {
      data.append('SubjectId', topicById?.SubjectId)
      data.append('_id', topicById?._id)
    } else if (!_id && id) {
      data.append('SubjectId', id)
    }
    data.append('TopicName', values.TopicName)
    data.append('categoryHierarchy', JSON.stringify(CatDropdownTree || []))

    // data.append('TopicDescription', values.TopicDescription)
    data.append('TopicContent', addBorderCollapseToTable(values.TopicContent))
    data.append('TopicTagId', values.TopicTagId)
    data.append('CategoryId', values.CategoryId || '')
    data.append('TopicVideo', values.TopicVideo.type !== '' ? values.TopicVideo : values.TopicVideo.name)
    data.append('ParentCategoryId', values.ParentCategoryId || '')
    data.append('TopicBanner', values.TopicBanner.type !== '' ? values.TopicBanner : values.TopicBanner.name)
    data.append('ListingIcon', values.ListingIcon.type !== '' ? values.ListingIcon : values.ListingIcon.name)
    values.ShortBanner &&
      data.append('ShortBanner', values.ShortBanner.type !== '' ? values.ShortBanner : values.ShortBanner.name)
    data.append('RelatedTopics', JSON.stringify(values.RelatedTopics || []))
    data.append('MapId', JSON.stringify(values.MapId || []))
    data.append('Videos', JSON.stringify(values.Videos.filter(item => item != '') || []))
    data.append('TopicNews', JSON.stringify(values.TopicNews || []))
    data.append('TopicLink', JSON.stringify(values.TopicLink || []))

    // console.log('🚀 ~ file: index.js:351 ~ handleSubmit ~ data:', Object.fromEntries(data))

    // Append each file in TopicImages as a separate entry in FormData
    if (values.TopicImages) {
      for (let i = 0; i < values.TopicImages.length; i++) {
        data.append(`TopicImages`, values.TopicImages[i])
      }
    }

    // const data = await JSONToFormData(values)

    const action = _id ? editTopic(data) : createTopic(data)

    // console.log('🚀 ~ file: index.js:383 ~ handleSubmit ~ data:', Object.fromEntries(data))

    dispatch(action).then(res => {
      if (res?.payload?.status === 200) {
        if (_id) {
          Toast({ response: res, update: true }) // toast the success message
        } else {
          Toast({ response: res }) // toast the success message
        }
        router.push('/Learning/Topic')
        dispatch(clearLinkItem())
        dispatch(clearNewsItem())
        dispatch(clearSelectedChild())
        dispatch(setMapTopics([]))
        dispatch(setImagesTopics([]))
        dispatch(setRelatedTopics([]))
        localStorage.removeItem('id')
        localStorage.removeItem('_id')
        localStorage.removeItem('subjectID')
        localStorage.removeItem('SubjectId')
        localStorage.removeItem('prevImg')
        localStorage.removeItem('prevImg1')
        localStorage.removeItem('preVid')

        // window.localStorage.removeItem('Topictree')
      } else {
        Toast({ response: res, error: true }) // toast the error message
      }
      setLoading(false)
    })

    // if (_id) {
    //   dispatch(editTopic(data)).then(res => {
    //     if (res?.payload?.status === 200) {
    //       toast.success(res?.payload?.message, {
    //         style: {
    //           padding: '16px',
    //           color: theme.palette.primary.main,
    //           border: `1px solid ${theme.palette.primary.main}`
    //         },
    //         iconTheme: {
    //           primary: theme.palette.primary.main,
    //           secondary: theme.palette.primary.contrastText
    //         }
    //       })
    //       router.push('/Learning/Topic')
    //       dispatch(clearLinkItem())
    //       dispatch(clearNewsItem())
    //     } else {
    //       toast.error(res?.payload?.message || 'Unable to Connect to Server', {
    //         style: {
    //           padding: '16px',
    //           color: theme.palette.primary.main,
    //           border: `1px solid ${theme.palette.primary.main}`
    //         },
    //         iconTheme: {
    //           primary: theme.palette.primary.main,
    //           secondary: theme.palette.primary.contrastText
    //         }
    //       })
    //     }
    //   })
    // } else {
    //   dispatch(createTopic(data)).then(res => {
    //     if (res?.payload?.status === 200) {
    //       toast.success(res?.payload?.message, {
    //         style: {
    //           padding: '16px',
    //           color: theme.palette.primary.main,
    //           border: `1px solid ${theme.palette.primary.main}`
    //         },
    //         iconTheme: {
    //           primary: theme.palette.primary.main,
    //           secondary: theme.palette.primary.contrastText
    //         }
    //       })
    //       router.push('/Learning/Topic')
    //       dispatch(clearLinkItem())
    //       dispatch(clearNewsItem())
    //     } else {
    //       toast.error(res?.payload?.message || 'Unable to Connect to Server', {
    //         style: {
    //           padding: '16px',
    //           color: theme.palette.primary.main,
    //           border: `1px solid ${theme.palette.primary.main}`
    //         },
    //         iconTheme: {
    //           primary: theme.palette.primary.main,
    //           secondary: theme.palette.primary.contrastText
    //         }
    //       })
    //     }
    //   })
    // }
  }

  function handleCancel() {
    dispatch(clearLinkItem())
    dispatch(clearNewsItem())
    dispatch(clearSelectedChild())
    dispatch(setMapTopics([]))
    dispatch(setImagesTopics([]))
    dispatch(setRelatedTopics([]))
    localStorage.removeItem('prevImg')
    localStorage.removeItem('prevImg1')
    localStorage.removeItem('prevImg2')
    localStorage.removeItem('preVid')
    localStorage.removeItem('id')
    localStorage.removeItem('_id')
    localStorage.removeItem('subjectID')
    localStorage.removeItem('SubjectId')
  }

  // ** dispatch to get subject name by category
  useEffect(() => {
    dispatch(getSubjectById(id)).then(res => {
      if (res?.payload?.status === 200) {
        setSubjectName(res?.payload?.data?.SubjectName)
      }
    })
  }, [id])

  return (
    <div className='topic-container'>
      <div className='topic-container'>
        <Formik
          initialValues={{
            ParentCategoryId: parentId || '',
            TopicName: '',
            TopicDescription: '',
            TopicContent: '',
            TopicTagId: '',
            CategoryId: '',
            TopicBanner: '',
            ListingIcon: '',
            TopicVideo: '',
            RelatedTopics: [],
            MapId: [],
            TopicImages: [],
            Videos: [],
            TopicNews: [],
            TopicLink: [],
            categoryHierarchy: []
          }}
          validationSchema={TopicSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, values, validateForm, errors }) => (
            <>
              <div className='sidebar-category'>
                <div>
                  <h3>{params == 'Edittopic' ? topicById.SubjectName : subjectName}</h3>
                </div>
                {params == 'ViewTopic'
                  ? treeViewData?.map((item, i) => {
                      return (
                        <>
                          <h4 key={i}>{item.CategoryName == undefined ? null : item.CategoryName}</h4>
                        </>
                      )
                    })
                  : treeViewData?.map((item, i) => {
                      return (
                        <>
                          <h4 key={i}>
                            {item.CategoryName == undefined ? null : item.CategoryName}

                            {item.CategoryName == undefined ? null : (
                              <button
                                className='cat-remove-btn'
                                onClick={() => {
                                  handleRemoveCategory(item)
                                  setDisable(false)
                                }}
                              >
                                {' '}
                                -
                              </button>
                            )}
                          </h4>
                        </>
                      )
                    })}
                {status === false ? (
                  params == 'ViewTopic' ? null : disable ? null : getCategory ? (
                    <FormControl sx={{ minWidth: 200 }}>
                      <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
                        Category
                      </InputLabel>
                      <Select
                        autoWidth
                        value={category}
                        onBlur={formik.handleBlur}
                        onChange={e => {
                          handleDropDownChange(e)
                        }}
                        label='Category'
                        name='ParentCategoryId'
                        labelId='validation-basic-select'
                        aria-describedby='validation-basic-select'
                        placeholder='select'
                        id='validation-basic-select'
                      >
                        {getCategory?.map(item => (
                          <MenuItem key={item} value={`${item._id}`}>
                            {item.CategoryName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <h3>No category found</h3>
                  )
                ) : null}
              </div>
              <div className='tabs-container xyz'>
                <form>
                  <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          variant='scrollable'
                          scrollButtons='auto'
                          aria-label='lab API tabs example'
                        >
                          <Tab label='Topic' value={0} />
                          <Tab label='Related Topic' value={1} />
                          <Tab label='Topic Links' value={2} />
                          <Tab label='News' value={3} />
                          <Tab label='Images' value={4} />
                          <Tab label='Videos' value={5} />
                          <Tab label='Map' value={6} />
                        </Tabs>
                      </Box>
                      <TabPanel value={0}>
                        <Topic topicById={topicById} categoryName={categoryName} response={response} />
                      </TabPanel>
                      <TabPanel value={1}>
                        <RelatedTopic topicById={topicById} />
                      </TabPanel>
                      <TabPanel value={2}>
                        <TopicLinks topicById={topicById} />
                      </TabPanel>
                      <TabPanel value={3}>
                        <News topicById={topicById} />
                      </TabPanel>
                      <TabPanel value={4}>
                        <Images topicById={topicById} />
                      </TabPanel>
                      <TabPanel value={5}>
                        <Videos topicById={topicById} />
                      </TabPanel>
                      <TabPanel value={6}>
                        <Map topicById={topicById} />
                      </TabPanel>
                    </TabContext>
                    <Grid item sm={12}>
                      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                        <Button
                          size='large'
                          onClick={() => {
                            handlePrevious()
                          }}
                          variant='contained'
                          style={{ marginRight: '10px' }}
                        >
                          Previous
                        </Button>

                        {value === 6 ? (
                          params == 'ViewTopic' ? null : !_id ? (
                            <Button
                              size='large'
                              onClick={() => {
                                if (Object.values(errors).length !== 0) {
                                  setValue(0)
                                } else {
                                  localStorage.removeItem('prevImg')
                                  localStorage.removeItem('preVid')
                                }
                                handleSubmit()
                              }}
                              variant='contained'
                              style={{ marginRight: '10px' }}
                              disabled={loading}
                            >
                              {loading ? <CircularProgress style={{ width: ' 27px', height: '27px' }} /> : 'Save'}
                            </Button>
                          ) : (
                            <Button
                              size='large'
                              onClick={() => {
                                handleSubmit()
                              }}
                              variant='contained'
                              style={{ marginRight: '10px' }}
                              disabled={loading}
                            >
                              {loading ? <CircularProgress style={{ width: ' 27px', height: '27px' }} /> : 'Update'}
                            </Button>
                          )
                        ) : (
                          <Button
                            size='large'
                            onClick={() => {
                              handleClick()
                            }}
                            type='button'
                            variant='contained'
                            style={{ marginRight: '10px' }}
                          >
                            Next
                          </Button>
                        )}
                        <Link prefetch={false} href='/Learning/Topic'>
                          <Button size='large' variant='contained' onClick={handleCancel}>
                            Cancel
                          </Button>
                        </Link>
                      </div>
                    </Grid>
                  </Box>
                </form>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Index
