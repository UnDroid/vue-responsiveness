<template lang='pug'>
  .rsp
    pre
      strong dimensions:
      |  {{ $win.width }} x {{ $win.height }}
      br
      strong orientation:
      |  {{ $win.orientation }}
    table
      thead
        tr
          th name
          th in
          th to
          th from
      tbody
        tr(v-for='(zone, name) in $zones')
          th {{ name }}
            .small(v-for='(val, key) in zone') {{ key }}: {{ val }}
          td(:class='{ true: $rsp[name].in, false: !$rsp[name].in }') {{ $rsp[name].in }}
          td(:class='{ true: $rsp[name].to, false: !$rsp[name].to }') {{ $rsp[name].to }}
          td(:class='{ true: $rsp[name].from, false: !$rsp[name].from }') {{ $rsp[name].from }}
</template>

<script>
  export default {
    name: 'Responsiveness',
    props: {
      idx: Number
    },
    mounted() {
      this.$emit('data', { idx: this.idx, $el: this.$el })
    }
  }
</script>

<style lang="scss">
  .rsp {
    width: 100%;
    text-align: center;
    margin: 0 auto;
    pre, th, td {
      @include normalize-rhythm(padding, 1, $h1-font-size);
    }
    pre {
      background-color: #ccc;
      color: #555;
      @include normalize-rhythm(margin, 0 0 1 0, $h1-font-size);
      strong {
        color: #333;
      }
    }
    table {
      width: calc(100% + #{normalize-rhythm($base-line-height, $h1-font-size)});
      border-collapse: separate;
      @include normalize-rhythm(border-spacing, .5, $h1-font-size);
      position: relative;
      left: #{normalize-rhythm($base-line-height, $h1-font-size) / -2};
      th, td {
        background-color: #ccc;
        color: #333;
        width: 25%;
        font-family: $consolas;
        line-height: 1.2em;
        white-space: nowrap;
        .small {
          color: #777;
          font-size: .75em;
          font-weight: 400;
          line-height: 1em;
          white-space: nowrap;
          display: block;
        }
      }
      td {
        font-family: $lato;
        font-size: .9em;
        font-weight: 700;
      }
    }
    .true {
      background-color: $usc-gold;
    }
    .false {
      background-color: $light-salt-spray;
    }
  }
</style>
