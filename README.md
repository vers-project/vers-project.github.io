# vers-project.github.io

Audio-sample pages for VERS project papers, served by GitHub Pages at
<https://vers-project.github.io/>. Every push to `main` redeploys the site; there is no build step.

```
index.html          landing page: one link per demo (edit by hand)
shared/demo.js      renders a demo page from its config.js
shared/style.css    shared stylesheet
<demo>/index.html   shell page (identical for every demo)
<demo>/config.js    everything specific to the demo: text, table layout, rows
<demo>/audio/       the audio files
```

## Change a demo
Edit `<demo>/config.js`. Examples: set `show: [2, 4, 6, 8]` to choose which targets appear
as columns, or add a line to `rows`.

## Add a demo
1. Copy `vocal-intensity-conversion/index.html` into a new folder, and put the audio in `audio/`.
2. Write `config.js` (the one in `vocal-intensity-conversion/` is the reference):
   - `title`, `authors`, `venue`, `links`: the page header. `intro` and `credits` are HTML strings.
   - `tables`: one or more tables. Each table has:
     - `rowLabel`, and a `file` template for each column. `{name}` placeholders are filled from
       the row's fields.
     - A column with `repeat: "targets"`, which expands to one column per entry of `show`. It
       adds the fields `{tgt}` (the key) and `{db}` (the value in `targets`, rounded to `decimals`
       places, default 0).
3. Add a link to the root `index.html`.

## Test locally
```
python3 -m http.server -d .    # then open http://localhost:8000/<demo>/
```
Opening the page also works straight from disk. A config mistake is printed in red at the top
of the page. When the page is served over http, a referenced audio file that does not exist
shows as a red "missing: <path>" cell.
