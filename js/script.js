$(document).ready(function() {
    // Mobile Menu Toggle
    $('.hamburger').click(function() {
        $('.nav-links').toggleClass('active');
        $(this).find('i').toggleClass('fa-bars fa-times');
    });

    // Close mobile menu when a link is clicked
    $('.nav-links a').click(function() {
        $('.nav-links').removeClass('active');
        $('.hamburger i').removeClass('fa-times').addClass('fa-bars');
    });

    // Smooth Scrolling for Anchor Links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70 // Adjust for fixed header
            }, 800);
        }
    });

    // Active Link Highlighting on Scroll
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();

        $('section').each(function(i) {
            if ($(this).position().top <= scrollDistance + 100) {
                $('.nav-links a.active').removeClass('active');
                $('.nav-links a').eq(i).addClass('active');
            }
        });
    });

    // Form Submission (Mock)
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        const btn = $(this).find('button');
        const originalText = btn.text();
        
        btn.text('Sending...').prop('disabled', true);
        
        setTimeout(function() {
            alert('Thank you! Your message has been sent.');
            $('#contactForm')[0].reset();
            btn.text(originalText).prop('disabled', false);
        }, 1500);
    });

    // Scroll Reveal Animation
    function reveal() {
        var reveals = document.querySelectorAll(".glass-card, .section-title");

        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }

    window.addEventListener("scroll", reveal);
    
    // Trigger once on load
    reveal();

    // Resume actions: open viewer, print, download handled by anchor
    $('#openResume').click(function() {
        var viewer = $('#resumeViewer');
        if (viewer.is(':visible')) {
            viewer.slideUp(300);
        } else {
            // ensure iframe refreshes (helps when PDF replaced)
            var iframe = document.getElementById('resumePdf');
            if (iframe) {
                var src = iframe.getAttribute('src');
                iframe.setAttribute('src', src);
            }
            viewer.slideDown(300);
            // scroll to viewer
            $('html, body').animate({ scrollTop: $('#resumeViewer').offset().top - 80 }, 600);
        }
    });

    $('#printResume').click(function() {
        var pdfUrl = $('#resumePdf').attr('src') || 'assets/amaan_resume.pdf';
        // Open PDF in new tab and attempt to call print (may be blocked by browser)
        var w = window.open(pdfUrl, '_blank');
        if (w) {
            w.focus();
            // give time to load
            setTimeout(function() {
                try { w.print(); } catch (e) { console.warn('Print may be blocked'); }
            }, 800);
        } else {
            alert('Popup blocked. Please open the PDF directly to print.');
        }
    });

    // Copy email to clipboard
    $('#copyEmail').click(function() {
        var email = $('#bioEmail').text().trim();
        if (!navigator.clipboard) {
            // fallback
            var $temp = $('<input>');
            $('body').append($temp);
            $temp.val(email).select();
            document.execCommand('copy');
            $temp.remove();
            alert('Email copied to clipboard');
            return;
        }
        navigator.clipboard.writeText(email).then(function() {
            // simple feedback
            var btn = $('#copyEmail');
            var orig = btn.html();
            btn.html('<i class="fas fa-check"></i>');
            setTimeout(function() { btn.html(orig); }, 1200);
        });
    });
});
