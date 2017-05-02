var BfsFlowErrorLink = BfsFlowErrorLink || {};

BfsFlowErrorLink.init = function() {
  var genericFlowErrorTD = $('td:contains("A flow trigger failed to execute the flow with version ID")').filter(':last');
  genericFlowErrorTD.each(function( index, element ) {
    var versionIdRegEx = /(301\w{12})/g;
    var elementJQ = $( element );
    var elementText = elementJQ.text();
    var matches = versionIdRegEx.exec(elementText);
    var versionId = matches[0];
	 
    var offenderLink = '<a href="/designer/designer.apexp#Id=' + versionId + '">View Offending Process Builder or Flow</a>';
    elementJQ.append(offenderLink);
  });
}

BfsFlowErrorLink.init();