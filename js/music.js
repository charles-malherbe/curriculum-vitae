/*
    Theme Name: Basma Resume
    Description: Basma Resume / CV Template
    Version: 1.0
    Author: themearabia
    Website: http://themearabia.net 
*/

/*--------------------------------------
:: background music
--------------------------------------*/

$(document).ready(function() {
    "use strict";
    
    if ( $('#audio-player').length ) {
        
        var browser = {
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i)
            },
            Android: function() {
                return navigator.userAgent.match(/Android/i)
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i)
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i)
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i)
            },
            any: function() {
                return browser.Android() || browser.BlackBerry() || browser.iOS() || browser.Opera() || browser.Windows()
            }
        }
        
        var audioPlayer = document.getElementById("audio-player"),
            playPromise = document.querySelector('audio').play();
        
        if (playPromise !== undefined) {
            playPromise.then(function() {
                if( browser.any()) {
                    $("body").removeClass("audio-on");
                    audioPlayer.pause();
                }
                else {
                    $("body").addClass("audio-on");
                    audioPlayer.play();
                }
            }).catch(function(error) {
                
            });
        }

        $(".bg-music").on('click', function(event){
            event.preventDefault();
            if ( $('body').hasClass('audio-on') ) {
                audioPlayer.pause();
                $("body").removeClass("audio-on");
            }
            else {
                audioPlayer.play();
                $("body").addClass("audio-on");
            }
        });
        
    }
    
});