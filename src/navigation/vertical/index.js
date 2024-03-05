// IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// ==============================================================================================================//
// 1001,                 07-03-2023        ADDED AUTHENTICATION BASED ON PERMISSIONS            ADITYA

import { useSelector } from 'react-redux'

//1001 START

// const childrens = () => {
//   tempArray.map(item => {
//     ('item', item.children)
//   })
// }

// childrens()

const Navigation = () => {
  const Permission = useSelector(state => state?.AuthSlice?.adminData?.permission)

  const permission = {}
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    const givenPermission = localStorage.getItem('permission')
    if (!Object.keys(permission)?.length) {
      Object.assign(permission, JSON.parse(givenPermission))
    }

    // var permission = givenPermission
  }

  let finalArray = [
    {
      title: 'DashBoard',
      path: '/home',
      icon: 'mdi:home-outline',

      key: 'dashboard'
    },
    {
      title: 'System',
      path: '/second-page',
      icon: 'icon-park-outline:system',
      key: 'system',
      children: [
        {
          title: 'Roles',
          path: '/second-page/Roles',
          icon: 'carbon:user-role',
          key: 'role'
        },
        {
          title: 'System User',
          path: '/second-page/User',
          icon: 'mdi:user-outline',
          key: 'adminUser'
        }
      ]
    },
    {
      title: 'Learning',
      path: '/Learning',
      icon: 'mdi:book-edit-outline',
      key: 'learning',
      children: [
        {
          title: 'Application User',
          path: '/Learning/AppUser',
          icon: 'clarity:users-line',
          key: 'user'
        },
        {
          title: 'Subject',
          path: '/Learning/Subject',
          icon: 'mdi:book-open-page-variant',
          key: 'subject'
        },
        {
          title: 'Subject Price',
          path: '/Learning/subjectPrice',
          icon: 'fa:rupee',
          key: 'subjectPrice'
        },
        {
          title: 'Category',
          path: '/Learning/Category',
          icon: 'material-symbols:category-outline',
          key: 'category'
        },
        {
          title: 'Maps',
          path: '/Learning/Maps',
          icon: 'mdi:map-marker-multiple-outline',
          key: 'map'
        },
        {
          title: 'Topic Tag',
          path: '/Learning/topicTag',
          icon: 'solar:hashtag-bold',
          key: 'topicTag'
        },
        {
          title: 'Topics',
          path: '/Learning/Topic',
          icon: 'material-symbols:topic-outline-rounded',
          key: 'topic'
        },
        {
          title: 'Offer & Coupons',
          path: '/Learning/Offers',
          icon: 'ic:outline-local-offer',
          key: 'coupon'
        }
      ]
    },
    {
      title: 'Subscription',
      path: '/Subscription-plan',
      icon: 'eos-icons:subscription-management',
      children: [
        {
          title: 'Subscription',
          path: '/Subscription-plan/Subscriptions',
          icon: 'eos-icons:subscriptions-created-outlined',
          key: 'subscription'
        },
        {
          title: 'Custom Subscription',
          path: '/Subscription-plan/Custom-subscription',
          icon: 'mdi:subscriptions',
          key: 'customSubscription'
        }
      ]
    },
    {
      title: 'Quiz Manager',
      path: '/QuizManager',
      icon: 'mdi:head-question-outline',
      children: [
        {
          title: 'Quiz Category',
          path: '/QuizManager/quizCategory',
          icon: 'mdi:circle-outline',
          key: 'quizCategory'
        },
        {
          title: 'Question bank',
          path: '/QuizManager/QuestionBank',
          icon: 'mdi:user-outline',
          key: 'questionBank'
        },
        {
          title: 'Quiz',
          path: '/QuizManager/Quiz',
          icon: 'material-symbols:quiz-outline-sharp',
          key: 'quiz'
        }
      ]
    },
    {
      title: 'Notifications',
      path: '/Notification',
      icon: 'mdi:bell-outline',
      children: [
        {
          title: 'Notification Listing',
          path: '/Notification/NotificationListing',
          icon: 'mdi:bell-notification-outline',
          key: 'notification'
        }
      ]
    },

    // {
    //   title: 'Emails',
    //   path: '/Email',
    //   icon: 'mdi:email-outline',
    //   children: [
    //     {
    //       title: 'Email Listing',
    //       path: '/Email/EmailListing',
    //       icon: 'ic:outline-attach-email',
    //       key: 'emailsListing'
    //     }

    //     // {
    //     //   title: 'Compose Email',
    //     //   path: '/Email/Compose',
    //     //   icon: 'mdi:user-outline',
    //     //   key: 'composeEmail'
    //     // }
    //   ]
    // },
    {
      path: '/Payments',
      action: 'read',

      // subject: 'acl-page',
      title: 'Payments',
      icon: 'material-symbols:payments-outline',
      key: 'payment'
    },
    {
      path: '/app-setting',
      action: 'read',

      // subject: 'acl-page',
      title: 'App Slider',
      icon: 'solar:slider-vertical-broken',
      key: 'appSetting'
    },
    {
      path: '/mapImage',
      action: 'read',
      title: 'Map Image',
      icon: 'oi:map',
      key: 'mapImage'
    },
    {
      title: 'Study Media',
      path: '/Short',
      icon: 'mdi:movie-open-edit-outline',
      children: [
        {
          path: '/Short/shortsTopic',
          action: 'read',

          // subject: 'acl-page',
          title: 'Media Category',
          icon: 'subway:media',
          key: 'shortsCategory'
        },
        {
          path: '/Short/Shorts',
          action: 'read',

          // subject: 'acl-page',
          title: 'Media',
          icon: 'streamline:entertainment-play-list-4-screen-television-display-player-movies-players-tv-media-video',
          key: 'shorts'
        }
      ]
    },
    {
      title: 'Calendar',
      path: '/Calendar',
      icon: 'material-symbols:calendar-month',
      children: [
        {
          path: '/Calendar/datesCategory',
          action: 'read',

          // subject: 'acl-page',
          title: 'Date Category',
          icon: 'mdi:calendar-outline',
          key: 'importantDateCategory'
        },
        {
          path: '/Calendar/Dates',
          action: 'read',

          // subject: 'acl-page',
          title: 'Important Date',
          icon: 'mdi:calendar-blank-outline',
          key: 'importantDates'
        }
      ]
    },
    {
      title: 'Support',
      path: '/Support',
      icon: 'streamline:interface-help-customer-support-2-customer-headphones-headset-help-microphone-phone-person-support',
      children: [
        {
          path: '/Support/SupportSubject',
          action: 'read',

          // subject: 'acl-page',
          title: 'Support Subject',
          icon: 'mdi:book-open-outline',
          key: 'supportSubject'
        },
        {
          path: '/Support/SupportRequest',
          action: 'read',

          // subject: 'acl-page',
          title: 'Support Request',
          icon: 'mdi:face-agent',
          key: 'supportRequest'
        }
      ]
    },
    {
      title: 'Master',
      path: '/master',
      icon: 'game-icons:ringmaster',
      children: [
        {
          path: '/master/company',
          action: 'read',

          // subject: 'acl-page',
          title: 'Company',
          icon: 'mdi:company',
          key: 'company'
        },
        {
          path: '/master/tax',
          action: 'read',

          // subject: 'acl-page',
          title: 'Tax',
          icon: 'tabler:receipt-tax',
          key: 'serviceTax'
        },
        {
          path: '/master/state',
          action: 'read',

          // subject: 'acl-page',
          title: 'State',
          icon: 'eos-icons:state',
          key: 'state'
        }
      ]
    }
  ]

  const keys = Object.entries(permission)

  let dbData1 = keys.map(([key, val]) => {
    // ('val[key] ', val[key])

    if (val[key] === true) {
      return { key, val }
    }

    // return { key, val }
  })

  let dbData = []
  for (let b = 0; b < dbData1.length; b++) {
    const element = dbData1[b]
    if (element) {
      dbData.push(element)
    }
  }

  const defaultPermission = [
    {
      path: '/Settings',
      action: 'read',

      // subject: 'acl-page',
      title: 'Settings',
      icon: 'mdi:shield-outline',
      key: 'settings'
    },
    {
      path: '/Logout',
      action: 'read',

      // subject: 'acl-page',
      title: 'Logout',
      icon: 'mdi:shield-outline',
      key: 'logout'
    }
  ]

  let tempArray = []

  for (let i = 0; i < finalArray.length; i++) {
    const finalArrayElement = finalArray[i]

    if (finalArrayElement?.children) {
      let tempChildArray = []
      let childArray = finalArrayElement.children
      for (let j = 0; j < childArray.length; j++) {
        const childArrayElement = childArray[j] // obj child Array ka
        for (let k = 0; k < dbData.length; k++) {
          const dbDataElement = dbData[k]

          if (childArrayElement.key == dbDataElement.key) {
            tempChildArray.push(childArrayElement)
          }
        }
      }
      finalArrayElement.children = tempChildArray
      if (finalArrayElement?.children?.length > 0) {
        tempArray.push(finalArrayElement)
      }
    } else {
      for (let h = 0; h < dbData.length; h++) {
        // (dbData.key)
        if (finalArrayElement.key === dbData[h].key) {
          tempArray.push(finalArrayElement)
        }
      }
    }
  }

  // let finalPermission = ConcatPermission.map(item => {
  //   ('item', item.prototype)

  //   return item
  // })

  let ConcatPermission = tempArray.concat(defaultPermission)

  return tempArray
}

export default Navigation

//1001 END
