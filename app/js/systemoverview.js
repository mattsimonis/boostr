var BfsSystemOverview = BfsSystemOverview || {};

BfsSystemOverview.init = function () {
    debugger;


    var sessionId = BfsSystemOverview.getSessionId();
    BfsSystemOverview.getOrgLimits(sessionId);
}

BfsSystemOverview.getSessionId = function () {
    return document.cookie.match("sid=([^;]*)")[1];
}

BfsSystemOverview.getOrgLimits = function (sessionId) {
    $.ajax({
        url: '/services/data/v40.0/limits/',
        headers: { 'Authorization': 'Bearer ' + sessionId }
    })
    .always(BfsSystemOverview.processOrgLimitsResponse);
}

BfsSystemOverview.processOrgLimitsResponse = function (data, textStatus, jqXHR) {
    debugger;

    if (textStatus == "success") {
        BfsSystemOverview.showOrgLimitsUI(data);
    } else {
        console.log(jqXHR)
    }
}

BfsSystemOverview.showOrgLimitsUI = function (orgLimits) {
    var orgLimitsUI = '<div class="panel-container"';


    orgLimitUI += '</div>';
}

BfsSystemOverview.init();

/*
<div class="panel-container">
    <span id="j_id0:j_id12:4:j_id16">
        <div class="panel">
            <div class="top-line">
                    <h2>Most Used Licenses</h2><a href="/00D0j0000000T0f#00D0j0000000T0f_RelatedUserLicenseList_target" title="Show All" class="headerLink">Show All</a>
            </div>
            <div class="content">
                <div class="panelContent">
                        <div class="panel-content-item usage-warn  ">
                            <div class="panelLeft">
                                <div class="type">
                                    <span class="title">Salesforce</span>
                                </div>
                                <div class="datalink">
                                    
                                    <div class="num" id="usage_block_users_num_1"><a href="/00D0j0000000T0f#00D0j0000000T0f_RelatedUserLicenseList_target" title="Salesforce">883</a>
                                        <span class="valueSubscript"></span>
                                    </div>
                                </div>
                                <div class="floatClear"></div>
                            </div>
                            <div class="panelRight">
                                <div class="visual"><span id="j_id0:j_id12:4:j_id16:j_id17:j_id24:0:j_id41">
                                        <div class="bar-container">
                                                <div class="bar">
                                                    <div class="bar-positive bar-positive-warn" style="width:98px;"></div>
                                                    <div class="bar-negative" style="width:2px;"></div>
                                                </div>
                                            <div class="warning-icon"><img src="/img/msg_icons/warning16.png" alt="Warning" width="16" height="16" class="warningSmall" id="j_id0:j_id12:4:j_id16:j_id17:j_id24:0:j_id43" title="Warning"></div>
                                        </div></span>

                                </div><span id="j_id0:j_id12:4:j_id16:j_id17:j_id24:0:j_id46">
                                    
                                    <div align="right" class="error" id="usage_block_users_error_1"><span class="warning-num">98%</span> (883 of 899)<br>Visit <a href="/ui/setup/store/AppStoreSummaryPage?setupid=AppStoreSummary">Checkout</a> to obtain additional Salesforce user licenses.
                                    </div></span>
                            </div>
                            <div class="floatClear"></div>
                        </div>
                        <div class="panel-content-item  border-top ">
                            <div class="panelLeft">
                                <div class="type">
                                    <span class="title">Chatter Free</span>
                                </div>
                                <div class="datalink">
                                    
                                    <div class="num" id="usage_block_users_num_2"><a href="/00D0j0000000T0f#00D0j0000000T0f_RelatedUserLicenseList_target" title="Chatter Free">0</a>
                                        <span class="valueSubscript"></span>
                                    </div>
                                </div>
                                <div class="floatClear"></div>
                            </div>
                            <div class="panelRight">
                                <div class="visual"><span id="j_id0:j_id12:4:j_id16:j_id17:j_id24:1:j_id41">
                                        <div class="bar-container">
                                                <div class="bar">
                                                    <div class="bar-positive " style="width:0px;"></div>
                                                    <div class="bar-negative" style="width:100px;"></div>
                                                </div>
                                            <div class="warning-icon"></div>
                                        </div></span>

                                </div><span id="j_id0:j_id12:4:j_id16:j_id17:j_id24:1:j_id52">
                                    <div align="right" class="desc">
                                            <span class="desc-num">0%</span>(maximum 5,000)
                                        <br>
                                    </div></span>
                            </div>
                            <div class="floatClear"></div>
                        </div>
                        <div class="panel-content-item  border-top ">
                            <div class="panelLeft">
                                <div class="type">
                                    <span class="title">Chatter External</span>
                                </div>
                                <div class="datalink">
                                    
                                    <div class="num" id="usage_block_users_num_3"><a href="/00D0j0000000T0f#00D0j0000000T0f_RelatedUserLicenseList_target" title="Chatter External">0</a>
                                        <span class="valueSubscript"></span>
                                    </div>
                                </div>
                                <div class="floatClear"></div>
                            </div>
                            <div class="panelRight">
                                <div class="visual"><span id="j_id0:j_id12:4:j_id16:j_id17:j_id24:2:j_id41">
                                        <div class="bar-container">
                                                <div class="bar">
                                                    <div class="bar-positive " style="width:0px;"></div>
                                                    <div class="bar-negative" style="width:100px;"></div>
                                                </div>
                                            <div class="warning-icon"></div>
                                        </div></span>

                                </div><span id="j_id0:j_id12:4:j_id16:j_id17:j_id24:2:j_id52">
                                    <div align="right" class="desc">
                                            <span class="desc-num">0%</span>(maximum 500)
                                        <br>
                                    </div></span>
                            </div>
                            <div class="floatClear"></div>
                        </div>
                </div><span id="j_id0:j_id12:4:j_id16:j_id17:j_id60" style="display: none;"></span>
                <div class="floatClear"></div>
            </div>
        </div></span>
                </div>
*/