// Print Mall JavaScript Document
$(function () {
  $("main").addClass("show");
  //anim AOS
  if ($("[data-aos]").length > 0) {
    AOS.init({
      duration: 1200,
      once: true
    });
  }
  //Swiper
  if ($(".swiper").length > 0) {
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
          $mtwdft = $mtwd/12;
          break;
        case "Wft":
          $mtwdft = $mtwd;
      }
      $mtht = $("#material_height").val();
      $mthtsz = $("#height_size_in option:selected").attr("data-size");
      switch ($mthtsz) {
        case "Hin":
          $mthtft = $mtht/12;
          break;
        case "Hft":
          $mthtft = $mtht;
      }
      //inches
      $sizewdfeet = $mtwdft * $mthtft; 
      $resultft = Math.round($sizewdfeet * $unitprice);
        
        if($resultft > 300){
            $("#total").attr("value", $resultft + " INR").css("background-color", "#ffffff");
        }
        else{
            $("#total").attr("value", $resultft + " INR (read note)").css("background-color", "#dd6969");
        }
      event.preventDefault();
    });
      $("#pricecalculus").on("reset", function () {
          $("#total").attr("value", 0);
          $("#total").css("background-color", "#ffffff");
      });
  }
});
