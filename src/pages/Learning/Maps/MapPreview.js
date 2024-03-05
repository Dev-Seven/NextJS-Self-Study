/* eslint-disable lines-around-comment */
/* eslint-disable newline-before-return */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react'
import mapboxgl, { GeolocateControl } from 'mapbox-gl'

const MapPreview = mapStyle => {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOXGL_ACCESSTOKEN
  const mapContainer = useRef(null)
  const map = useRef(null)
  const popup = useRef(null)
  const [lng, setLng] = useState(78.9629)
  const [lat, setLat] = useState(20.5937)
  const [zoom, setZoom] = useState(5)
  const [style, setStyle] = useState('')
  const [value, setValue] = useState('')
  const [inputValue, setInputValue] = useState({
    mapTitle: '',
    mapDescription: '',
    mapImages: []
  })
  function handlePopup(state) {
    // return console.log(JSON.stringify(state))
  }

  // mapbox://styles/developer1234/cldwl2lam001k01s55a42le03
  // const getLink = localStorage.getItem("link");

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `${mapStyle.mapStyle}`,
      center: [lng, lat],
      zoom: zoom
    })
  })

  // function to handle input change

  function handleInputChange(event) {
    const { id, value } = event.target
    setInputValue(prevInputs => ({
      ...prevInputs,
      [id]: value
    }))
  }

  // handle image input change

  function handleImageInput(event) {
    const { id, files } = event.target
    setInputValue(prevInputs => ({
      ...prevInputs,
      [id]: files
    }))
  }

  // function to handle popup form

  function ClickedGameObject(feature) {
    var html = ''

    html += "<div id='mapboxgl-popup'>"
    html += "<input type='text' id='mapTitle' class='title'   />"
    html += '<br/>'
    html += '<br/>'
    html += "<input type='text' id='mapDescription' class='description'  />"
    html += '<br/>'
    html += '<br/>'
    html += "<input type='file' id='mapImages' multiple='multiple' />"
    html += '<br/>'
    html += '<br/>'
    html += '<div>'
    html += '{inputValue.mapImages.map((item) => {item.name})}'
    html += '</div>'
    html += "<button class='content' id='btn-collectobj' value='Collect'  >button</button>"
    html += '</div>'

    return html
  }

  useEffect(() => {
    const features = map.current.getSource({
      layers: ['symbols']
    })
  })

  //   useEffect(() => {
  //     map.current.on('click', event => {
  //       const features1 = map.current.queryRenderedFeatures(event?.point)

  //       const displayProperties1 = ['type', 'properties', 'id', 'layer', 'source', 'sourceLayer', 'state']

  //       const displayFeature = features1.map(feat => {
  //         const displayFeat = {}
  //         displayProperties1.forEach(prop => {
  //           displayFeat[prop] = feat[prop]
  //         })
  //         return displayFeat
  //       })
  //       const features = map.current.queryRenderedFeatures(event?.point, {
  //         layers: [`${displayFeature[0]?.layer?.id}`]
  //       })
  //       const feature = features[0]

  //       // Declare an array object for our array of images
  //       let arrayOfImages = []

  //       // Check if each image exists and add it to arrayOfImages
  //       if (displayFeature[0]?.layer?.id !== undefined) {
  //         if (feature?.properties?.image1) {
  //           arrayOfImages.push(feature?.properties?.image1)
  //         }
  //         if (feature?.properties?.image2) {
  //           arrayOfImages.push(feature?.properties?.image2)
  //         }
  //         if (feature?.properties?.image3) {
  //           arrayOfImages.push(feature?.properties?.image3)
  //         }
  //         if (feature?.properties?.image4) {
  //           arrayOfImages.push(feature?.properties?.image4)
  //         }
  //         if (feature?.properties?.image5) {
  //           arrayOfImages.push(feature?.properties?.image5)
  //         }
  //       } else {
  //         console.log('feature is missing')
  //       }

  //       var slideshowContent = ''

  //       for (var i = 0; i < arrayOfImages.length; i++) {
  //         var img = arrayOfImages[i].split('|')

  //         slideshowContent += `
  //    <div class="image ${i === 0 ? 'active' : ''}">
  //      <img src="${img[0]}" />
  //    </div>
  //  `
  //       }

  //       if (feature.properties.name || feature.properties.description) {
  //         var popupContent =
  //           '<div id="' +
  //           feature.properties.name +
  //           '" class="popup">' +
  //           '<h2>' +
  //           (feature.properties.name ? '<h3>' + feature.properties.name + '</h3>' : '') +
  //           '</h2>' +
  //           '<p>' +
  //           (feature.properties.description ? '<p>' + feature.properties.description + '</p>' : '') +
  //           '</p>' +
  //           '<div class="slideshow">' +
  //           slideshowContent +
  //           '</div>' +
  //           '<div class="cycle">' +
  //           (arrayOfImages.length === 0 ? '' : '<a href="#" class="prev">&laquo; Previous</a>') +
  //           (arrayOfImages.length === 0 ? '' : '<a href="#" class="next">Next &raquo;</a>') +
  //           '</div>' +
  //           '</div>'

  //         if (!feature.geometry.coordinates) {
  //           setLat(0)
  //           setLng(0)
  //         } else {
  //           setLat(feature?.geometry?.coordinates[0])
  //           setLng(feature?.geometry?.coordinates[1])
  //         }

  //         new mapboxgl.Popup({ offset: [0, -15], closeOnClick: true, closeOnMove: true })
  //           ?.setLngLat(feature?.geometry?.coordinates.length > 2 ? [0, 0] : feature?.geometry?.coordinates)
  //           ?.setHTML(popupContent)
  //           .addTo(map.current)
  //       } else {
  //         console.log('something is missing')
  //       }

  //       $('#map').on('click', '.popup .cycle a', function () {
  //         var $slideshow = $('.slideshow'),
  //           $newSlide

  //         if ($(this).hasClass('prev')) {
  //           $newSlide = $slideshow.find('.active').prev()
  //           if ($newSlide.index() < 0) {
  //             $newSlide = $('.image').last()
  //           }
  //         } else {
  //           $newSlide = $slideshow.find('.active').next()
  //           if ($newSlide.index() < 0) {
  //             $newSlide = $('.image').first()
  //           }
  //         }

  //         $slideshow.find('.active').removeClass('active').hide()
  //         $newSlide.addClass('active').show()
  //         return false
  //       })
  //     })
  //   }, [])

  useEffect(() => {
    map.current.on('click', event => {
      const features1 = map.current.queryRenderedFeatures(event?.point)

      const displayProperties1 = ['type', 'properties', 'id', 'layer', 'source', 'sourceLayer', 'state']

      const displayFeature = features1.map(feat => {
        const displayFeat = {}
        displayProperties1.forEach(prop => {
          displayFeat[prop] = feat[prop]
        })
        return displayFeat
      })

      if (displayFeature[0]?.layer?.id) {
        // Check if layer ID exists
        const features = map.current.queryRenderedFeatures(event?.point, {
          layers: [`${displayFeature[0]?.layer?.id}`]
        })
        const feature = features[0]

        // Declare an array object for our array of images
        let arrayOfImages = []

        // Check if each image exists and add it to arrayOfImages
        if (displayFeature[0]?.layer?.id !== undefined) {
          if (feature?.properties?.image1) {
            arrayOfImages.push(feature?.properties?.image1)
          }
          if (feature?.properties?.image2) {
            arrayOfImages.push(feature?.properties?.image2)
          }
          if (feature?.properties?.image3) {
            arrayOfImages.push(feature?.properties?.image3)
          }
          if (feature?.properties?.image4) {
            arrayOfImages.push(feature?.properties?.image4)
          }
          if (feature?.properties?.image5) {
            arrayOfImages.push(feature?.properties?.image5)
          }
        } else {
          // console.log('feature is missing')
        }

        var slideshowContent = ''

        for (var i = 0; i < arrayOfImages.length; i++) {
          var img = arrayOfImages[i].split('|')

          slideshowContent += `
   <div class="image ${i === 0 ? 'active' : ''}">
     <img src="${img[0]}" />
   </div>
 `
        }

        if (feature.properties.name || feature.properties.description) {
          var popupContent =
            '<div id="' +
            feature.properties.name +
            '" class="popup">' +
            '<h2>' +
            (feature.properties.name ? '<h3>' + feature.properties.name + '</h3>' : '') +
            '</h2>' +
            '<p>' +
            (feature.properties.description ? '<p>' + feature.properties.description + '</p>' : '') +
            '</p>' +
            '<div class="slideshow">' +
            slideshowContent +
            '</div>' +
            '<div class="cycle">' +
            (arrayOfImages.length === 0 ? '' : '<a href="#" class="prev">&laquo; Previous</a>') +
            (arrayOfImages.length === 0 ? '' : '<a href="#" class="next">Next &raquo;</a>') +
            '</div>' +
            '</div>'

          if (!feature.geometry.coordinates) {
            setLat(0)
            setLng(0)
          } else {
            setLat(feature?.geometry?.coordinates[0])
            setLng(feature?.geometry?.coordinates[1])
          }

          const lngLat = feature?.geometry?.coordinates

          if (Array.isArray(lngLat) && lngLat.length === 2 && isValidLngLat(lngLat)) {
            new mapboxgl.Popup({ offset: [0, -15], closeOnClick: true, closeOnMove: true })
              .setLngLat(lngLat)
              .setHTML(popupContent)
              .addTo(map.current)
          } else {
            console.log('no laters found')
            // console.error('Invalid lnglat object:', lngLat)
          }

          function isValidLngLat(lngLat) {
            const [lng, lat] = lngLat
            return (
              typeof lng === 'number' && typeof lat === 'number' && lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90
            )
          }
        } else {
          // console.log('something is missing')
        }

        $('#map').on('click', '.popup .cycle a', function () {
          var $slideshow = $('.slideshow'),
            $newSlide

          if ($(this).hasClass('prev')) {
            $newSlide = $slideshow.find('.active').prev()
            if ($newSlide.index() < 0) {
              $newSlide = $('.image').last()
            }
          } else {
            $newSlide = $slideshow.find('.active').next()
            if ($newSlide.index() < 0) {
              $newSlide = $('.image').first()
            }
          }

          $slideshow.find('.active').removeClass('active').hide()
          $newSlide.addClass('active').show()
          return false
        })
      } else {
        // console.log('Layer ID not found')
        // Throw an error or display a message to the user
      }
    })
  }, [])

  const handleClick = () => {
    map.current = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    localStorage.setItem('link', value)
    setStyle(value)
    setValue('')
  }

  return (
    <>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="value"
          name="value"
          value={value}
          placeholder="Style Link"
          onChange={(event) => setValue(event.target.value)}
        />
        <button>Submit</button>
      </form> */}
      <div style={{ height: '90%' }}>
        <div ref={mapContainer} className='map-container' id='map' />
        {/* <div ref={popup} className="map-container" id="map" /> */}
        {/* <button onClick={() => handleClick()}> click</button> */}
      </div>
    </>
  )
}

export default MapPreview
