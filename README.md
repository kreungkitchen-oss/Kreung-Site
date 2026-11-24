# Kreung LA website

The website for **Kreung LA**, Cambodian BBQ catering in Los Angeles (kreungla.com).

It's a plain, fast static site: HTML, CSS and a little JavaScript. No build step, nothing to install. Netlify hosts it and collects the quote requests.

## What's in here

| File / folder | What it is |
| --- | --- |
| `index.html` | Home page: hero video, menu, how it works, events, quote estimator + form, FAQ |
| `corporate-catering.html` | Corporate catering page |
| `thanks.html` | Page people see after sending a quote request |
| `404.html` | "Page not found" page |
| `css/styles.css` | All the styling (brand colors are at the top) |
| `js/main.js` | Mobile menu and the quote estimator (**prices are at the top of this file**) |
| `images/` | Photos (pulled from Sam's videos) and the logo |
| `video/` | The short looping grill clip used at the top of the home page |
| `netlify.toml` | Netlify settings |

## Placeholders

Anything on the site with a **striped yellow highlight** is a guess waiting for Sam to confirm (menu names, prices, phone, email, Instagram, FAQ answers). In the code these are wrapped in `<mark class="tbd">…</mark>`. Once a piece is confirmed, remove the `<mark class="tbd">` and `</mark>` around it. When everything is confirmed, delete the `preview-banner` line at the top of each page.

## Changing quote estimator prices

Open `js/main.js` and edit the numbers in the `PRICING` block near the top. Also update the matching "from $X/guest" labels in `index.html` and the prices on `corporate-catering.html`.

## Putting it online with Netlify (one-time)

1. Log in at [app.netlify.com](https://app.netlify.com) (sign in with GitHub is easiest).
2. Click **Add new site → Import an existing project → GitHub**.
3. Pick the **Kreung-Site** repository. Leave the build command empty; the publish directory is `.` (Netlify reads this from `netlify.toml`).
4. Click **Deploy**. You'll get a free `something.netlify.app` web address to preview.
5. Go to **Forms** in the Netlify site menu and click **Enable form detection**, then redeploy once (Deploys → Trigger deploy). The `catering-quote` form will show up there.
6. Under **Forms → Form notifications**, add an email notification so each quote request lands in your inbox.
7. When you're happy, add `kreungla.com` under **Domain management** and follow Netlify's steps to point the domain away from Square.

After that, every change merged into the `main` branch on GitHub goes live automatically.
