// js code for news ticker
(function(e) {
  e.fn.tickerme = function(t) {
    var n = e.extend({}, e.fn.tickerme.defaults, t);
    return this.each(function() {
      function a() {
        e(t).hide();
        e("body")
          .prepend(r)
          .prepend(i);
        var n = '<div id="ticker_container">';
        n += '<div id="newscontent"><div id="news"></div></div>';
        n += '<div id="controls">';
        n +=
          '<a href="#" id="pause_trigger"><svg class="icon icon-pause" viewBox="0 0 32 32"><use xlink:href="#icon-pause"></use></svg></a>';
        n +=
          '<a href="#" id="play_trigger" style="display:none"><svg class="icon icon-play" viewBox="0 0 32 32"><use xlink:href="#icon-play"></use></svg></a>';
        n +=
          '<a href="#" id="prev_trigger"><svg class="icon icon-prev" viewBox="0 0 32 32"><use xlink:href="#icon-prev"></use></svg></a>';
        n +=
          '<a href="#" id="next_trigger"><svg class="icon icon-next" viewBox="0 0 32 32"><use xlink:href="#icon-next"></use></svg></a>';
        n += "</div>";
        n += "</div>";
        e(n).insertAfter(t);
        e(t)
          .children()
          .each(function(t) {
            s[t] = e(this).html();
          });
        f();
      }
      function f() {
        if (o == s.length - 1) {
          o = 0;
        } else {
          o++;
        }
        if (n.type == "fade") {
          e("#news").fadeOut(n.fade_speed, function() {
            e("#newscontent").html('<div id="news">' + s[o] + "</div>");
            e("#news").fadeIn(n.fade_speed);
          });
        }
        u = setTimeout(f, n.duration);
      }
      var t = e(this);
      var r =
        '<svg display="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="224" height="32" viewBox="0 0 224 32"><defs><g id="icon-play"><path class="path1" d="M6 4l20 12-20 12z"></path></g><g id="icon-pause"><path class="path1" d="M4 4h10v24h-10zM18 4h10v24h-10z"></path></g><g id="icon-prev"><path class="path1" d="M18 5v10l10-10v22l-10-10v10l-11-11z"></path></g><g id="icon-next"><path class="path1" d="M16 27v-10l-10 10v-22l10 10v-10l11 11z"></path></g></defs></svg>';
      var i =
        '<style type="text/css">#ticker_container{width:100%}#newscontent{float:left}#news{display:none}#controls{float:right;height:16px}.icon{display:inline-block;width:16px;height:16px;fill:' +
        n.control_colour +
        "}.icon:hover{fill:" +
        n.control_rollover +
        "}</style>";
      var s = [];
      var o = -1;
      var u;
      a();
      e("a#pause_trigger").click(function() {
        clearTimeout(u);
        e(this).hide();
        e("#play_trigger").show();
        return false;
      });
      e("a#play_trigger").click(function() {
        f();
        e(this).hide();
        e("#pause_trigger").show();
        return false;
      });
      e("a#prev_trigger").click(function() {
        if (o == 0) {
          o = s.length - 1;
        } else {
          o--;
        }
        e("#newscontent").html(
          '<div id="news" style="display:block">' + s[o] + "</div>"
        );
        if (n.auto_stop) e("a#pause_trigger").trigger("click");
        return false;
      });
      e("a#next_trigger").click(function() {
        if (o == s.length - 1) {
          o = 0;
        } else {
          o++;
        }
        e("#newscontent").html(
          '<div id="news" style="display:block">' + s[o] + "</div>"
        );
        if (n.auto_stop) e("a#pause_trigger").trigger("click");
        return false;
      });
    });
  };
  e.fn.tickerme.defaults = {
    fade_speed: 500,
    duration: 3e3,
    auto_stop: true,
    type: "fade",
    control_colour: "#333333",
    control_rollover: "#666666",
  };
})(jQuery);
function nextTab(elem) {
  $(elem)
    .next()
    .find('a[data-toggle="tab"]')
    .click();
}
function prevTab(elem) {
  $(elem)
    .prev()
    .find('a[data-toggle="tab"]')
    .click();
}
function toggleChevron(e) {
  $(e.target)
    .prev(".panel-heading")
    .find("i.indicator")
    .toggleClass("fa-caret-down fa-caret-right");
}
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $(".img-preview").attr("src", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
function addNow() {
  nowDate = moment()
    .tz("Europe/London")
    .format("YYYY-MM-DD");
  nowTime = moment()
    .tz("Europe/London")
    .format("HH:mm:ss");
  document.getElementById("registration-date").value = nowDate;
  document.getElementById("registration-time").value = nowTime;
  set = setTimeout(function() {
    addNow();
  }, 1000);
}

jQuery(function($) {

  $(".dropdown").hover(
    function() {
      $(".dropdown-menu", this)
        .stop(true, true)
        .slideDown("fast");
      $(this).toggleClass("open");
    },
    function() {
      $(".dropdown-menu", this)
        .stop(true, true)
        .slideUp("fast");
      $(this).toggleClass("open");
    }
  );

  $("#ticker").tickerme();

  $('[data-toggle="tooltip"]').tooltip();

  var brand = document.getElementById("logo-id");
  if (brand != null) {
    brand.className = "attachment_upload";
    brand.onchange = function() {
      document.getElementById("fakeUploadLogo").value = this.value.substring(
        12
      );
    };
  }

  $("#logo-id").change(function() {
    readURL(this);
  });

  $(".star").on("click", function() {
    $(this).toggleClass("star-checked");
  });

  $(".ckbox label").on("click", function() {
    $(this)
      .parents("tr")
      .toggleClass("selected");
  });

  $(".btn-filter").on("click", function() {
    var $target = $(this).data("target");
    if ($target != "all") {
      $(".table tr").css("display", "none");
      $('.table tr[data-status="' + $target + '"]').fadeIn("slow");
    } else {
      $(".table tr")
        .css("display", "none")
        .fadeIn("slow");
    }
  });

  //Initialize tooltips
  $(".nav-tabs > li a[title]").tooltip();

  //Wizard
  $('a[data-toggle="tab"]').on("show.bs.tab", function(e) {
    var $target = $(e.target);

    if ($target.parent().hasClass("disabled")) {
      return false;
    }
  });

  $(".next-step").click(function(e) {
    var $active = $(".wizard .nav-tabs li.active");
    $active.next().removeClass("disabled");
    nextTab($active);
  });
  $(".prev-step").click(function(e) {
    var $active = $(".wizard .nav-tabs li.active");
    prevTab($active);
  });

  $(".carousel").carousel({
    interval: 4000,
  });
  // $("#list").click(function(event) {
  //   event.preventDefault();
  //   $("#products .item").addClass("list-group-item");
  // });
  // $("#grid").click(function(event) {
  //   event.preventDefault();
  //   $("#products .item").removeClass("list-group-item");
  //   $("#products .item").addClass("grid-group-item");
  // });

  $("#accordion").on("hidden.bs.collapse", toggleChevron);
  $("#accordion").on("shown.bs.collapse", toggleChevron);

  $("#myCarousel").carousel({
    interval: 5000,
  });

  //Handles the carousel thumbnails
  $("[id^=carousel-selector-]").click(function() {
    var id_selector = $(this).attr("id");
    try {
      var id = /-(\d+)$/.exec(id_selector)[1];
      jQuery("#myCarousel").carousel(parseInt(id));
    } catch (e) {
    }
  });
  // When the carousel slides, auto update the text
  $("#myCarousel").on("slid.bs.carousel", function(e) {
    var id = $(".item.active").data("slide-number");
    $("#carousel-text").html($("#slide-content-" + id).html());
  });

  //plugin bootstrap minus and plus
  //http://jsfiddle.net/laelitenetwork/puJ6G/
  $(".btn-number").click(function(e) {
    e.preventDefault();

    fieldName = $(this).attr("data-field");
    type = $(this).attr("data-type");
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
      if (type == "minus") {
        if (currentVal > input.attr("min")) {
          input.val(currentVal - 1).change();
        }
        if (parseInt(input.val()) == input.attr("min")) {
          $(this).attr("disabled", true);
        }
      } else if (type == "plus") {
        if (currentVal < input.attr("max")) {
          input.val(currentVal + 1).change();
        }
        if (parseInt(input.val()) == input.attr("max")) {
          $(this).attr("disabled", true);
        }
      }
    } else {
      input.val(0);
    }
  });
  $(".input-number").focusin(function() {
    $(this).data("oldValue", $(this).val());
  });
  $(".input-number").change(function() {
    minValue = parseInt($(this).attr("min"));
    maxValue = parseInt($(this).attr("max"));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr("name");
    if (valueCurrent >= minValue) {
      $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr(
        "disabled"
      );
    } else {
      alert("Sorry, the minimum value was reached");
      $(this).val($(this).data("oldValue"));
    }
    if (valueCurrent <= maxValue) {
      $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr(
        "disabled"
      );
    } else {
      alert("Sorry, the maximum value was reached");
      $(this).val($(this).data("oldValue"));
    }
  });
  $(".input-number").keydown(function(e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if (
      $.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  });

  /**
   * EFECTO PARA FLECHAS EN ACORDEON
   */

  $(document).on("show", ".accordion", function(e) {
    //$('.accordion-heading i').toggleClass(' ');
    $(e.target)
      .prev(".accordion-heading")
      .addClass("accordion-opened");
  });

  $(document).on("hide", ".accordion", function(e) {
    $(this)
      .find(".accordion-heading")
      .not($(e.target))
      .removeClass("accordion-opened");
    //$('.accordion-heading i').toggleClass('fa-chevron-right fa-chevron-down');
  });
});

