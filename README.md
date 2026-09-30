# juushgaming.github.io
Official home of JuushGaming – games, documentation, support and more.

## Jones pages

- `index.html`: existing JuushGaming homepage, now linked to the wiki.
- `jones/index.html`: searchable field guide with all 56 ingame articles, in English, German and French. English is the default; a chosen language is saved only in the visitor's browser. Search ignores case and accents. Each entry has a shareable fragment link.
- `jones/privacy.html`: standalone English privacy policy, dated September 30, 2026, with `privacy@juush.de` as the contact address.

The site uses local CSS and JavaScript only: no external fonts, analytics, advertising, accounts or build service. English articles remain readable when JavaScript is disabled. The privacy page needs no JavaScript at all.

## Local review

Open `index.html` or `jones/index.html` in a browser. Alternatively, run `python -m http.server 8765` in this folder and visit `http://localhost:8765/`. Check the wiki's language picker, search, categories, article links and narrow-screen layout.

The privacy draft distinguishes game data from operating-system backups, GitHub Pages visits, and emails voluntarily sent to the privacy contact. Review those statements, especially how you handle and delete contact emails, before publishing. The current game stores scores, discoveries and settings locally; its Android release manifest has no Internet permission. A future SDK, account, advertising or cloud feature requires a fresh privacy review.

## Publish after review

Commit and push these files yourself. Publish the repository root through GitHub Pages; `.nojekyll` keeps the static files unchanged. No publishing has been performed as part of this change.

Expected public addresses after deployment:

- Wiki: https://juushgaming.github.io/jones/
- Privacy policy: https://juushgaming.github.io/jones/privacy.html

The game links to that exact privacy address from its settings, both before a run and from the pause menu. Open the public address after deployment and verify that it works without signing in before using it in Play Console. Google's requirement for a policy in the listing and within the app is documented in [Google Play's User Data policy](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en).

## Update the wiki from the game

The source is the game's `Assets/Resources/Localization/{wiki,en,de,fr}.json`. Do not hand-edit `jones/wiki-data.js` or the generated article markup in `jones/index.html`.

```sh
python tools/export-wiki.py --project-dir /path/to/UnityProject
```

This exports only the wiki entries and category names, leaving the privacy page untouched. The page template is `tools/wiki-template.html`; presentation and interactions live in `jones/wiki.css` and `jones/wiki.js`.
