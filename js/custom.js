/*
    Theme Name: Basma Resume / CV Template + RTL (HTML)
    Description: Basma Resume / portfolio template that's suitable for freelanner and anyone want to create online portflolio
    Template URI: https://themes.themearabia.net/html/basma-resume-html
    Version: 3.0
    Author: themearabia
    Website: http://themearabia.net 
*/

/*--------------------------------------
[  Table of contents  ]
----------------------------------------
:: Variables
:: Preloader
:: Tooltip
:: Site Nav popover
:: open hash section in load
:: main menu
:: menu toggle phone
:: typed
:: porfolio isotope and filter
:: owl Carousel testimonial
:: owl Carousel - client
:: google maps
:: progress bar
:: counter fun facts
:: Accordion & Toggle
:: appointments
:: particles
:: go up
----------------------------------------
[ End table content ]
--------------------------------------*/

(function ($) {
    "use strict";
    
    /*--------------------------------------
    :: Variables
    --------------------------------------*/
    var animated_direction = 'fadeInLeft';
    
    /*--------------------------------------
    :: Preloader
    --------------------------------------*/
    $(window).on("load", function () {
        $(".loader-overlay").fadeOut("slow", function () {
            //$(this).remove();
        });
    });

    /*--------------------------------------
    :: tooltip
    --------------------------------------*/
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    /*--------------------------------------
    :: Site Nav popover
    --------------------------------------*/
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl, {
            customClass: "site-nav-popover",
        });
    });

    /*--------------------------------------
    :: open hash section
    --------------------------------------*/
    if (location.hash) {
        var pageid = location.hash;
        $("#header-main-menu li a").removeClass("active");
        $('a[data-has="' + pageid + '"]').addClass("active");
        $(".section-page").removeClass(animated_direction).removeClass("active");
        $(pageid).addClass(animated_direction).addClass("active");
        /* paly and pause video */
        if (pageid == "#home" && $("#bgndVideo").length) {
            $("#bgndVideo").mb_YTPlayer().YTPPlay();
        } else if ($("#bgndVideo").length) {
            $("#bgndVideo").mb_YTPlayer().YTPPause();
        }

        if (pageid == "#projects") {
            $(".filter-click").click();
        } else if (pageid == "#portfolio") {
            $(".filter-click").click();
        }

        $("html,body").animate(
            {
                scrollTop: 0,
            },
            10
        );
    }
    else {
        if ($("#bgndVideo").length) {
            $("#bgndVideo").mb_YTPlayer().YTPPlay();
        }
    }

    /*--------------------------------------
    :: main menu
    --------------------------------------*/
    $("#header-main-menu li a, .section-home .buttons a").on("click", function () {
        var url = $(this).attr("href");
        var pageid = url.substring(url.indexOf("#"));
        $("#header-main-menu li a").removeClass("active");
        $('#header-main-menu li a[data-has="'+pageid+'"').addClass("active");
        $(".section-page").removeClass(animated_direction).removeClass("active");
        $(pageid).addClass(animated_direction).addClass("active");

        /* paly and pause video */
        if (pageid == "#home" && $("#bgndVideo").length) {
            $("#bgndVideo").mb_YTPlayer().YTPPlay();
        } else if ($("#bgndVideo").length) {
            $("#bgndVideo").mb_YTPlayer().YTPPause();
        }

        if (pageid == "#projects") {
            $(".filter-click").click();
        } else if (pageid == "#portfolio") {
            $(".filter-click").click();
        }

        $("html,body").animate(
            {
                scrollTop: 0,
            },
            10
        );
    });

    /*--------------------------------------
    :: menu toggle phone
    --------------------------------------*/
    $(".menu-toggle").on("click", function () {
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
            $(".header").addClass("open");
        } else {
            $(this).removeClass("active");
            $(".header").removeClass("open");
        }
        return false;
    });
    /* close menu */
    $(".header li a").on("click", function () {
        $(".menu-toggle").removeClass("active");
        $(".header").removeClass("open");
    });

    /*--------------------------------------
    :: typed
    --------------------------------------*/
    if($(".typed").length){
        $(".typed").typed({
            stringsElement: $(".typed-strings"),
            typeSpeed: 30,
            backDelay: 750,
            loop: true,
            autoplay: true,
            autoplayTimeout: 750,
            contentType: "html",
            loopCount: true,
            resetCallback: function () {
                newTyped();
            },
        });
    }
    
    /*--------------------------------------
    :: porfolio isotope and filter
    --------------------------------------*/
    if($(".portfolio-container").length){
        $(window).on("load", function () {
            var portfolioIsotope = $(".portfolio-container").isotope({
                itemSelector: ".portfolio-item",
            });
            $("#portfolio-flters li").on("click", function () {
                $("#portfolio-flters li").removeClass("filter-active");
                $(this).addClass("filter-active");
    
                portfolioIsotope.isotope({
                    filter: $(this).data("filter"),
                });
            });
        });
    }

    /*--------------------------------------
    :: owl Carousel - testimonial
    --------------------------------------*/
    if($(".owl-testimonial").length){
        var responsive = $(".owl-testimonial").data("responsive");
        var direction = $(".owl-testimonial").data("direction");
        $(".owl-testimonial").owlCarousel({
            rtl: direction == "rtl" ? true : false,
            autoplay: true,
            loop: true,
            margin: 20,
            dots: true,
            nav: false,
            responsiveClass: true,
            responsive: responsive,
        });
    }

    /*--------------------------------------
    :: owl Carousel - client
    --------------------------------------*/
    if($(".owl-client").length){
        var responsive = $(".owl-client").data("responsive");
        var direction = $(".owl-client").data("direction");
        $(".owl-client").owlCarousel({
            rtl: direction == "rtl" ? true : false,
            autoplay: true,
            loop: true,
            margin: 20,
            dots: true,
            nav: false,
            responsiveClass: true,
            responsive: responsive,
        });
    }

    /*--------------------------------------
    :: google maps
    --------------------------------------*/
    if ($("#google-map").length) {
        //set your google maps parameters
        var latitude = $("#google-map").data("latitude"),
            longitude = $("#google-map").data("longitude"),
            map_zoom = $("#google-map").data("zoom"),
            marker_url = $("#google-map").data("marker");
        //set google map options
        var map_options = {
            center: new google.maps.LatLng(latitude, longitude),
            zoom: map_zoom,
            panControl: true,
            zoomControl: true,
            mapTypeControl: true,
            streetViewControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
        };
        //inizialize the map
        var map = new google.maps.Map(document.getElementById("google-map"), map_options);
        //add a custom marker to the map
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map,
            visible: true,
            icon: marker_url,
        });
    }

    /*--------------------------------------
    :: progress bar
    --------------------------------------*/
    $(window).on("scroll", function () {
        $(".skill-animate .progres").each(function () {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height() + 25;
            $(this).css({
                width: "0%",
            });
            if (bottom_of_window > bottom_of_object) {
                $(this).css({
                    width: $(this).attr("data-value"),
                });
            }
        });
    });

    /*--------------------------------------
    :: counter fun facts
    --------------------------------------*/
    $(window).on("scroll", function () {
        $(".counter-value").each(function () {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight(),
                bottom_of_window = $(window).scrollTop() + $(window).height(),
                $this = $(this),
                countTo = $this.attr("data-count");
            if (bottom_of_window > bottom_of_object) {
                $({
                    countNum: $this.text(),
                }).animate(
                    {
                        countNum: countTo,
                    },
                    {
                        duration: 8000,
                        easing: "linear",
                        step: function () {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $this.text(this.countNum);
                        },
                    }
                );
            }
        });
    });

    /*--------------------------------------
    :: Accordion & Toggle
    --------------------------------------*/
    $(".accordion-title .btn-title").each(function () {
        $(this).on("click", function () {
            if ($(this).parents(".accordion").hasClass("toggle-accordion")) {
                $(this).parent().find("li:first .accordion-title").addClass("active");
                $(this).parent().find("li:first .accordion-title").next(".accordion-inner").addClass("active");
                $(this).parent().toggleClass("active");
                $(this).parent().next(".accordion-inner").slideToggle().toggleClass("active");
                $(this).find("i").toggleClass("pe-7s-angle-down").toggleClass("pe-7s-angle-up");
            } else {
                if ($(this).next().is(":hidden")) {
                    $(this).parent().parent().find(".accordion-title").removeClass("active").next().slideUp(200);
                    $(this).parent().parent().find(".accordion-title").next().removeClass("active").slideUp(200);
                    $(this).parent().toggleClass("active").next().slideDown(200);
                    $(this).parent().next(".accordion-inner").toggleClass("active");
                    $(this).parent().parent().find("i").removeClass("pe-7s-angle-up").addClass("pe-7s-angle-down");
                    $(this).find("i").removeClass("pe-7s-angle-down").addClass("pe-7s-angle-up");
                }
            }
            return false;
        });
    });
    
    /*--------------------------------------
    :: particles
    --------------------------------------*/
    if ($("#particles-js").length) {
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800,
                    },
                },
                color: {
                    value: "#ffffff",
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000",
                    },
                    polygon: {
                        nb_sides: 5,
                    },
                    image: {
                        src: "img/github.svg",
                        width: 100,
                        height: 100,
                    },
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false,
                    },
                },
                size: {
                    value: 5,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false,
                    },
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200,
                    },
                },
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse",
                    },
                    onclick: {
                        enable: true,
                        mode: "push",
                    },
                    resize: true,
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1,
                        },
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3,
                    },
                    repulse: {
                        distance: 200,
                    },
                    push: {
                        particles_nb: 4,
                    },
                    remove: {
                        particles_nb: 2,
                    },
                },
            },
            retina_detect: true,
            config_demo: {
                hide_card: false,
                background_color: "#b61924",
                background_image: "",
                background_position: "50% 50%",
                background_repeat: "no-repeat",
                background_size: "cover",
            },
        });
    }

    /*--------------------------------------
    :: go up
    --------------------------------------*/
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 100) {
            $(".sidebar-left .go-up").css("right", "10px");
            $(".sidebar-right .go-up").css("left", "10px");
        } else {
            $(".sidebar-left .go-up").css("right", "-60px");
            $(".sidebar-right .go-up").css("left", "-60px");
        }
    });

    $(".go-up").on('click', function() {
        $("html,body").animate({
            scrollTop: 0
        }, 500);
        return false;
    });

})(jQuery);