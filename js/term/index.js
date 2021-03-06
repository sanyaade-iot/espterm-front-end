const $ = require('../lib/chibi')
const { qs, mk } = require('../utils')
const localize = require('../lang')
const Notify = require('../notif')
const TermScreen = require('./screen')
const TermConnection = require('./connection')
const TermInput = require('./input')
const TermUpload = require('./upload')
const initSoftKeyboard = require('./soft_keyboard')
const attachDebugger = require('./debug')
const initButtons = require('./buttons')

/** Init the terminal sub-module - called from HTML */
module.exports = function (opts) {
  const screen = new TermScreen()
  const conn = new TermConnection(screen)
  const input = TermInput(conn, screen)
  const termUpload = TermUpload(conn, input, screen)
  input.termUpload = termUpload

  // forward screen input events
  screen.on('mousedown', (...args) => input.onMouseDown(...args))
  screen.on('mousemove', (...args) => input.onMouseMove(...args))
  screen.on('mouseup', (...args) => input.onMouseUp(...args))
  screen.on('mousewheel', (...args) => input.onMouseWheel(...args))
  screen.on('input-alts', (...args) => input.setAlts(...args))
  screen.on('mouse-mode', (...args) => input.setMouseMode(...args))

  // touch selection menu (the Copy button)
  $.ready(() => {
    const touchSelectMenu = qs('#touch-select-menu')
    screen.on('show-touch-select-menu', (x, y) => {
      let rect = touchSelectMenu.getBoundingClientRect()
      x -= rect.width / 2
      y -= rect.height / 2

      touchSelectMenu.classList.add('open')
      touchSelectMenu.style.transform = `translate(${x}px,${y}px)`
    })
    screen.on('hide-touch-select-menu', () => touchSelectMenu.classList.remove('open'))

    const copyButton = qs('#touch-select-copy-btn')
    if (copyButton) {
      copyButton.addEventListener('click', () => {
        screen.copySelectionToClipboard()
      })
    }
  })

  // buttons
  const buttons = initButtons(input)
  screen.on('buttons-update', update => {
    buttons.labels = update.labels
    buttons.colors = update.colors
  })
  // TODO: don't access the renderer here
  buttons.palette = screen.layout.renderer.palette
  screen.layout.renderer.on('palette-update', palette => {
    buttons.palette = palette
  })

  screen.on('full-load', () => {
    let scr = qs('#screen')
    let errmsg = qs('#load-failed')
    if (scr) scr.classList.remove('failed')
    if (errmsg) errmsg.parentNode.removeChild(errmsg)
  })

  let setLinkVisibility = visible => {
    let buttons = [...document.querySelectorAll('.x-term-conf-btn')]
    if (visible) buttons.forEach(x => x.classList.remove('hidden'))
    else buttons.forEach(x => x.classList.add('hidden'))
  }
  let setButtonVisibility = visible => {
    if (visible) qs('#action-buttons').classList.remove('hidden')
    else qs('#action-buttons').classList.add('hidden')
  }

  screen.on('opts-update', () => {
    setLinkVisibility(screen.showLinks)
    setButtonVisibility(screen.showButtons)
  })

  screen.on('title-update', text => {
    qs('#screen-title').textContent = text
    if (!text) text = 'Terminal'
    qs('title').textContent = `${text} :: ESPTerm`
  })

  // connection status

  let showSplashTimeout = null
  let showSplash = (obj, delay = 250) => {
    clearTimeout(showSplashTimeout)
    showSplashTimeout = setTimeout(() => {
      screen.window.statusScreen = obj
    }, delay)
  }

  conn.on('open', () => {
    // console.log('*open')
    showSplash({ title: localize('term_conn.connecting'), loading: true })
  })
  conn.on('connect', () => {
    // console.log('*connect')
    showSplash({ title: localize('term_conn.waiting_content'), loading: true })
  })
  screen.on('load', () => {
    // console.log('*load')
    clearTimeout(showSplashTimeout)
    if (screen.window.statusScreen) screen.window.statusScreen = null
  })
  conn.on('disconnect', () => {
    // console.log('*disconnect')
    showSplash({ title: localize('term_conn.disconnected') }, 500)
    screen.screen = []
    screen.screenFG = []
    screen.screenBG = []
    screen.screenAttrs = []
  })
  conn.on('silence', () => {
    // console.log('*silence')
    showSplash({ title: localize('term_conn.waiting_server'), loading: true }, 0)
  })
  // conn.on('ping-fail', () => { screen.window.statusScreen = { title: 'Disconnected' } })
  conn.on('ping-success', () => {
    // console.log('*ping-success')
    showSplash({ title: localize('term_conn.reconnecting'), loading: true }, 0)
  })

  conn.init()
  input.init(opts)
  termUpload.init()
  Notify.init()

  window.onerror = function (errorMsg, file, line, col) {
    Notify.show(`<b>JS ERROR!</b><br>${errorMsg}<br>at ${file}:${line}:${col}`, 10000, true)
    return false
  }

  qs('#screen').appendChild(screen.layout.canvas)

  initSoftKeyboard(screen, input)
  if (attachDebugger) attachDebugger(screen, conn)

  // fullscreen mode

  let fullscreenIcon = {} // dummy
  let isFullscreen = false
  let properFullscreen = false
  let fitScreen = false
  let screenPadding = screen.layout.window.padding
  let fitScreenIfNeeded = function fitScreenIfNeeded () {
    if (isFullscreen) {
      fullscreenIcon.className = 'icn-resize-small'
      if (properFullscreen) {
        screen.layout.window.fitIntoWidth = window.screen.width
        screen.layout.window.fitIntoHeight = window.screen.height
        screen.layout.window.padding = 0
      } else {
        screen.layout.window.fitIntoWidth = window.innerWidth
        if (qs('#term-nav').classList.contains('hidden')) {
          screen.layout.window.fitIntoHeight = window.innerHeight
        } else {
          screen.layout.window.fitIntoHeight = window.innerHeight - 24
        }
        screen.layout.window.padding = 0
      }
    } else {
      fullscreenIcon.className = 'icn-resize-full'
      screen.layout.window.fitIntoWidth = fitScreen ? window.innerWidth - 4 : 0
      screen.layout.window.fitIntoHeight = fitScreen ? window.innerHeight : 0
      screen.layout.window.padding = screenPadding
    }
  }
  fitScreenIfNeeded()
  window.addEventListener('resize', fitScreenIfNeeded)

  let toggleFitScreen = function () {
    fitScreen = !fitScreen
    const resizeButtonIcon = qs('#resize-button-icon')
    if (fitScreen) {
      resizeButtonIcon.classList.remove('icn-resize-small')
      resizeButtonIcon.classList.add('icn-resize-full')
    } else {
      resizeButtonIcon.classList.remove('icn-resize-full')
      resizeButtonIcon.classList.add('icn-resize-small')
    }
    fitScreenIfNeeded()
  }

  qs('#term-fit-screen').addEventListener('click', function () {
    toggleFitScreen()
    return false
  })

  // add fullscreen mode & button
  if (window.Element.prototype.requestFullscreen || window.Element.prototype.webkitRequestFullscreen) {
    properFullscreen = true

    let checkForFullscreen = function () {
      // document.fullscreenElement is not really supported yet, so here's a hack
      if (isFullscreen && (window.innerWidth !== window.screen.width || window.innerHeight !== window.screen.height)) {
        isFullscreen = false
        fitScreenIfNeeded()
      }
    }
    setInterval(checkForFullscreen, 500)
  }

  // (why are the buttons anchors?)
  let button = mk('a')
  button.id = 'fullscreen-button'
  button.href = '#'
  button.addEventListener('click', e => {
    e.preventDefault()

    if (document.body.classList.contains('pseudo-fullscreen')) {
      document.body.classList.remove('pseudo-fullscreen')
      isFullscreen = false
      fitScreenIfNeeded()
      return
    }

    isFullscreen = true
    fitScreenIfNeeded()
    screen.layout.updateSize()

    if (properFullscreen) {
      if (screen.layout.canvas.requestFullscreen) screen.layout.canvas.requestFullscreen()
      else screen.layout.canvas.webkitRequestFullscreen()
    } else {
      document.body.classList.add('pseudo-fullscreen')
    }
  })
  fullscreenIcon = mk('i')
  fullscreenIcon.className = 'icn-resize-full'
  button.appendChild(fullscreenIcon)
  let span = mk('span')
  span.textContent = localize('term_nav.fullscreen')
  button.appendChild(span)
  qs('#term-nav').insertBefore(button, qs('#term-nav').firstChild)

  // for debugging
  window.termScreen = screen
  window.buttons = buttons
  window.conn = conn
  window.input = input
  window.termUpl = termUpload
}
