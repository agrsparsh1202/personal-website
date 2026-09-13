# Sparsh Agrawal's portfolio website

A responsive, static personal portfolio designed as a cinematic digital résumé. It can be deployed on GitHub Pages with no build tooling.

## Design direction

- **Mood:** dark editorial and quietly cinematic—not black; the blue-charcoal background gives it depth while pale-stone type remains inviting.
- **Palette:** Ink `#172127`, Deep ink `#11191E`, Surface `#202B31`, Pale stone `#ECE9E1`, Mist `#9AB5BB`, Warm highlight `#DA9D66`.
- **Typography:** Playfair Display supplies the expressive editorial voice; DM Sans handles readable body copy; DM Mono adds a precise résumé-like detail layer.
- **Experience:** the desktop homepage prioritises a compact, horizontal first view: portrait on the left, introduction on the right, contact links at the top, and an organisation rail directly below. On a phone, it reflows into a readable single column.

## Page structure

1. Portrait and introduction
2. Horizontal organisation logo rail
3. Experience cards with circular logos, bullet points, and adjacent photo slots
4. Education
5. Intentionally blank hobbies section
6. Contact and social links

## Make it yours

Place the résumé and photo folders in this project. The résumé will be the source of truth for role titles, dates, education, contact details, and LinkedIn; replace the remaining placeholder contact links in `index.html` afterward.

Create `images/`, `images/logos/`, and (optionally) one folder per experience. Add assets such as `images/hero-portrait.jpg` and `images/logos/ey.png`. Replace the matching placeholder `<div>` or text logo with an `<img>` tag, keeping helpful `alt` text:

```html
<img src="images/hero-portrait.jpg" alt="Sparsh Agrawal standing in …" />
```

Update the LinkedIn and GitHub URLs before publishing. The current links intentionally go to their homepages.

## Preview locally

Open `index.html` directly in a browser, or use your editor’s local preview feature. There is no dependency installation or build command.

## Publish with GitHub Pages

1. Create a new GitHub repository and upload these files to its default branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the default branch and the `/ (root)` folder, then save.
5. GitHub will provide the public URL once publishing finishes.

For a personal-site address, name the repository `your-github-username.github.io`.
