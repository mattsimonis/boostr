var BfsFieldLevelSecurity = BfsFieldLevelSecurity || {};

BfsFieldLevelSecurity.init = function () {
    // Visible column on the profile edit page.
    var visibleHeaderJQ = $('.headerRow th.displayedCol');

    if (visibleHeaderJQ.size() > 0) {
        visibleHeaderJQ.html(visibleHeaderJQ.html() + ' <a id="boostrCheckAllVisible" href="javascript:void(0);">Check All</a> <a id="boostrUncheckAllVisible" href="javascript:void(0);">Uncheck All</a>');

        $('#boostrCheckAllVisible').click(function (e) {
            $('.dataRow .displayedCol input[type=checkbox]').prop('checked', true);
        });

        $('#boostrUncheckAllVisible').click(function (e) {
            $('.dataRow .displayedCol input[type=checkbox]').prop('checked', false);
        });
    }

    // Read-Only column on the profile edit page.
    var readOnlyHeaderJQ = $('.headerRow th.readonlyCol');

    if (readOnlyHeaderJQ.size() > 0) {
        readOnlyHeaderJQ.html(readOnlyHeaderJQ.html() + ' <a id="boostrCheckAllReadOnly" href="javascript:void(0);">Check All</a> <a id="boostrUncheckAllReadOnly" href="javascript:void(0);">Uncheck All</a>');

        $('#boostrCheckAllReadOnly').click(function (e) {
            $('.dataRow .readonlyCol input[type=checkbox]').prop('checked', true);
        });

        $('#boostrUncheckAllReadOnly').click(function (e) {
            $('.dataRow .readonlyCol input[type=checkbox]').prop('checked', false);
        });
    }

    // Read column on the permission set edit page.
    var readPermSetHeaderJQ = $('div[id*=fls_readheader]');

    if (readPermSetHeaderJQ.size() > 0) {
        readPermSetHeaderJQ.html(readPermSetHeaderJQ.html() + ' <a id="boostrCheckAllRead" href="javascript:void(0);">Check All</a> <a id="boostrUncheckAllRead" href="javascript:void(0);">Uncheck All</a>');

        $('#boostrCheckAllRead').click(function (e) {
            $('input[id*=fls_read_ck]:not([disabled=disabled])').prop('checked', true);
        });

        $('#boostrUncheckAllRead').click(function (e) {
            $('input[id*=fls_read_ck]:not([disabled=disabled])').prop('checked', false);
        });
    }

    // Edit column on the permission set edit page.
    var editPermSetHeaderJQ = $('div[id*=fls_editheader]');

    if (editPermSetHeaderJQ.size() > 0) {
        editPermSetHeaderJQ.html(editPermSetHeaderJQ.html() + ' <a id="boostrCheckAllEdit" href="javascript:void(0);">Check All</a> <a id="boostrUncheckAllEdit" href="javascript:void(0);">Uncheck All</a>');

        $('#boostrCheckAllEdit').click(function (e) {
            $('input[id*=fls_edit_ck]:not([disabled=disabled])').prop('checked', true);
        });

        $('#boostrUncheckAllEdit').click(function (e) {
            $('input[id*=fls_edit_ck]:not([disabled=disabled])').prop('checked', false);
        });
    }
}

chrome.storage.sync.get({
    'fieldlevelsecurity': true
}, function (item) {
    if (item.fieldlevelsecurity === true) {
        BfsFieldLevelSecurity.init();
    }
});