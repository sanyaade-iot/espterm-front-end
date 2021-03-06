const $ = require('./lib/chibi')
const { mk, qs, qsa, cr } = require('./utils')
const modal = require('./modal')
const notify = require('./notif')

/** Global generic init */
$.ready(function () {
  // Opening menu on mobile / narrow screen
  function menuOpen () {
    $('#menu').toggleClass('expanded')
  }
  $('#brand')
    .on('click', menuOpen)
    .on('keypress', cr(menuOpen))

  // Checkbox UI (checkbox CSS and hidden input with int value)
  $('.Row.checkbox').forEach(function (x) {
    let inp = x.querySelector('input')
    let box = x.querySelector('.box')

    $(box).toggleClass('checked', inp.value)

    let hdl = function () {
      inp.value = 1 - inp.value
      $(box).toggleClass('checked', inp.value)
    }

    $(x).on('click', hdl).on('keypress', cr(hdl))
  })

  // Expanding boxes on mobile
  $('.Box.mobcol,.Box.fold').forEach(function (x) {
    let h = x.querySelector('h2')

    let hdl = function () {
      if ($(x).hasClass('d-expanded')) {
        $(x).removeClass('d-expanded')
      } else {
        $(x).toggleClass('expanded')
      }
    }
    $(h).on('click', hdl).on('keypress', cr(hdl))
  })

  $('form').forEach(function (x) {
    $(x).on('keypress', function (e) {
      if ((e.keyCode === 10 || e.keyCode === 13) && e.ctrlKey) {
        x.submit()
      }
    })
  })

  // loader dots...
  setInterval(function () {
    $('.anim-dots').each(function (x) {
      let $x = $(x)
      let dots = $x.html() + '.'
      if (dots.length === 5) dots = '.'
      $x.html(dots)
    })
  }, 1000)

  // flipping number boxes with the mouse wheel
  $('input[type=number]').on('wheel', function (e) {
    let $this = $(this)
    let val = +$this.val()
    if (isNaN(val)) val = 1

    const step = +($this.attr('step') || 1)
    const min = +$this.attr('min')
    const max = +$this.attr('max')
    if (e.deltaY > 0) {
      val += step
    } else {
      val -= step
    }

    if (Number.isFinite(min)) val = Math.max(val, +min)
    if (Number.isFinite(max)) val = Math.min(val, +max)
    $this.val(val)

    if ('createEvent' in document) {
      let evt = document.createEvent('HTMLEvents')
      evt.initEvent('change', false, true)
      $this[0].dispatchEvent(evt)
    } else {
      $this[0].fireEvent('onchange')
    }

    e.preventDefault()
  })

  try {
    do {
      let msgAt, box
      // populate the form errors box from GET arg ?err=...
      // (a way to pass errors back from server via redirect)
      msgAt = window.location.search.indexOf('err=')
      if (msgAt !== -1 && qs('.Box.errors')) {
        let errs = decodeURIComponent(window.location.search.substr(msgAt + 4)).split(',')
        let humanReadableErrors = []
        errs.forEach(function (er) {
          if (er.length === 0) return
          let lbls = qsa('label[for="' + er + '"]')
          if (lbls && lbls.length > 0) {
            for (let i = 0; i < lbls.length; i++) {
              let lbl = lbls[i]
              lbl.classList.add('error')
              if (i === 0) humanReadableErrors.push(lbl.childNodes[0].textContent.trim().replace(/: ?$/, ''))
            }
          } else {
            console.log(JSON.stringify(er))
            humanReadableErrors.push(er)
          }
        })

        qs('.Box.errors .list').innerHTML = humanReadableErrors.join(', ')
        qs('.Box.errors').classList.remove('hidden')
        break
      }

      let fademsgbox = function (box, time) {
        box.classList.remove('hidden')
        setTimeout(() => {
          box.classList.add('hiding')
          setTimeout(() => {
            box.classList.add('hidden')
          }, 1000)
        }, time)
      }

      msgAt = window.location.search.indexOf('errmsg=')
      box = qs('.Box.errmessage')
      if (msgAt !== -1 && box) {
        let msg = decodeURIComponent(window.location.search.substr(msgAt + 7))
        box.innerHTML = msg
        fademsgbox(box, 3000)
        break
      }

      msgAt = window.location.search.indexOf('msg=')
      box = qs('.Box.message')
      if (msgAt !== -1 && box) {
        let msg = decodeURIComponent(window.location.search.substr(msgAt + 4))
        box.innerHTML = msg
        fademsgbox(box, 2000)
        break
      }
    } while (0)
  } catch (e) {
    console.error(e)
  }

  modal.init()
  notify.init()

  // remove tabindices from h2 if wide
  if (window.innerWidth > 550) {
    $('.Box h2').forEach(function (x) {
      x.removeAttribute('tabindex')
    })

    // brand works as a link back to term in widescreen mode
    let br = qs('#brand')
    br && br.addEventListener('click', function () {
      window.location.href = '/' // go to terminal
    })
  }
})

// setup the ajax loader
$._loader = function (vis) {
  $('#loader').toggleClass('show', vis)
}

let pageShown = false
// reveal content on load
function showPage () {
  pageShown = true
  $('#content').addClass('load')
}
// HACKITY HACK: fix this later
window.showPage = showPage

// Auto reveal pages other than the terminal (sets window.noAutoShow)
$.ready(function () {
  if (window.noAutoShow === true) {
    setTimeout(function () {
      if (!pageShown) {
        let bnr = mk('P')
        bnr.id = 'load-failed'
        bnr.innerHTML =
          'Server connection failed! Trying again' +
          '<span class="anim-dots" style="width:1.5em;text-align:left;display:inline-block">.</span>'
        qs('#screen').appendChild(bnr)
        qs('#screen').classList.add('failed')
        showPage()
      }
    }, 2000)
  } else {
    setTimeout(function () {
      showPage()
    }, 1)
  }
})
