var BfsSelectFailedTests = BfsSelectFailedTests || {};

BfsSelectFailedTests.init = function() {
  const selectTestsButtonEl = document.getElementById("SelectTestsButton");

  let selectFailedButtonEl = document.createElement("input");
  selectFailedButtonEl.type = "button";
  selectFailedButtonEl.className = "btn";
  selectFailedButtonEl.value = "Select Failed Tests...";
  selectFailedButtonEl.style = "margin-left: 8px;";

  selectFailedButtonEl.onclick = function() {
    selectTestsButtonEl.click();
    BfsSelectFailedTests.waitForElement("#testListGrid", function() {
      BfsSelectFailedTests.checkFailedTests();
    });
  };

  selectTestsButtonEl.parentNode.insertBefore(
    selectFailedButtonEl,
    selectTestsButtonEl.nextSibling
  );
};

BfsSelectFailedTests.waitForElement = function(elementPath, callBack) {
  window.setTimeout(function() {
    if ($(elementPath).length) {
      callBack(elementPath, $(elementPath));
    } else {
      BfsSelectFailedTests.waitForElement(elementPath, callBack);
    }
  }, 250);
};

BfsSelectFailedTests.checkFailedTests = function() {
  for (
    var a = document
        .querySelector(".x-grid-group")
        .querySelectorAll("img.Failed"),
      b = {},
      c = 0;
    c < a.length;
    c++
  ) {
    for (var d = a[c]; "TR" !== d.nodeName; ) d = d.parentNode;
    b[d.querySelector("a").nextSibling.textContent.trim()] = !0;
  }
  for (
    var f = document.querySelectorAll(
        "#testOverlay .x-grid3-row:not(.x-grid3-row-selected)"
      ),
      c = 0;
    c < f.length;
    c++
  ) {
    var g = f[c].querySelectorAll("td");
    b.hasOwnProperty(g[1].textContent) &&
      ((e = new MouseEvent("mousedown", { bubbles: !0 })),
      g[0].querySelector(".x-grid3-row-checker").dispatchEvent(e));
  }
};

BfsSelectFailedTests.init();
