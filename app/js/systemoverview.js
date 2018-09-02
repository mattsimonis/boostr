var BfsSystemOverview = BfsSystemOverview || {};
BfsSystemOverview.LimitInfoMap = {
    ConcurrentAsyncGetReportInstances: { Title: "Concurrent Async Get Report Instances", Description: "Concurrent REST API requests for results of asynchronous report runs" },
    ConcurrentSyncReportRuns: { Title: "Concurrent Sync Report Runs", Description: "Concurrent synchronous report runs via REST API" },
    DailyAsyncApexExecutions: { Title: "Daily Async Apex Executions", Description: "Daily asynchronous Apex method executions (batch Apex, future methods, queueable Apex, and scheduled Apex)" },
    DailyBulkApiRequests: { Title: "Daily Bulk API Requests" },
    DailyDurableGenericStreamingApiEvents: { Title: "Daily Durable Generic Streaming Api Events" },
    DailyDurableStreamingApiEvents: { Title: "Daily Durable Streaming Api Events" },
    DailyGenericStreamingApiEvents: { Title: "Daily Generic Streaming Api Events", Description: "Daily generic streaming events (if generic streaming is enabled for your org)" },
    DailyStreamingApiEvents: { Title: "Daily Streaming Api Events" },
    DailyWorkflowEmails: { Title: "Daily Workflow Emails" },
    DurableStreamingApiConcurrentClients: { Title: "Durable Streaming Api Concurrent Clients" },
    HourlyAsyncReportRuns: { Title: "Hourly Async Report Runs", Description: "Hourly asynchronous report runs via REST API" },
    HourlyDashboardRefreshes: { Title: "Hourly Dashboard Refreshes", Description: "Hourly dashboard refreshes via REST API" },
    HourlyDashboardResults: { Title: "Hourly Dashboard Results", Description: "Hourly REST API requests for dashboard results" },
    HourlyDashboardStatuses: { Title: "Hourly Dashboard Statuses", Description: "Hourly dashboard status requests via REST API" },
    HourlyODataCallout: { Title: "Hourly OData Callout" },
    HourlySyncReportRuns: { Title: "Hourly Sync Report Runs", Description: "Hourly synchronous report runs via REST API" },
    HourlyTimeBasedWorkflow: { Title: "Hourly Time Based Workflow" },
    MassEmail: { Title: "Mass Email", Description: "Daily number of mass emails that are sent to external email addresses by using Apex or Force.com APIs" },
    SingleEmail: { Title: "Single Email", Description: "Daily number of single emails that are sent to external email addresses by using Apex or Force.com APIs" },
    StreamingApiConcurrentClients: { Title: "Streaming Api Concurrent Clients" }
};

BfsSystemOverview.init = function () {
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
    if (textStatus == "success") {
        BfsSystemOverview.showOrgLimitsUI(data);
    } else {
        console.log(jqXHR)
    }
}

BfsSystemOverview.showOrgLimitsUI = function (orgLimits) {
    var orgLimitsUI = '<div class="panel-container"><span><div class="panel">';
    orgLimitsUI += '<div class="top-line"><h2>Other Org Limits </h2><img src="https://github.com/mattsimonis/boostr/blob/master/app/icon.png?raw=true" style="height:32px; width:32px; padding-left: 20px;" title="Provided by Boostr for Salesforce" /></div><div class="content"><div class="panelContent">';

    var alreadyShownLimits = ['DailyApiRequests', 'DataStorageMB', 'FileStorageMB'];
    var numberFormatter = new Intl.NumberFormat();

    Object.keys(orgLimits).forEach(function(limitName, index) {
        if (alreadyShownLimits.indexOf(limitName) != -1) {
            return;
        }

        var limitInfo = BfsSystemOverview.LimitInfoMap[limitName];

        if (limitInfo == null) {
            return;
        }

        var limitRemaining = orgLimits[limitName].Remaining;
        var limitMax = orgLimits[limitName].Max;
        var limitUsed = limitMax - limitRemaining;
        var percentageUsed = Math.round((limitUsed / limitMax) * 100);
        var percentageAvailable = 100 - percentageUsed;


        var borderTopClass = 'border-top';
        var panelWarningClass = '';
        var barPositiveWarnClass = '';

        if (index == 0) {
            borderTopClass = '';
        }

        if (percentageUsed >= 80) {
            panelWarningClass = 'usage-warn';
            barPositiveWarnClass = 'bar-positive-warn';
        }

        orgLimitsUI += '<div class="panel-content-item ' + borderTopClass + ' ' + panelWarningClass + '">';

        orgLimitsUI += '<div class="panelLeft">';

        orgLimitsUI += '<div class="type"><span class="title">' + limitInfo.Title +
                       '</span>';

        if (limitInfo.Description) {
            orgLimitsUI += '<div class="mouseOverInfoOuter" onfocus="addMouseOver(this)" onmouseover="addMouseOver(this)" tabindex="0">'
                              + '<img src="/img/s.gif" alt class="infoIcon" title>'
                              + '<div class="mouseOverInfo" style="display:none; opacity: -0.2; left: 21px;">'
                                  + '<div class="body">' + limitInfo.Description + '</div>'
                              + '</div>'
                        + '</div>';
        }

        orgLimitsUI += '</div>';

        orgLimitsUI += '<div class="datalink"><div class="num">' + numberFormatter.format(limitUsed) + '</div></div>';

        orgLimitsUI += '<div class="floatClear" /></div>';

        orgLimitsUI += '<div class="panelRight">';

        orgLimitsUI += '<div class="visual"><span><div class="bar-container"><div class="bar">' +
                         '<div class="bar-positive ' + barPositiveWarnClass + '" style="width:' + percentageUsed + 'px;"></div>' +
                         '<div class="bar-negative" style="width:' + percentageAvailable + 'px;"></div>'
            + '</div></div>  </span></div>';

        orgLimitsUI += '<span><div align="right" class="desc"> <span class="desc-num">' + percentageUsed + '%</span>(maximum ' + numberFormatter.format(limitMax) + ')<br /></div></span>';

        orgLimitsUI += '</div><div class="floatClear" />';

        orgLimitsUI += '</div>';

        console.log(limitName);
    });



    orgLimitsUI += '</div></div></div></span></div>';

    $('#panel-board').append(orgLimitsUI);
}

BfsSystemOverview.init();