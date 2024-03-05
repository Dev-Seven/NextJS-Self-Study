/* eslint-disable lines-around-comment */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  step1: {
    CategoryName: '',
    TopicName: '',
    // TopicDescription: '',
    TopicTag: '',
    TopicBanner: '',
    TopicVideo: ''
  },
  step2: {
    RelatedTopics: []
  },
  step3: {
    TopicLink: []
  },
  step4: {
    TopicNews: []
  },
  step5: {
    TopicImages: []
  },
  step6: {
    TopicVideo: ''
  },
  step7: {
    MapId: ''
  },
  items: [],
  linkItem: [],
  topicLinkChild: [],
  selectedItem: null,
  status: 'idle',
  error: null
}

const TopicSlice = createSlice({
  name: 'TopicSlice',
  initialState,
  reducers: {
    updateFormData(state, action) {
      const { step, data } = action.payload
      state[step] = data
    },
    resetFormData(state) {
      state.step1 = initialState.step1
      state.step2 = initialState.step2
      state.step3 = initialState.step3
      state.step4 = initialState.step4
      state.step5 = initialState.step5
      state.step6 = initialState.step6
      state.step7 = initialState.step7
    },
    // addNewItem: (state, action) => {
    //   state.items = action.payload
    // },
    addNewItem: (state, action) => {
      state.items = [...action.payload] // Append payload to the existing items array
    },

    clearNewsItem: state => {
      state.items = []
    },
    updateItem: (state, action) => {
      const updatedItemIndex = state.items.findIndex(item => item.id === state.selectedItem.id)
      state.items[updatedItemIndex] = action.payload
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    selectItem: (state, action) => {
      state.selectedItem = action.payload
    },
    clearSelectedItem: state => {
      state.selectedItem = []
    },
    // addLinkItem: (state, action) => {
    //   state.linkItem = action.payload
    //   // state?.linkItem?.push(action.payload)
    // },
    addLinkItem: (state, action) => {
      // console.log('Action Payload', action.payload)
      let tempArray = []
      action.payload.forEach(item => {
        let newObj = { ...item }
        let child = item?.children?.filter(temp => temp.TopicLink == item.TopicLinktitle)
        newObj.children = child
        tempArray.push(newObj)
      })
      state.linkItem = tempArray
    },
    clearLinkItem: state => {
      state.linkItem = []
    },
    deleteLinkItem: (state, action) => {
      state.linkItem = state.linkItem.filter(linkItem => linkItem.id !== action.payload)
    },
    selectLinkItem: (state, action) => {
      state.selectedItem = action.payload
    },
    updateLinkItemAddTime: (state, action) => {
      // console.log('Action Payload', action.payload)
      const updatedItemIndex = state.linkItem.findIndex(linkItem => linkItem.id === state.selectedItem.id)
      let tempArray = []
      let newObj = { ...action.payload }
      let child = newObj.children.filter(temp => temp.TopicLink == newObj.TopicLinktitle)
      newObj.children = child
      tempArray.push(newObj)

      state.linkItem[updatedItemIndex] = newObj
    },
    updateLinkItem: (state, action) => {
      // console.log('🚀  action:', action.payload)
      state?.linkItem?.filter((item, index) => {
        if (item?._id == action?.payload?._id) {
          state.linkItem[index] = action.payload
        }
      })
      // const updatedItemIndex = state.linkItem.findIndex(linkItem => linkItem.id === state.selectedItem.id)
      // state.linkItem[updatedItemIndex] = action.payload
    },
    addChildItem: (state, action) => {
      state?.topicLinkChild?.push(action.payload)
    },
    removeChildItem: (state, action) => {
      state.topicLinkChild = state.topicLinkChild.filter(item => item.id !== action.payload)
    },
    updateChildItem: (state, action) => {
      const index = state.topicLinkChild.findIndex(item => item.id === action.payload.id)
      state.topicLinkChild[index] = action.payload
    },
    clearSelectedChild: state => {
      state.topicLinkChild = []
    },
    selectChildItem: (state, action) => {
      state.selectedItem = action.payload
    },
    deleteTopicLinkItem: (state, action) => {
      const filteredLinks = state.linkItem.filter(link => link?._id !== action.payload)

      state.linkItem = filteredLinks
    }
  }
})

export const {
  updateFormData,
  resetFormData,
  addNewItem,
  updateItem,
  deleteItem,
  selectItem,
  clearSelectedItem,
  setLoading,
  setSuccess,
  setError,
  clearError,
  addLinkItem,
  deleteLinkItem,
  selectLinkItem,
  updateLinkItem,
  addSubLinkItem,
  clearNewsItem,
  clearLinkItem,
  addChildItem,
  removeChildItem,
  updateChildItem,
  clearSelectedChild,
  selectChildItem,
  updateLinkItemAddTime,
  deleteTopicLinkItem
} = TopicSlice.actions

export default TopicSlice.reducer
