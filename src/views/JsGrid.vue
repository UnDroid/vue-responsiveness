<template lang='pug'>
  .jsg
    pre
      span
        strong {{ $win.orientation }}:
        | {{ $win.width }} x {{ $win.height }}
      span
        strong active:
        | {{ active }}
      span
        strong ppp:
        | {{ postsPerPage }}
      span
        strong img size:
        | {{ imageSize }}
    .pagination
      span(v-for='pnum in Math.ceil(posts.length / postsPerPage)', @click='offset = postsPerPage * (pnum - 1)', :class='{ active: Math.floor(offset / postsPerPage) + 1 === pnum  }') {{ pnum }}
    .posts
      .post(v-for='post in page', :key='post.id', )
        .pic(v-aspect-ratio='"4:3"', ref='pic')
          img.loading(src='/img/loading.svg', alt='')
          .background(:style='{ backgroundImage: `url(${post.actualImage})`}')
          .gradient
          h2
            a(:href='post.link', target='_blank') {{ post.title }}
              svg.external-link(aria-hidden='true', focusable='false', data-prefix='fas', data-icon='external-link-alt', role='img', xmlns='http://www.w3.org/2000/svg', viewBox='0 0 512 512')
                path(fill='currentColor', d='M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z')
        .short
          span {{ post.short }}
</template>

<script>
  import AspectRatio from 'v-aspect-ratio'
  export default {
    name: 'js-grid',
    directives: {
      'aspect-ratio': AspectRatio.directive
    },
    data: () => ({
      offset: 0
    }),
    watch: {
      $win: {
        deep: true,
        immediate: true,
        handler() {
          if(typeof this.$refs.pic !== 'undefined') {
            this.picWidth = this.$refs.pic[0].clientWidth
          } else {
            this.$nextTick(() => {
              this.picWidth = this.$refs.pic[0].clientWidth
            })
          }
        }
      }
    },
    computed: {
      posts() {
        return this.$store.state.posts
      },
      active() {
        return Object.keys(this.$rsp).filter(zName => this.$rsp[zName].in).join(',')
      },
      imageSize() {
        return this.$rsp.apn.in ? 'sm' : (
          this.$rsp.apd.in || this.$rsp.ltp.in ? 'md' : (
            this.$rsp.dtp.in ? 'md' : (
              this.$rsp.fhd.in ? 'lg' : 'xl'
            )
          )
        )
      },
      postsPerPage() {
        return this.$rsp.apn.in ? 4 : (
          this.$rsp.apd.in || this.$rsp.ltp.in ? 6 : (
            this.$rsp.dtp.from && this.$win.width < 2160 ? 12 : (
              this.$rsp.uhd.from ? 15 : 12
            )
          )
        )
      },
      page() {
        return this.posts.slice(this.offset, this.offset + this.postsPerPage).map(post => {
          post.actualImage = post.image[this.imageSize]
          return post
        })
      }
    }
  }
</script>

<style lang="scss">
  .jsg {
    background-color: $white;
    width: 100%;
    text-align: center;
    margin: 0 auto;
    pre {
      background-color: $cerebral-grey;
      color: $carbon;
      white-space: normal;
      @include normalize-rhythm(padding, 1, $h1-font-size);
      @include normalize-rhythm(margin, 0 0 1.5 0, $h1-font-size);
      span {
        white-space: nowrap;
        display: inline-block;
        @include normalize-rhythm(padding, 0 1, $h1-font-size);
        strong {
          display: inline-block;
          @include normalize-rhythm(padding-right, .5, $h1-font-size);
        }
      }
    }
    .pagination {
      margin-bottom: .75em;
      user-select: none;
      white-space: nowrap;
      -webkit-touch-callout: none;
      span {
        background-color: $cerebral-grey;
        width: 2em;
        height: 2em;
        line-height: 2em;
        border-radius: 50%;
        display: inline-block;
        margin: .25em;
        cursor: pointer;
        &:hover:not(.active) {
          background-color: $light-salt-spray;
        }
        &.active {
          background-color: $usc-gold;
          color: $usc-cardinal;
          cursor: default;
        }
      }
    }
    .posts {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: stretch;
      align-content: stretch;
      .post {
        background-color: $warp-drive;
        // max-width: calc(50% + #{normalize-rhythm($base-line-height, $h1-font-size) / 2});
        display: flex;
        align-items: stretch;
        align-content: stretch;
        justify-content: flex-start;
        flex-direction: column;
        flex-wrap: nowrap;
        flex: 0 0 49%;
        position: relative;
        @include normalize-rhythm(margin-bottom, 1.33, $h1-font-size);
        @include rsp(vpn) { flex: 0 0 100%; }
        @include rsp(ltp) { flex: 0 0 32.67%; }
        @include rsp(dtp) { flex: 0 0 32.67%; }
        @include rsp(hdp, in, (hdp: ( min: 1600, max: 1919 ))) { flex: 0 0 24.5%; }
        @include rsp(fhd, from) { flex: 0 0 24.5%; }
        @include rsp(uhd, from) { flex: 0 0 19.6%; }
        .pic {
          background-color: $cerebral-grey;
          background-position: center;
          background-size: cover;
          position: relative;
          .loading {
            width: 20%;
            height: auto;
            transform: translate(-50%, -50%);
            position: absolute;
            left: 50%;
            top: 50%;
          }
          .background {
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            top: 0;
          }
          .gradient {
            width: 100%;
            height: 100%;
            background-image: linear-gradient(to top, rgba(#000, .5) 0%, rgba(#000, .1) 40%, rgba(#000,0) 100%);
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            top: 0;
          }
          h2 {
            width: 92%;
            color: $white;
            font-size: 1.3333em;
            line-height: 1.3333em;
            text-shadow: 0 -1.5px 3px rgba($carbon, .4);
            position: absolute;
            bottom: 0;
            left: 4%;
            a {
              color: $white;
              .external-link {
                width: .75em;
                height: auto;
                vertical-align: baseline;
                margin-left: .5em;
              }
            }
          }
        }
        .short {
          line-height: 1.5em;
          @include normalize-rhythm(padding, 1.33, $h1-font-size);
          display: flex;
          flex-grow: 1;
          align-items: center;
        }
      }
    }
  }
</style>
