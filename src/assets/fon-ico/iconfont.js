!(function(d) {
  var e,
    l =
      '<svg><symbol id="icon-user" viewBox="0 0 1024 1024"><path d="M576 706.624l0-52.768c70.496-39.712 128-138.784 128-237.824 0-159.072 0-288-192-288s-192 128.928-192 288c0 99.072 57.504 198.112 128 237.824l0 52.768c-217.088 17.76-384 124.416-384 253.376l896 0c0-128.96-166.912-235.648-384-253.376z"  ></path></symbol><symbol id="icon-3702mima" viewBox="0 0 1024 1024"><path d="M893.532041 881.355209l-0.284479-392.855436c-1.805112-41.266869-35.472909-74.250074-77.136821-74.419943l-50.869574 0.029676 0-35.523051 0.191358 0 0.170892-81.20344c0-2.183735-0.285502-4.273327-0.647753-6.363941-2.829442-123.525338-101.722776-223.293599-224.985124-227.214908l0-1.137916C414.498874 64.128553 313.084113 164.882258 310.218856 289.995767c-0.361227 2.090615-0.64673 4.180206-0.64673 6.363941l0.170892 81.20344 0.191358 0 0 36.477796-0.094144 0 0 0.323365-42.272779 0.019443c-2.596128 0.115634-5.158487 0.358157-7.682983 0.720408l-0.819668 0c-41.663912 0.169869-75.331709 33.152051-77.136821 74.419943l-0.284479 392.855436c0.209778 42.786479 34.921347 77.441766 77.763085 77.441766l38.911218 0 0 0.037862 466.923362 0.265036 0-0.302899 38.910195 0c4.331655 0 8.575306-0.370437 12.71458-1.050935C859.199095 958.181969 893.32431 923.774321 893.532041 881.355209zM387.811048 296.094672c0.514723-82.71998 65.588811-150.08832 147.393955-154.210197l0 0.847298c84.028788 1.687432 151.633512 70.065775 152.158469 154.386206l0.454348 0c0 0.095167-0.036839 0.170892-0.036839 0.265036l-0.26299 116.770494-299.860439 0.172939-0.265036-117.966739c0-0.094144-0.037862-0.169869-0.037862-0.265036L387.811048 296.094672z"  ></path></symbol></svg>',
    t = (e = document.getElementsByTagName('script'))[
      e.length - 1
    ].getAttribute('data-injectcss')
  if (t && !d.__iconfont__svg__cssinject__) {
    d.__iconfont__svg__cssinject__ = !0
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      )
    } catch (e) {
      console && console.log(e)
    }
  }
  !(function(e) {
    if (document.addEventListener)
      if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState))
        setTimeout(e, 0)
      else {
        var t = function() {
          document.removeEventListener('DOMContentLoaded', t, !1), e()
        }
        document.addEventListener('DOMContentLoaded', t, !1)
      }
    else
      document.attachEvent &&
        ((n = e),
        (o = d.document),
        (c = !1),
        (i = function() {
          c || ((c = !0), n())
        }),
        (l = function() {
          try {
            o.documentElement.doScroll('left')
          } catch (e) {
            return void setTimeout(l, 50)
          }
          i()
        })(),
        (o.onreadystatechange = function() {
          'complete' == o.readyState && ((o.onreadystatechange = null), i())
        }))
    var n, o, c, i, l
  })(function() {
    var e, t, n, o, c, i
    ;((e = document.createElement('div')).innerHTML = l),
      (l = null),
      (t = e.getElementsByTagName('svg')[0]) &&
        (t.setAttribute('aria-hidden', 'true'),
        (t.style.position = 'absolute'),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = 'hidden'),
        (n = t),
        (o = document.body).firstChild
          ? ((c = n), (i = o.firstChild).parentNode.insertBefore(c, i))
          : o.appendChild(n))
  })
})(window)
