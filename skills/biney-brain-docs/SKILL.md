---
name: biney-brain-docs
description: How MRS has an AI fill in and audit a document that lives in Google Docs (report, spec, plan, template-based deliverable, thesis chapter), editing the live document in the user's own signed-in browser. Use when the task is "write this into my document", "fill in these sections", or "check the document meets the format".
---

# Documents: fill in the live Doc, then audit it until it passes

## Hard prerequisite: the Doc has to be live in a signed-in session

This workflow only works when all of this is true:

1. `claude-in-chrome` is connected to the user's own Chrome (see the router, it's the one case where the real logged-in session is the point).
2. The user is **already signed in** to the Google account that can edit the Doc, and the Doc is reachable from that browser.
3. The edit happens **in the live document**, not in a copy, an export, or a rebuilt file.

If any of them is missing, say so before starting and name which one. Don't quietly switch to a different method and still call it "done in the document". Fallbacks are honest ones: read the Doc through a Drive connector (read only), draft the text for the user to paste, or work on a local file and say plainly that the live Doc wasn't touched. If the browser lands on a sign-in page, stop and ask the user to sign in themselves, never type credentials.

The user opening the document in their own browser and saying "operate on the one I have open" is the normal trigger. Finding the right tab or file is part of the job: if several candidates exist, don't guess, ask for the link.

## General flow (any document, not only theses)

1. **Read the whole document first.** Google Docs draws its text on a canvas, so page text extraction returns nothing useful. Read the content through the Drive connector's export instead, and use the browser only to act.
2. **Find the format to copy.** Sections that are already finished are the real style guide: paragraph spacing, indents, bullet style, bold labels, caption convention. Match them, not your own taste. Instruction text left by the template (often in another color) is a placeholder to replace, not content to keep.
3. **Touch only what was asked.** Everything outside the requested sections has to come out identical, and you have to be able to prove it.
4. **Use the user's real data only.** Numbers come from their project, with an explicit cut date when they gave one. If a fact is missing, pick the sensible default, flag it in the reply, and keep going, don't stall the whole task on it. If the answer changes what the text claims (something the project doesn't do yet), ask once, then write what they decide and mention the gap.
5. **Edit in place and check every step.** Take a screenshot after each batch of typing. Selections and search bars fail silently, and the cost is text landing in the wrong place.
6. **Build figures instead of describing them.** A process, an architecture or a flow gets a real diagram (BPMN for a process, drawn with a plotting library), sized to the text width, captioned the way the document's existing figures are.
7. **Run the humanizer step from the router** on any prose you wrote, before calling it done.
8. **Audit until it passes** (next section).

## The audit loop ("don't stop until every check passes")

When the user says to keep going until everything meets the criteria, that's a contract, not a mood:

- Turn the criteria into **checks you can run**, not opinions: placeholder text gone, template colors gone, indents and spacing equal to the finished sections, label/body formatting, caption format, figure fits the text width, no double spaces, no wrong punctuation, no stray quotes or long dashes, numbers consistent with each other, no empty paragraphs left behind, and the rest of the document unchanged.
- Run them on the **saved file**, exported from Drive, not on what the screen looks like. A Doc opened from an Office file syncs to that file in batches every few minutes, so closing the tab forces the save. Compare against the original paragraph by paragraph, text and formatting.
- Fix what fails in the live Doc, wait for the sync, run again. Repeat.
- If a check itself is wrong (a caption legitimately has no final period), fix the check, say so, and don't count it as a pass you earned.
- Say what you couldn't verify, for example page layout when you can't render the file.

## Reporting

Report incidents as they were: text typed into the wrong place, a selection that replaced something it shouldn't have, what you undid, and the check that proves the damage is gone. Same for anything you noticed but left alone because it wasn't in scope (a typo that was already there, a numbering clash with the template). The user decides those.

## Mechanics that saved time in Google Docs

- After the find shortcut, wait and take a screenshot before typing. The bar opens late and early text goes into the document.
- To replace a paragraph, put the caret at its start (move right from the end of the previous one), select to the end of the paragraph, clear formatting, then type. Starting from the paragraph-up shortcut sometimes inserts instead of replacing. Selecting a paragraph by triple click and deleting removes the paragraph break too.
- Clear formatting removes a template's placeholder color and a first-line indent in one go. Bold labels come after that, toggling bold around the label.
- Typing a straight quote turns into a curly one. If the document uses straight quotes, write the text so it doesn't need them.
- A list paragraph turned into plain text keeps its indent, decrease it once. Paragraph spacing is set from the format menu's custom spacing dialog, and "keep with next" stops a figure caption being left alone at the bottom of a page.
- Inserting an image: the file picker can't be driven. Serve the image from a local server with permissive CORS, fetch it in the page, and dispatch a paste event carrying the file at the editor's text-event iframe. A synthetic paste shortcut and the file upload tool don't work here. Stop the server afterwards.
- Discontiguous work needs a fresh screenshot before every click, the page keeps scrolling after a wheel input.
- For wording changes inside paragraphs that are already formatted (a humanizer pass, a rewrite of one sentence), use Find and replace instead of retyping the paragraph: it keeps bold, spacing and lists intact and a match count tells you whether it hit. The `ctrl+h` shortcut may not open it, the menu search shortcut (`alt+/`, then type the menu item name) does. Verify the dialog is open and focused before typing into it, otherwise the text goes into the document.
- The browser window sometimes reports a smaller usable area than the screenshot suggests, so clicks land about 1.5 times further out than they look. Test one click on a harmless button before relying on coordinates, and close the "signed in as" account notice if it blocks the top bar.
- Dialogs animate open: wait a couple of seconds and screenshot before typing into their fields, otherwise the keystrokes append to the old value (a spacing of 0 became 120). For number fields, click, select all, then type. Selecting a paragraph leaves a floating assistant toolbar just under it, and a click aimed below the paragraph can open that panel instead, so re-screenshot before the next click.
- A wrong character in the replacement text is easy to type and easy to miss. Read the text back from the screenshot before applying it, and include a word-level spell check of the new words in the audit.
- Don't click on the page's top margin: that opens the header for editing and a stray keystroke lands there. Check the headers and footers against the original in the audit.

## When the document is a thesis-style deliverable

Same flow, plus what's specific to this kind of template (a research project or thesis work built on a university template with fixed sections):

- **Case study section.** When the project is already built, the case study is the project itself, and the text says so instead of inventing a host organization. General data: what it is, sector, where and how widely it operates, its technical mission. Specific data: the module the research is about, the critical process and where it fails, current software and hardware, actors, and volumes with a cut date.
- **The critical process gets a BPMN figure** with lanes per actor, and the failing step highlighted with the measured number from the user's data.
- **Research question.** Build it from the template's own formula: base question, the technical proposal, the problem it addresses, the scope or context. State the four pieces in a sentence, then justify it with the measured problem, the literature the document already cites, and what the case gives that other studies lack (real production data, labels that users generate).
- **Cite only what the document already cites** in its own background section. Don't add references the user hasn't vetted.
- **Numbering.** Templates often carry their own figure and table numbers further down. Adding a figure can make them clash. Flag it, don't renumber sections you weren't asked to touch.
- **Nothing personal leaves the document.** Names, ids, emails and project figures stay in the user's Doc, never in shared notes or a public repo.

## Summary for the router

- Filling or auditing a document in Google Docs: needs the live Doc in the user's signed-in browser, edited in place. If that's missing, say which piece and use an honest fallback.
- Copy the finished sections' format, touch only the requested sections, real data only with a cut date.
- Audit means checks run on the saved export, repeated until they all pass, with incidents and unverified parts reported.
- Thesis-style template: the built project is the case study, BPMN figure for the critical process, research question from the template's formula, cite only what the document already cites.
