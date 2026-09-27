// Renders a sample demo page from window.DEMO (defined in the demo folder's config.js).
// See README.md for the config format.
(function () {
  "use strict";

  function fill(template, fields) {
    return String(template).replace(/\{(\w+)\}/g, function (match, key) {
      if (!(key in fields)) throw new Error('Unknown placeholder "{' + key + '}" in "' + template + '"');
      return fields[key];
    });
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "html") node.innerHTML = attrs[k];
      else if (k === "text") node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { node.appendChild(c); });
    return node;
  }

  // A column with `repeat: "targets"` becomes one column per entry of `show`,
  // each carrying the fields {tgt, db}.
  function expandColumns(table) {
    var columns = [];
    table.columns.forEach(function (col) {
      if (!col.repeat) { columns.push({ label: col.label, file: col.file, fields: {} }); return; }
      if (col.repeat !== "targets") throw new Error('Unknown repeat "' + col.repeat + '"');
      table.show.forEach(function (tgt) {
        if (!(tgt in table.targets)) throw new Error("show lists target " + tgt + ", which is not in targets");
        var fields = { tgt: tgt, db: table.targets[tgt].toFixed(table.decimals || 0) };
        columns.push({ label: fill(col.label, fields), file: col.file, fields: fields });
      });
    });
    return columns;
  }

  function audioCell(src) {
    var audio = el("audio", { controls: "", preload: "none", src: src });
    var cell = el("td", {}, [audio]);
    function markMissing() {
      cell.className = "missing";
      cell.textContent = "missing: " + src;
    }
    audio.addEventListener("error", markMissing);
    // preload="none" never requests the file, so check it exists without downloading it.
    if (location.protocol.indexOf("http") === 0) {
      fetch(src, { method: "HEAD" }).then(function (r) { if (!r.ok) markMissing(); }, markMissing);
    }
    return cell;
  }

  function renderTable(table) {
    var columns = expandColumns(table);
    var head = el("tr", {}, [el("th", { text: "" })].concat(
      columns.map(function (c) { return el("th", { text: c.label }); })));
    var body = table.rows.map(function (row) {
      return el("tr", {}, [el("th", { scope: "row", text: fill(table.rowLabel, row) })].concat(
        columns.map(function (c) {
          return audioCell(table.audioDir + fill(c.file, Object.assign({}, row, c.fields)));
        })));
    });
    return el("section", {}, [
      el("h2", { text: table.title }),
      table.description ? el("div", { html: table.description }) : el("div"),
      el("div", { class: "table-wrap" }, [
        el("table", {}, [el("thead", {}, [head]), el("tbody", {}, body)]),
      ]),
    ]);
  }

  function render(demo, root) {
    document.title = demo.title;
    var links = (demo.links || []).map(function (l) { return el("a", { href: l.url, text: l.label }); });
    root.appendChild(el("header", {}, [
      el("h1", { text: demo.title }),
      el("p", { class: "authors", text: demo.authors || "" }),
      el("p", { class: "venue", text: demo.venue || "" }),
      el("p", { class: "links" }, links),
    ]));
    if (demo.intro) root.appendChild(el("div", { html: demo.intro }));
    demo.tables.forEach(function (t) { root.appendChild(renderTable(t)); });
    if (demo.credits) root.appendChild(el("footer", { html: demo.credits }));
  }

  // Only one sample plays at a time.
  document.addEventListener("play", function (e) {
    document.querySelectorAll("audio").forEach(function (a) { if (a !== e.target) a.pause(); });
  }, true);

  var root = document.getElementById("demo");
  try {
    render(window.DEMO, root);
  } catch (err) {
    root.prepend(el("p", { class: "error", text: "Demo config error: " + err.message }));
    throw err;
  }
})();
