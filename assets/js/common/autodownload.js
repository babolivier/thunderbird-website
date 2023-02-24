/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function($) {
    'use strict';

    // Only do this on the autodownload page.
    if ($('body').attr('id') == 'thunderbird-download') {
        var isIELT9 = window.Mozilla.Client.platform === 'windows' && /MSIE\s[1-8]\./.test(navigator.userAgent);
        var downloadURL;
        var downloadChannelRegex = /download_channel=(esr|beta|daily)/;
        var downloadChannel = downloadChannelRegex.exec(window.location.search);
        var downloadElement = null;
        var $platformLink = null;

        // If it's not in the url, default it to esr
        if (downloadChannel === null) {
            downloadChannel = 'esr';
        } else {
            downloadChannel = downloadChannel[1];
        }

        // Each element as an id equal to their channel so: #esr, #beta, #daily.
        downloadElement = document.getElementById(downloadChannel);
        // Remove our display:hidden class
        downloadElement.className = '';

        // Get the platform link via the active downloadChannel
        $platformLink = $(`#${downloadChannel} li:visible .download-link`);

        // Only auto-start the download if a visible platform link is detected.
        if ($platformLink.length) {
            downloadURL = $platformLink.attr('href');

            window._paq = window._paq || [];
            // Track auto downloads - trackLink( url, linkType )
            window._paq.push(['trackLink', downloadURL, 'download'])

            // If user is not on an IE that blocks JS triggered downloads, start the
            // platform-detected download a second after DOM ready event. We don't rely on
            // the window load event as we have third-party tracking pixels.
            if (!isIELT9) {
                $(function() {
                    setTimeout(function() {
                        window.location.href = downloadURL;
                    }, 1000);
                });
            }
        }
    }
})(window.jQuery);
