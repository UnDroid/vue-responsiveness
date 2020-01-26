import Vue from 'vue'
import Vuex from 'vuex'

import uuidv4 from 'uuid/v4'
import dimsum from 'dimsum'

Vue.use(Vuex)

const photos = [
  'GI6L2pkiZgQ', '-1PzCC5XAzo', 'G5OaVuH5GqA', 'eVKZB_kbxvs', 'nks-eleD9R4',
  'pYyOZ8q7AII', 'W0ZYnYIhhDc', 'Ib2e4-Qy9mQ', '3lxrM5yvkcI', '4ET5xgOzEOI',
  'dbu1zrkZZuo', 'PsxNKud0ucg', 'Fae5vVZ78eM', 'mtylwjqDfwA', '5siPaKXak0w',
  'yPbBYE1pkHo', 'JZiMQY-zSp4', 'DvbkZqpllGs', 'RKeYaCTFblY', 'I9SWvZ9sO2U',
  'XcwCqAnmOts', 'xpVWMuxqJVQ', 'ryC3SVUeRgY', 't7w4NnjOwDk', 'Az9-MnRnnCU',
  '2x19-mRQgX8', 'Shuj-9LqHwk', '8j0CTWsImzo', 'RnyZVY9KDNE', '37cs3XnW2_c',
  '4oMpN1aFVNI', 'HrwJFG-GRng', 'Q4m5QdibJls', 'bKhETeDV1WM', 'Yyk5-zHEzb0',
  '-GUKy4DPv58', 'ii6dE72AUhc', 'CFbVdWD1RiI', 'xUUZcpQlqpM', 'vu4LhI_RZ6c',
  'YLMs82LF6FY', 'SNUk-nQnM1w', '9R3EoFuL584', '505eectW54k', 'qQs0C9a5cZY',
  'KE0nC8-58MQ', '2FPjlAyMQTA', 'VdRex9AiBOc', 'V6jwqsKA0aQ', 'l12FBMylKQs',
  'H_M4dX_F1LQ', 'A3V4fXudLhU', 'XlgM49J8EVk', 'h95mT1m9Zzs', '7nsvbqwP_bQ',
  'ji3xd3uKN6Y', 'Lbey-Fi5di0', 'AFvUO61NlOU', 'VID8rLzqRxs', '2wvq2X9LOfg',
  'Cc4sToR2Oc0', 'eHlVZcSrjfg', 'RCU_nX9Qf8Y', '_B-lIDdQldU', 'C-lAD9Xizbg',
  'fSdTIM3ijQQ', 'xpw5IOgLjuw', 'Fuj145tMO84', 'KPT_ZBs4xc4', 'qC117ahi-mE',
  '6f_ANCcbj3o', 'GjzJFMnJZYg', 'hDOskFirs-c', 'ZhQCZjr9fHo', 'oTP4xd9SAkc',
  'sBNx8CBj12w', 'Mawa0oZ3YKs', 'TYUS-cXzy50', 'oCZHIa1D4EU', 'YZ76ky4-eYs',
  '1WZn-vlk5cg', '0_xMuEbpFAQ', '6Ox3fPG-qvo', 'EerxztHCjM8', 'nI4OwVnz0dw',
  'nyvR6wbU1ho', 'OZACaaUskhg', 'EJ4qfFp1g8Q', 'cvQmr_TmrUE', 'kQzFr1JqSKM',
  'D4g64YUacLA', 'OX_en7CXMj4', '-adIJRVbplE', 'DJ7bWa-Gwks', 'OeSaQYj5vPE',
  'AowZ2Bt_T50', 'hpjSkU2UYSU', 'zNRITe8NPqY', 'KfST263yVDc', 'CLwcoe1HMI8',
  '7jXn8ODFVOI', 'rgLl9qA6kUA', 'i4hoJLkPWO8', 'BIlmy2-2i0E', 'LdfLThHJB7c',
  'GYrxt-pUg8g', 'jmV3c_ijhzI', 'vmZ2DehWQ3Q', '4hgYULBzVEE', 'XJX4ldOJ-Xs',
  'Eye_or7LxxQ', '-1xst_xfY7Y', 'qX9Ie7ieb1E', '7FKX37yS0yg', 'yuF2B5Zyz88',
  '3MwArYh-7yU', 'iI4sR_nkkbc', '1CyjbVB5c8k', 'UTbcrtjp18g', 'c0W6tY_Wgcs',
  '9R9Z8PHwo2E', 'yLaZQBDa6WM', 'gmBSnXfzh4c', 'lOsbnJKTaI8', 'Yqqb_YEsTAQ',
  'OtZ38_n1KEA', 'k1bO_VTiZSs', 'QHRZv6PIW4s', 'kZ1zThg6G40', 'McsNra2VRQQ',
  'q66grqqHpDQ', 'wXkGvQJWI-Y', 'a5ToDH34m0I', 'hfIMkIcIq_k', 'Psd1Gb3fhvU',
  'qrAFY35Ue2I', '3bCLqdZMyCA', 'WmLT_IyZ1e8', 'M0HwJ4j58-w', '-F9svypZ_9Q',
  '9Y8vxVQN4o4', '0TQa-Ur6Zqg', 'oQe33eXyYUw', 'SYx3UCHZJlo', 'hrlvr2ZlUNk',
  'qjvXVI0hKFU', 'XTYoDjmXRag', '1NTFSnV-KLs', 'hGV2TfOh0ns', 'JVSgcV8_vb4'
]

export default new Vuex.Store({
  state: {
    posts: new Array(20 + Math.round(20 * Math.random()))
  },
  mutations: {
    GEN_POSTS(state) {
      for(let i = 0; i < state.posts.length; i++) {
        const excerpt = dimsum.generate(1, { format: 'html' })
        const short = excerpt.substr(3, excerpt.indexOf('.') - 2)
        const photo = Math.round(Math.random() * (photos.length - 1))
        const image = photos[photo]
        photos.splice(photo, 1)
        state.posts[i] = {
          id: uuidv4(),
          title: dimsum.sentence().split(/[\s\t,.-]+/, 3 + Math.floor(Math.random() * 3)).join(' '),
          image: {
            sm: `https://source.unsplash.com/${image}/320x240`,
            md: `https://source.unsplash.com/${image}/480x360`,
            lg: `https://source.unsplash.com/${image}/640x480`,
            xl: `https://source.unsplash.com/${image}/960x720`
          },
          link: `https://unsplash.com/photos/${image}`,
          short,
          excerpt,
          text: dimsum.generate(Math.round(Math.random() * 5), { format: 'html' })
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
