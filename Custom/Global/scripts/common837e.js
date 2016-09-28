/*
* Outside the document ready for speed
* this script is loaded just before </form> so most of the dom is there
*/


// closes active modal
function closeModalSelf(doParentRefresh) {
    // ensure we are in a modal
    if (parent.$) {
        parent.$('#facebox .close').click(); // we are using facebox
        if (doParentRefresh === true) {
            parent.window.location.reload(true);
        }
    }
}

function callPageMethod(methodUrl, onSuccess) {
    var args = '';
    var l = arguments.length;
    if (l > 2) {
        for (var i = 2; i < l - 1; i += 2) {
            if (args.length != 0) args += ',';
            args += '"' + arguments[i] + '":"' + arguments[i + 1] + '"';
        }
    }
    $.ajax({
        type: "POST",
        url: methodUrl,
        data: "{" + args + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: onSuccess,
        fail: callPageMethodFail
    });
}

/*
global error handler for callPageMethod fail
*/
function callPageMethodFail(response) {
    alert("An error occurred calling a page method: " + response.d);
}

(function ($) {
    $.fn.equalize = function (attr) {
        var maxValue = 0;
        this.each(function () {
            var value = _value(this, attr);
            if (value > maxValue)
                maxValue = value;
        });

        this.each(function () {
            _setValue(this, attr, maxValue);
        });

        return this;

        function _value(ob, attr) {
            if (attr == "height")
                return $(ob).height();
            else if (attr == "width")
                return $(ob).width();
        };

        function _setValue(ob, attr, value) {
            if (attr == "height")
                $(ob).height(value);
            else if (attr == "width")
                $(ob).width(value);
        };
    };
})(jQuery);

var ECL = ECL || {};

ECL.hideEmptySubNav = function () {
    var $sideNavEl = $("#sideNav");
    var $mainContent = $("#content");
    var $sideNavContents = $sideNavEl.find("nav");

    if ($sideNavContents.find("ul").length == 0) {
        $sideNavEl.remove();
    } else {
        $mainContent.addClass("narrow");
    }
}

ECL.equalizeVCards = function () {
    $(".branches").find(".vcard").equalize("height");
}

ECL.toggleFormLabel = function () {

    var $el = $(".searchBox");

    if ($el.find("input[type=text]").val() != "") {
        $el.find("label").hide();
    }

    $el.focusin(function () {
        $el.find("label").hide();
        //$el.find("input[type=text]").focus();
    });

    $el.focusout(function () {
        if ($el.find("input[type=text]").val() == "") {
            $el.find("label").show();
        }
    });

    var $loginForm = $(".loginForm");
    var $usernameBox = $loginForm.find(".usernameBox");
    var $usernameLabel = $loginForm.find(".usernameLabel");
    var $passwordBox = $loginForm.find(".passwordBox");
    var $passwordLabel = $loginForm.find(".passwordLabel");

    if ($usernameBox.val() != "") {
        $usernameLabel.hide();
    }

    $usernameBox.focusin(function () {
        $usernameLabel.hide();
        $usernameBox.focus();
    });

    $usernameBox.focusout(function () {
        if ($usernameBox.val() == "") {
            $usernameLabel.show();
        }
    });

    if ($passwordBox.val() != "") {
        $passwordLabel.hide();
    }

    $passwordBox.focusin(function () {
        $passwordLabel.hide();
        $passwordBox.focus();
    });

    $passwordBox.focusout(function () {
        if ($passwordBox.val() == "") {
            $passwordLabel.show();
        }
    });
}

$(document).ready(function () {

    ECL.toggleFormLabel();
    ECL.hideEmptySubNav();
    ECL.equalizeVCards();

    // implement facebox on all links using iframe approach
    $('a[rel*=facebox]').click(function (e) {
        e.preventDefault();
        $.facebox({ 'iframe': $(this).attr('href') });
    });

    // allow usage of class for new window functionality on menu items
    $("li.newwindowlink a").click(function (e) {
        e.preventDefault();
        window.open($(this).attr('href'));
    });

    // ensure that the home link is treated as current page if we're on the home page
    if (location.pathname == 'index.html') {
        var $homeNavLink = $('#navMain a[href="/"]');
        var $homeNavListItem = $homeNavLink.parent();
        $homeNavListItem.removeClass('CMSListMenuLI');
        $homeNavListItem.addClass('CMSListMenuHighlightedLI');
        $homeNavLink.addClass('CMSListMenuLinkHighlighted');
    }

    // apply son of suckerfish hover classes to main navs
    var li = $('#navMain li');
    li.mouseover(function () {
        $(this).addClass('sfhover');
    });
    li.mouseout(function () {
        $(this).removeClass('sfhover');
    });

});
