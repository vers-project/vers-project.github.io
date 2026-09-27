// Content of the vocal intensity conversion demo page (rendered by ../shared/demo.js).
// Audio: convert_selection_avid_labels/09-14-26/03-17-03/0/peak_normalized
// (WavLM layer 6 converter, epoch 599, the checkpoint of the paper's Table 2).
window.DEMO = {
  title: "Vocal intensity conversion with continuous SPL control via adversarial training",
  authors: "Quentin Le Tellier, Albert Rilliard, Olivier Perrotin, Marc Evrard",
  venue: "Audio samples — submitted to ICASSP 2027",
  links: [
    { label: "Code", url: "https://github.com/vers-project/vocal-intensity-conversion" },
  ],
  intro: `
    <p>Each row is one recording from the AVID corpus (Source column), converted to the target
    intensities given in the column headers, in dB SPL. The conversions are produced by the
    converter trained on WavLM layer&nbsp;6 features and decoded with the kNN-VC HiFi-GAN vocoder.</p>
    <p>All samples are peak-normalised, as in the perceptual evaluation of the paper. Intensity
    differences are therefore heard in voice quality, not in loudness.</p>`,
  credits: `
    <p>Source recordings: AVID, the Aalto Vocal Intensity Database
    (P. Alku, M. Kodali, L. Laaksonen, S. R. Kadiri, <i>Speech Communication</i> 157, 2024),
    <a href="https://doi.org/10.5281/zenodo.8331897">doi:10.5281/zenodo.8331897</a>,
    licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.</p>`,

  tables: [{
    title: "Converted samples",
    audioDir: "audio/",
    rowLabel: "Speaker {speaker}, sentence {sentence} ({level})",
    columns: [
      { label: "Source", file: "spk{speaker}_sent{sentence}_rep{rep}_src{src}.mp3" },
      { label: "{db} dB SPL", file: "spk{speaker}_sent{sentence}_rep{rep}_src{src}_tgt{tgt}.mp3",
        repeat: "targets" },
    ],
    // Target levels of the export: linspace(45, 75, 8).
    targets: { 1: 45.0, 2: 49.3, 3: 53.6, 4: 57.9, 5: 62.1, 6: 66.4, 7: 70.7, 8: 75.0 },
    // Which targets appear as columns, in this order.
    show: [2, 4, 6, 8],
    // src is the AVID intensity category of the source: 1 soft, 2 normal, 3 loud, 4 very loud.
    rows: [
      { speaker: 9,  sentence: 1,  rep: 1, src: 1, level: "soft" },
      { speaker: 9,  sentence: 9,  rep: 1, src: 2, level: "normal" },
      { speaker: 21, sentence: 3,  rep: 1, src: 4, level: "very loud" },
      { speaker: 21, sentence: 13, rep: 1, src: 3, level: "loud" },
      { speaker: 34, sentence: 6,  rep: 1, src: 2, level: "normal" },
      { speaker: 34, sentence: 20, rep: 1, src: 1, level: "soft" },
      { speaker: 44, sentence: 7,  rep: 1, src: 3, level: "loud" },
      { speaker: 44, sentence: 14, rep: 1, src: 4, level: "very loud" },
    ],
  }],
};
