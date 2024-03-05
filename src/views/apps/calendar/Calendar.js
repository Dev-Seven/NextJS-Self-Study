/* eslint-disable newline-before-return */
/* eslint-disable padding-line-between-statements */
/* eslint-disable lines-around-comment */
// ** React Import
import { useEffect, useRef, useState } from 'react'

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { Tooltip, tooltipClasses } from '@mui/material'
import { styled } from '@mui/material/styles'

const blankEvent = {
  title: '',
  start: '',
  _id: '',
  importantDateCategoryId: '',
  isRepeat: false,
  extendedProps: {
    description: ''
  }
}

const Calendar = props => {
  // ** Props
  const {
    store,
    dispatch,
    direction,
    updateEvent,
    calendarApi,
    calendarsColor,
    setCalendarApi,
    handleSelectEvent,
    handleLeftSidebarToggle,
    handleAddEventSidebarToggle,
    onDataFromChild
  } = props

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black
    }
  }))

  const sendDataToParent = args => {
    const data = 'Hello, parent!'
    onDataFromChild(args)
  }

  // ** Refs
  const calendarRef = useRef()
  useEffect(() => {
    if (calendarApi === null) {
      // @ts-ignore
      setCalendarApi(calendarRef.current.getApi())
    }
  }, [calendarApi, setCalendarApi])

  if (store) {
    // ** calendarOptions(Props)
    let CalenderArr = []

    store?.events?.data?.map(item => {
      let tempObj = {
        title: item?.EventTitle,
        date: item?.EventDate,
        description: item?.Description,
        isRepeat: item?.isRepeat,
        _id: item?._id,
        importantDateCategoryId: item?.importantDateCategoryId,
        colorCode: item?.importantDateCategory?.colorCode
      }

      CalenderArr.push(tempObj)
    })

    function truncateString(str, maxLength) {
      if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...'
      }
      return str
    }

    const calendarOptions = {
      events: CalenderArr || [],
      eventContent: function (arg) {
        const colorCode = arg.event.extendedProps.colorCode

        const eventStyle = {
          backgroundColor: hexToRGBA(colorCode, 0.3),
          padding: '3px 3px 3px 3px',
          borderRadius: '6px',
          width: '100%'
          // overflow: 'auto'
        }
        const titleStyle = {
          color: colorCode,
          marginRight: '5px',
          marginLeft: '5px',
          width: '100%'
        }
        return (
          <div className='fc-content' style={eventStyle}>
            <BootstrapTooltip title={arg.event._def.title} followCursor arrow>
              <span className='fc-title' style={titleStyle}>
                {truncateString(arg.event._def.title, 17)}
              </span>
            </BootstrapTooltip>
          </div>
        )
      },
      plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        start: ' prev, next, title',
        end: 'today'
      },
      views: {
        week: {
          titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
        }
      },
      displayEventTime: false,

      /*
            Enable dragging and resizing event
            ? Docs: https://fullcalendar.io/docs/editable
          */
      editable: false,

      /*
            Enable resizing event from start
            ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
          */
      eventResizableFromStart: true,

      /*
            Automatically scroll the scroll-containers during event drag-and-drop and date selecting
            ? Docs: https://fullcalendar.io/docs/dragScroll
          */
      dragScroll: true,

      /*
            Max number of events within a given day
            ? Docs: https://fullcalendar.io/docs/dayMaxEvents
          */
      dayMaxEvents: 2,

      /*
            Determines if day names and week names are clickable
            ? Docs: https://fullcalendar.io/docs/navLinks
          */
      navLinks: true,

      // eventClassNames({ event: calendarEvent }) {
      //   // @ts-ignore
      //   const colorName = calendarEvent._def.extendedProps.colorCode
      //   console.log('colorname', calendarEvent._def.extendedProps.colorCode)
      //   return [
      //     // Background Color
      //     `bg-${colorName}`
      //   ]
      // },
      // eventClassNames({ event: calendarEvent }) {
      //    @ts-ignore
      //   const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]

      //   return [
      //      Background Color
      //     `bg-${colorName}`
      //   ]
      // },
      eventClick({ event: clickedEvent }) {
        dispatch(handleSelectEvent(clickedEvent))
        handleAddEventSidebarToggle()

        // * Only grab required field otherwise it goes in infinity loop
        // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
        // event.value = grabEventDataFromEventApi(clickedEvent)
        // isAddNewEventSidebarActive.value = true
      },

      customButtons: {
        sidebarToggle: {
          text: <Icon icon='mdi:menu' />,
          click() {
            handleLeftSidebarToggle()
          }
        }
      },
      dateClick(info) {
        const ev = { ...blankEvent }
        ev.start = info.date
        ev.end = info.date
        ev.allDay = true

        // @ts-ignore
        dispatch(handleSelectEvent(ev))
        handleAddEventSidebarToggle()
      },

      /*
            Handle event drop (Also include dragged event)
            ? Docs: https://fullcalendar.io/docs/eventDrop
            ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
          */
      eventDrop({ event: droppedEvent }) {
        dispatch(updateEvent(droppedEvent))
      },

      /*
            Handle event resize
            ? Docs: https://fullcalendar.io/docs/eventResize
          */
      eventResize({ event: resizedEvent }) {
        dispatch(updateEvent(resizedEvent))
      },
      ref: calendarRef,

      // Get direction from app state (store)
      direction
    }

    // @ts-ignore
    return (
      <FullCalendar
        datesSet={arg => {
          sendDataToParent(arg)
        }}
        {...calendarOptions}
      />
    )
  } else {
    return null
  }
}

export default Calendar
