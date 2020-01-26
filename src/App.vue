<template lang="pug">
  #app
    h1
      img.logo(src='/img/logo.svg', alt='logo')
      | Vue-Responsiveness
    #nav
      router-link(:to='{ name: "responsiveness" }') Table
      router-link(:to='{ name: "grid" }') Grid
    transition(name='route')
      router-view
</template>

<style lang="scss">
  @import "~styles/init";

  #app {
    width: 100%;
    text-align: center;
    margin: 0;
    @include normalize-rhythm(padding, 0 1 1 1, $h1-font-size / 2);
    h1 {
      color: #333;
      font-weight: 700;
      line-height: 1.5em;
      user-select: none;
      white-space: nowrap;
      -webkit-touch-callout: none;
      @include normalize-rhythm(margin, 1 0 0 0, $h1-font-size);
      @include rsp(vpn) {
        font-family: $opensanscondensed;
        font-size: 6.8vw;
        font-weight: 700;
        margin: 1.25em 0 .625em 0;
      }
      .logo {
        width: auto;
        height: 1.5em;
        margin-right: .5em;
        vertical-align: middle;
      }
    }
    #nav {
      color: $argent;
      user-select: none;
      white-space: nowrap;
      -webkit-touch-callout: none;
      @include normalize-rhythm(margin, 0 0 2 0, $h1-font-size);
      a {
        font-weight: 600;
        display: inline-block;
        @include normalize-rhythm(padding, 0 1, $h1-font-size);
        text-decoration: none;
        position: relative;
        &:after {
          content: '';
          background-color: $salt-spray;
          width: 0;
          @include normalize-rhythm(height, .15, $h1-font-size);
          display: block;
          position: absolute;
          left: 50%;
          top: 100%;
          transform: translateX(-50%);
          transition: width .25s $transition-func;
        }
        &.router-link-exact-active {
          color: $palomino-gold;
          &:after {
            background-color: $palomino-gold;
            width: 50%;
          }
        }
      }
    }
    .route-enter-active,
    .route-leave-active {
      transform-origin: top center;
      transition: opacity .2s $transition-func, transform .2s $transition-func;
    }
    .route-enter-active { opacity: 0; transform: scale(.8); transition-delay: .2s; }
    .route-enter-to { opacity: 1; transform: scale(1); transition-delay: .2s; }
    .route-leave-active { opacity: 1; transform: scale(1); }
    .route-leave-to { opacity: 0; transform: scale(.4); }
  }
</style>
