import Vuex from 'vuex'

const defaultZones = {
  vpn: { max: 479 },
  hpn: { min: 480, max: 767 },
  apn: { max: 767 },
  vpd: { min: 768, max: 895 },
  hpd: { min: 896, max: 1024 },
  apd: { min: 768, max: 1024 },
  mbl: { max: 1024 },
  ltp: { min: 1025, max: 1199 },
  dtp: { min: 1200, max: 1919 },
  fhd: { min: 1920, max: 2559 },
  qhd: { min: 2560, max: 3839 },
  uhd: { min: 3840 }
}

const isClient = typeof window !== 'undefined'

/* eslint-disable no-extra-boolean-cast */
function Responsiveness(Vue, options) {
  if(Responsiveness.installed) { return }
  Responsiveness.installed = true

  const zones = (!!options && !!options.zones && typeof options.zones === 'object') ? options.zones : defaultZones

  Vue.use(Vuex)

  const store = new Vuex.Store({ state: { $zones: zones, $rsp: {}, $win: isClient
    ? {
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
      orientation: window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape'
    }
    : { width: 0, height: 0, orientation: 'landscape' }
  }})

  Object.keys(zones).forEach(zName => {
    const zData = zones[zName]
    let zQueries = { in: '', to: '', from: '' }
    if(!!zData.min && !!zData.max) {
      zQueries.in = `(min-width: ${zData.min}px) and (max-width: ${zData.max}px)` } // in (min & max)
    if(!!zData.min) { zQueries.from = `(min-width: ${zData.min}px)` } // from (min)
    if(!!zData.max) { zQueries.to = `(max-width: ${zData.max}px)` } // to (max)
    if(!zData.min) { zQueries.in = zQueries.to } // in (w/o min)
    if(!zData.max) { zQueries.in = zQueries.from } // in (w/o max)
    Vue.set(store.state.$rsp, zName, {
      in: isClient ? window.matchMedia(zQueries.in).matches : false,
      to: isClient ? window.matchMedia(zQueries.to).matches : false,
      from: isClient ? window.matchMedia(zQueries.from).matches : false
    })
    if(isClient) {
      window.matchMedia(zQueries.in).addListener(mql => {
        Vue.set(store.state.$rsp[`${zName}`], 'in', mql.matches)
      })
      if(!!zQueries.to.length) {
        window.matchMedia(zQueries.to).addListener(mql => {
          Vue.set(store.state.$rsp[`${zName}`], 'to', mql.matches)
        })
      }
      if(!!zQueries.from.length) {
        window.matchMedia(zQueries.from).addListener(mql => {
          Vue.set(store.state.$rsp[`${zName}`], 'from', mql.matches)
        })
      }
    }
  })

  if(isClient) {
    window.matchMedia('(orientation: portrait)').addListener(function(mql) {
      Vue.set(store.state.$win, 'orientation', mql.matches ? 'portrait' : 'landscape')
    })

    window.addEventListener('resize', function() {
      Vue.set(store.state.$win, 'width', Math.max(document.documentElement.clientWidth, window.innerWidth || 0))
      Vue.set(store.state.$win, 'height', Math.max(document.documentElement.clientHeight, window.innerHeight || 0))
    }, { passive: true })
  }

  Vue.mixin({
    computed: {
      $zones: () => store.state.$zones, $rsp: () => store.state.$rsp, $win: () => store.state.$win
    }
  })
}

if(isClient && window.Vue) {
  window.Vue.use(Responsiveness)
}

export default Responsiveness
