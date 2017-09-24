
const themes = exports.themes = [
  [ // Tango
    '#111213', '#CC0000', '#4E9A06', '#C4A000', '#3465A4', '#75507B', '#06989A', '#D3D7CF',
    '#555753', '#EF2929', '#8AE234', '#FCE94F', '#729FCF', '#AD7FA8', '#34E2E2', '#EEEEEC'
  ],
  [ // Linux (CGA)
    '#000000', '#aa0000', '#00aa00', '#aa5500', '#0000aa', '#aa00aa', '#00aaaa', '#aaaaaa',
    '#555555', '#ff5555', '#55ff55', '#ffff55', '#5555ff', '#ff55ff', '#55ffff', '#ffffff'
  ],
  [ // xterm
    '#000000', '#cd0000', '#00cd00', '#cdcd00', '#0000ee', '#cd00cd', '#00cdcd', '#e5e5e5',
    '#7f7f7f', '#ff0000', '#00ff00', '#ffff00', '#5c5cff', '#ff00ff', '#00ffff', '#ffffff'
  ],
  [ // rxvt
    '#000000', '#cd0000', '#00cd00', '#cdcd00', '#0000cd', '#cd00cd', '#00cdcd', '#faebd7',
    '#404040', '#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff', '#ffffff'
  ],
  [ // Ambience
    '#2e3436', '#cc0000', '#4e9a06', '#c4a000', '#3465a4', '#75507b', '#06989a', '#d3d7cf',
    '#555753', '#ef2929', '#8ae234', '#fce94f', '#729fcf', '#ad7fa8', '#34e2e2', '#eeeeec'
  ],
  [ // Solarized light
    '#073642', '#dc322f', '#859900', '#b58900', '#268bd2', '#d33682', '#2aa198', '#eee8d5',
    '#002b36', '#cb4b16', '#586e75', '#657b83', '#839496', '#6c71c4', '#93a1a1', '#fdf6e3'
  ],
  [ // Solarized dark
    '#073642', '#dc322f', '#859900', '#b58900', '#268bd2', '#d33682', '#2aa198', '#eee8d5',
    '#002b36', '#cb4b16', '#586e75', '#657b83', '#839496', '#6c71c4', '#93a1a1', '#fdf6e3'
  ],
  [ // CGA NTSC
    '#000000', '#69001A', '#117800', '#769100', '#1A00A6', '#8019AB', '#289E76', '#A4A4A4',
    '#484848', '#C54E76', '#6DD441', '#D2ED46', '#765BFF', '#DC75FF', '#84FAD2', '#FFFFFF'
  ],
  [ // ZX Spectrum
    '#000000', '#aa0000', '#00aa00', '#aaaa00', '#0000aa', '#aa00aa', '#00aaaa', '#aaaaaa',
    '#000000', '#ff0000', '#00FF00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff', '#ffffff'
  ],
  [ // Apple II
    '#000000', '#722640', '#0E5940', '#808080', '#40337F', '#E434FE', '#1B9AFE', '#BFB3FF',
    '#404C00', '#E46501', '#1BCB01', '#BFCC80', '#808080', '#F1A6BF', '#8DD9BF', '#ffffff'
  ],
  [ // Commodore
    '#000000', '#8D3E37', '#55A049', '#AAB95D', '#40318D', '#80348B', '#72C1C8', '#D59F74',
    '#8B5429', '#B86962', '#94E089', '#FFFFB2', '#8071CC', '#AA5FB6', '#87D6DD', '#ffffff'
  ]
]

exports.fgbgThemes = [
  ['#aaaaaa', '#000000'], // grey_on_black
  ['#000000', '#ffffdd'], // black_on_yellow
  ['#000000', '#ffffff'], // black_on_white
  ['#ffffff', '#000000'], // white_on_black
  ['#00ff00', '#000000'], // green_on_black
  ['#e53c00', '#000000'], // orange_on_black
  ['#ffffff', '#300a24'], // ambience
  ['#657b83', '#fdf6e3'], // solarized_light
  ['#839496', '#002b36']  // solarized_dark
]

let colorTable256 = null

exports.buildColorTable = function () {
  if (colorTable256 !== null) return colorTable256

  // 256color lookup table
  // should not be used to look up 0-15 (will return transparent)
  colorTable256 = new Array(16).fill('rgba(0, 0, 0, 0)')

  // fill color table
  // colors 16-231 are a 6x6x6 color cube
  for (let red = 0; red < 6; red++) {
    for (let green = 0; green < 6; green++) {
      for (let blue = 0; blue < 6; blue++) {
        let redValue = red * 40 + (red ? 55 : 0)
        let greenValue = green * 40 + (green ? 55 : 0)
        let blueValue = blue * 40 + (blue ? 55 : 0)
        colorTable256.push(`rgb(${redValue}, ${greenValue}, ${blueValue})`)
      }
    }
  }
  // colors 232-255 are a grayscale ramp, sans black and white
  for (let gray = 0; gray < 24; gray++) {
    let value = gray * 10 + 8
    colorTable256.push(`rgb(${value}, ${value}, ${value})`)
  }

  return colorTable256
}

exports.SELECTION_FG = '#333'
exports.SELECTION_BG = '#b2d7fe'

exports.themePreview = function (n) {
  document.querySelectorAll('[data-fg]').forEach((elem) => {
    let shade = +elem.dataset.fg
    elem.style.color = themes[n][shade]
  })
  document.querySelectorAll('[data-bg]').forEach((elem) => {
    let shade = +elem.dataset.bg
    elem.style.backgroundColor = themes[n][shade]
  })
}