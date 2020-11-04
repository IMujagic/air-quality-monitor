(function(window) {
    window.env = window.env || {};
  
    // Environment variables
    window["env"]["apiUrl"] = "${API_URL}";
    window["env"]["storageKey"] = "${STORAGE_KEY}";
  })(this);