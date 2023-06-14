// Print Mall JavaScript Document
$(function () {

  $("main").addClass("show");

  //anim AOS
  if ($("[data-aos]").length > 0) {
	 $.get("js/aos.js", function(){
		AOS.init({
		  duration: 1200,
		  once: true
		});
	 });
  }

  //Swiper
  if ($(".swiper.home").length > 0) {
	  $.get("js/swiper-bundle.min.js", function(){
		const swiper = new Swiper('.swiper', {
		  spaceBetween: 0,
		  autoplay: {
			delay: 3000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
			waitForTransition: true
		  },
		  loop: true,
		  breakpoints: {
			991: {
			  slidesPerView: 5,
			},
			768: {
			  slidesPerView: 3,
			},
			480: {
			  slidesPerView: 2,
			},
			375: {
			  slidesPerView: 1,
			}
		  }
		});
	  });
  }

  //calculus
  function calltypelist($type) {
    $.ajax({
      url: $type,
      dataType: "html",
      success: function (data) {
        $("#materials_type").html(data);
        $("#materials_type").removeClass("spinner");
      }
    });
    return false;
  }
  if ($("#pricecalculus").length > 0) {

    $("#print_mall_materials").change(function () {
      $value = $(this).val();
      $("#materials_type").addClass("spinner");
      switch ($value) {
        case "flex":
          calltypelist("ajax/materials/flex.txt");
          break;
        case "cloth":
          calltypelist("ajax/materials/cloth.txt");
          break;
        case "vinyl":
          calltypelist("ajax/materials/vinyl.txt");
          break;
        case "boards":
          calltypelist("ajax/materials/boards.txt");
      }
    });
    //submit form
    $("#pricecalculus").submit(function (event) {
      $unitprice = $("#print_mall_materials_type option:selected").attr("data-price");
      $mtwd = $("#material_width").val();
      $mtwdsz = $("#width_size_in option:selected").attr("data-size");
      switch ($mtwdsz) {
        case "Win":
          $mtwdft = $mtwd / 12;
          break;
        case "Wft":
          $mtwdft = $mtwd;
      }
      $mtht = $("#material_height").val();
      $mthtsz = $("#height_size_in option:selected").attr("data-size");
      switch ($mthtsz) {
        case "Hin":
          $mthtft = $mtht / 12;
          break;
        case "Hft":
          $mthtft = $mtht;
      }
      //inches
      $sizewdfeet = $mtwdft * $mthtft;
      $copies = $("#copies").val();
      $resultft = $sizewdfeet * $unitprice * $copies;
      $reqresultft = $resultft.toFixed(2);

      if ($reqresultft > 300) {
        $("#total").attr("value", $reqresultft + " INR").css("background-color", "#ffffff");
      } else {
        $("#total").attr("value", $reqresultft + " INR (read note)").css("background-color", "#dd6969");
      }
      event.preventDefault();
    });
    $("#pricecalculus").on("reset", function () {
      $("#total").attr("value", 0);
      $("#total").css("background-color", "#ffffff");
    });
  }

  //fullscreen
  function openFullscreen() {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }
  //gallery
  function photoslide(obj1, obj2, obj3) {
	  $.get("js/swiper-bundle.min.js", function(){
		const swiper = new Swiper(obj1, {
		  slidesPerView: 1,
		  spaceBetween: 0,
		  autoplay: false,
		  navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		  },
		  pagination: {
			el: ".swiper-pagination",
			type: 'fraction',
		  },
		  loop: true,
		  zoom: {
			maxRatio: 5,
		  },
		});
	  
    swiper.slideTo(obj2 + 1, 0);
    //zoom
    $zooms = obj3;
    $(".swiper-slide").dblclick(function () {
      if ($(".swiper-slide.swiper-slide-active.swiper-slide-zoomed").length < 1) {
        $zooms = 0;
        swiper.allowTouchMove = true;
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;
        $(".eicon-zoom-in-bold, .eicon-zoom-out-bold, .swiper-button-next, .swiper-button-prev").toggle();
      } else {
        $zooms = -1;
        swiper.allowTouchMove = false;
        swiper.allowSlideNext = false;
        swiper.allowSlidePrev = false;
        $(".eicon-zoom-in-bold, .eicon-zoom-out-bold, .swiper-button-next, .swiper-button-prev").toggle();
      }
    });
    $("#zoom").click(function () {
      $zooms++;
      if ($zooms == 1) {
        swiper.zoom.in(5);
        swiper.allowTouchMove = false;
        swiper.allowSlideNext = false;
        swiper.allowSlidePrev = false;
      } else {
        swiper.zoom.out();
        swiper.allowTouchMove = true;
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;
        $zooms = 0;
      }
      $(".eicon-zoom-in-bold, .eicon-zoom-out-bold, .swiper-button-next, .swiper-button-prev").toggle();
    });
    $(".swiper-slide img").each(function () {
      $(this).attr("title", "Double Click to Zoom in and out.");
      $caption = $(this).attr("alt");
      $(this).next("span.swiper-caption").html($caption);
    });
    $("#closes").click(function () {
      $("#gallery_region1").fadeOut();
      //		swiper.destroy(true, false);
    });
    document.addEventListener("fullscreenchange", function () {
      if ((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {

      } else {
        $("#closescrn").css("display", "none");
        $("#fullscrn, #closes, .madhus_pgmargin").css("display", "block");
      }
    });
    $("#fullscrn").click(function () {
      openFullscreen();
      $(this).toggle();
      $("#closescrn, #closes, .madhus_pgmargin").toggle();
    });
    $("#closescrn").click(function () {
      closeFullscreen();
      $(this).toggle();
      $("#fullscrn, #closes, .madhus_pgmargin").toggle();
    });
});
  }
  if ($("#gallery1").length > 0) {
    $("#gallery1 a.print_mall_gallery2").click(function () {
      $("#gallery_region1").fadeIn();
      $ob1 = "#gallery_region1_1 .swiper";
      $ob2 = $(this).index();
      $ob3 = 0;
      $.ajax({
        url: "ajax/gallery/gallery_1.txt",
        dataType: "html",
        success: function (data) {
          $("#gallery_region1_1").html(data);
          photoslide($ob1, $ob2, $ob3);
        }
      });
      return false;
    });
  }
});
