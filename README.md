# SGM Tree

An interactive Skullgirls Mobile skill tree which communicates cost data to the parent window.

![preview](preview.png)

## How to Use

0. (Optional) Save a copy of `sgmtree.svg` and the `sgmtree` folder.
1. In your HTML, include the SVG.
  - `<embed src="sgmtree.svg">`
  - If you did not save a copy, replace `sgmtree.svg` with `https://krazete.github.io/sgmtree/sgmtree.svg>`.
2. Include your script, include a message event listener.
  - `window.addEventListener("message", onMessage);`
3. In your message listener, filter requests by origin.
  - `function onMessage(e) {if (e.origin == window.origin) { /* CODE */ }}`
  - If you did not save a copy, replace `window.origin` with `"https://krazete.github.io"`.
4. Handle the data.
  - `e.data` will be in the format `{"sp": 0, "cc": 0, "th": 0, "fs": 0}`.
  - `sp` and `cc` indicate the total cost using only Skill Points and Canopy Coins.
  - `th` indicates the total cost using only Theonite.
  - `fs` is the Fighter Score multiplier.

See `index.html` for an example of basic use.

## Notes

- In the SVG file, nodes are named according to the counterclockwise direction, not tree order. E.g. `sa1` is actually the second tier of Signature Ability 1 while `sa2` is the first tier of Signature Ability 1.
- To test the message feature locally, you must open your HTML with a local server (e.g. Python's SimpleHTTPServer) due to CORS policy.