/**
 * Loader.
 */

import '../style/loader.scss'

import { load_img } from './Media'

let $ = require('jquery')

const loader = document.createElement('div')
loader.id = 'loader'
document.body.appendChild(loader)

const loaderFrame = document.createElement('div')
loaderFrame.id = 'loaderFrame'
loader.appendChild(loaderFrame)

const loaderImg = document.createElement('img')
loaderImg.src = load_img
loaderImg.id = 'loaderImg'
loaderFrame.appendChild(loaderImg)

const loaderTxt = document.createElement('div')
loaderTxt.id = 'loaderTxt'
loaderFrame.appendChild(loaderTxt)

/**
 * Request main JS and begin.
 */

const URL = './build/main.bundle.js'

$.ajax({
  type: 'GET',
  dataType: 'script',
  url: URL,
  cache: false,
  xhr: function() {
    let xhr = new window.XMLHttpRequest()
    xhr.addEventListener('progress', function(event) {
      if (event.lengthComputable) {
        let perc = Math.round(event.loaded / event.total * 100)
        loaderTxt.innerHTML = 'loading: ' + perc + '%'
      }
    }, false)
    return xhr
  },
  beforeSend: function() {
    $('#loaderTxt').show()
  },
  success: function() {
    $('#loaderTxt').html("booting...")
  }
})
