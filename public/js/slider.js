$(document).ready(function() {
    $('.card').click(function() {
        const newImgSrc = $(this).data('img-src');
        console.log(newImgSrc);
        $('#main-image').attr('src', newImgSrc);
    });
    var $cardsContainer = $('#cardsContainer .cards');
    var $cards = $cardsContainer.children('.slide-card');
    var $buttons = $('.cardButton');
    var currentIndex = 0;
    var totalCards = $cards.length;
    var interval;

    for (var i = 0; i < 4; i++) {
        var $cardClone = $cards.eq(i).clone().addClass('cloned');
        $cardsContainer.append($cardClone);
    }

    function updateButtons() {
        $buttons.removeClass('active');
        $buttons.eq(currentIndex % totalCards).addClass('active');
    }

    function scrollCards() {
        currentIndex++;
        var targetPosition = currentIndex * -25;

        $cardsContainer.css('transition', 'transform 0.5s ease');
        $cardsContainer.css('transform', 'translateX(' + targetPosition + '%)');

        if (currentIndex >= totalCards) {
            setTimeout(function() {
                $cardsContainer.css('transition', 'none');
                $cardsContainer.css('transform', 'translateX(0)');
                currentIndex = 0;
            }, 1000); 
        }
        updateButtons();
    }

    function startInterval() {
        interval = setInterval(scrollCards, 1500);
    }

    function stopInterval() {
        clearInterval(interval);
    }

    $buttons.click(function() {
        stopInterval();
        currentIndex = $(this).index();
        var targetPosition = currentIndex * -25;
        $cardsContainer.css('transition', 'transform 0.5s ease');
        $cardsContainer.css('transform', 'translateX(' + targetPosition + '%)');
        updateButtons();
        startInterval();
    });

    $('.slide-card').hover(stopInterval, startInterval);

    // function adjustBackSize() {
    //     $('.slide-card').each(function() {
    //         var $front = $(this).find('.flip-card-front');
    //         var $back = $(this).find('.flip-card-back');
    //         console.log($front.css('height'))
    //         $back.css({
    //             'max-width': $front.outerWidth(),
    //             'max-height': $front.outerHeight()
    //         });
    //     });
    // }

    // $(window).resize(adjustBackSize);
    // adjustBackSize();
    function updateHeight() {
        var h = $("#flip-img").height();
        $('.slide-card').each(function() {
            $(this).height(h);
        })
        // $('.back-container').each(function() {
        //     $(this).height(h);
        // })
    }

    updateHeight();
    $(window).resize(function(){
        updateHeight();
    });

    startInterval();
});
// $(".slider").owlCarousel({
//     loop: true,
//     autoplay: true,
//     autoplayTimeout: 2000, //2000ms = 2s;
//     autoplayHoverPause: true,


  