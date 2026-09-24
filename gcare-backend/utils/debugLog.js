/* =====================================================
   DEBUG LOGGER

   Prints only outside production. Use this for
   anything that may contain applicant data,
   request bodies, uploaded file names, emails,
   or other personal information.
===================================================== */

function debugLog(...args) {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  console.log(...args);
}

module.exports = debugLog;
