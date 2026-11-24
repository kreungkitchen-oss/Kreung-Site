# Putting kreungla.com live on Netlify

A step-by-step guide for Sam. No coding needed. Plan on about an hour, plus waiting time for the domain to switch over.

**What stays the same:** Square keeps doing online ordering and Kreung Rewards. Your Square Online site keeps running at its free `.square.site` address for ordering. Only `kreungla.com` moves to the new site on Netlify, which is free for a site this size.

---

## Before you start

1. **Merge the pull request** on GitHub (the green "Merge" button). This puts the new site on the `main` branch, which is what Netlify will publish.
2. **Know where your domain lives.** You bought `kreungla.com` through **Square**. Square uses Register.com behind the scenes, but you don't need a separate Register.com login: the DNS settings for a Square-bought domain are usually managed in your **Square Dashboard → Online → Website → Domains**. Find them there now, because you'll change two records in Step 4. If you can't find them, contact Square support. The domain renews on **July 6, 2027**. Keep **auto-renew turned on in Square** so it never lapses.
3. **Find your Square Online `.square.site` address.** In your Square Dashboard, go to **Online → Website → Domains**. Next to `kreungla.com` you'll see a free address that ends in `.square.site`. Write it down, open it in your browser and check that your Square site loads. Do this **before Step 4**: after the switch, that address is how people reach Square Online ordering.
   - Send that address to Claude. It becomes the site's ordering link (`ORDER_URL`, which is `links.order` in `src/data/business.ts`, plus the `/order` redirects). The "Order ahead" buttons stay hidden until it's set, so send it when you're ready to turn ordering back on.
4. **Go through `TODO.md`.** The site works without those answers, but the "Before launch" items (order link, grill space, Lunch Club terms and so on) should be filled in before you announce it.

---

## Step 1. Create the site on Netlify

1. Go to **netlify.com** and sign up with your GitHub account (the "Sign up with GitHub" button).
2. Click **Add new site → Import an existing project → GitHub**.
3. Pick the **kreungkitchen-oss/Kreung-Site** repository.
4. Netlify reads the settings from the `netlify.toml` file, so you don't need to change anything. You should see:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **Deploy**. After a minute or two you get a test address like `something-random.netlify.app`. Open it and click around. That's your new site.

**Tip:** In **Site configuration → General → Site details → Change site name**, rename it to `kreungla` so the test address becomes `kreungla.netlify.app`. (Your site is currently `kreung-site.netlify.app`. Renaming is optional. If you do rename it, use the new address in Step 4.)

---

## Step 2. Turn on the quote form and get emails

The site has one form, the **catering quote request**. Each request goes to your Google Form, and Netlify keeps a backup copy and emails it to you. (Kreung Rewards doesn't use a form on this site. The "Join" buttons go straight to your Square Loyalty page.)

1. In your Netlify site, go to **Forms**. If you see a button to **Enable form detection**, click it, then go to **Deploys → Trigger deploy → Deploy site** so Netlify finds the form.
2. You should now see `catering-quote` listed under Forms. If you also see an old `rewards-signup` form from an earlier version, you can ignore it or delete it.
3. Go to **Site configuration → Notifications → Emails and webhooks → Form submission notifications**.
4. Click **Add notification → Email notification**.
   - Event: **New form submission**
   - Email: `kreungkitchen@gmail.com`
   - Form: **catering-quote**
5. **Test it.** On the test address, fill in the quote form with your own details and send it. You should land on the thank-you page, get an email within a minute or two, and see the answers in your Google Form responses. Check your spam folder the first time and mark it "Not spam".

Spam is filtered automatically. Every form has a hidden trap field that bots fill in and people don't.

---

## Step 3. Add your domain in Netlify

1. In Netlify, go to **Domain management → Add a domain**.
2. Type `kreungla.com` and click **Verify**, then **Add domain**.
3. Netlify will also add `www.kreungla.com`. The site is set up to use **www.kreungla.com** as the main address, so in Domain management, set **www.kreungla.com** as the **primary domain**. Then `kreungla.com` automatically forwards to it.
4. Netlify now shows you what DNS records to add. Keep this page open for Step 4.

---

## Step 4. Point the domain at Netlify

This is the step that actually moves visitors from the old Square site to the new one. Do it when you're ready to switch, ideally on a quiet weekday.

Log in to your **Square Dashboard** and go to **Online → Website → Domains**. Open `kreungla.com` and find its **DNS settings** (sometimes called "DNS records" or "Advanced DNS"). If you can't find them there, contact Square support and ask how to edit DNS records for a domain bought through Square.

> **⚠️ Don't break your email.** kreungla.com uses Google Workspace for email. Your DNS has five `MX` records that point to Google: `aspmx.l.google.com`, `alt1.aspmx.l.google.com`, `alt2.aspmx.l.google.com`, `alt3.aspmx.l.google.com` and `alt4.aspmx.l.google.com`.
>
> **Change only the two website records: `@` (the bare domain, also called the apex or root) and `www`.** Leave every `MX` record exactly as it is. Don't edit, delete or "reset to default" anything else. If your DNS page has a button like "Use default records" or "Reset DNS", don't click it. It can wipe the email records.
>
> Before you change anything, take a screenshot of the whole DNS records page. If something goes wrong, you can put it back.

**Option A (simplest): keep DNS where it is and change two records**

| Type | Name / Host | Value |
| --- | --- | --- |
| `A` | `@` (or blank) | `75.2.60.5` |
| `CNAME` | `www` | Your exact Netlify address, as shown in Netlify's **Domain management**. Right now that's `kreung-site.netlify.app`. It's `kreungla.netlify.app` only if you renamed the site using the Step 1 tip. |

- Delete any old `A` or `CNAME` records for `@` and `www` that point to Square. Two records for the same name will confuse browsers.
- **Do not touch** any `MX` records (Google Workspace email, see the warning above) or any `TXT` records. Those handle email and verification.
- Always use the exact values Netlify shows you on the Domain management page if they're different from the table above.

**Option B: let Netlify run your DNS**

In Netlify, choose **Set up Netlify DNS**. Netlify gives you four "name servers" (they look like `dns1.p01.nsone.net`). At your domain company, replace the current name servers with those four. This hands **all** DNS to Netlify, so first add your five Google Workspace `MX` records in Netlify DNS, copied exactly from your screenshot (the same names, values and priority numbers). If you skip this, email to your @kreungla.com addresses stops working. Option A is safer if you're not sure.

**Where to make these changes:** in the Square Dashboard (Online → Website → Domains), as above. Square uses Register.com behind the scenes, so you won't need a Register.com login. If you can't find the DNS settings or Square won't let you edit them, contact Square support. Don't transfer the domain or cancel anything at Square: the domain renews through Square on July 6, 2027, and Square Online keeps running for ordering.

**How long does it take?** Usually under an hour, sometimes up to 24 to 48 hours. During the switch, some people see the old site and some see the new one. That's normal.

---

## Step 5. Turn on HTTPS

Once the domain points to Netlify, go to **Domain management → HTTPS** and click **Verify DNS configuration**, then **Provision certificate** if it isn't automatic. This gives you the padlock in the browser. It's free.

---

## Step 6. Check everything

Open **www.kreungla.com** on your phone and computer and check:

- [ ] The home page loads with the padlock (https).
- [ ] `kreungla.com` (without www) forwards to `www.kreungla.com`.
- [ ] Email still works. Send an email to one of your @kreungla.com addresses from another account and check that it arrives. Reply to it to check sending too.
- [ ] Send a test quote request. You land on the thank-you page and get the email.
- [ ] The "Join Kreung Rewards" buttons (Home and `/rewards`) open your Square Loyalty page.
- [ ] The "Text us" button opens a text message to (562) 726-5072.
- [ ] An old Square link still works. Try `www.kreungla.com/contact-us`; it should go to the catering page.
- [ ] Your `.square.site` address from "Before you start" still opens Square Online.
- [ ] Online ordering: if you've turned Square ordering back on and sent Claude the address, the "Order ahead" buttons show and go to Square Online.

---

## Step 7. Tell Google and Bing about the new site

This helps the new pages show up in search faster.

**Why you need to re-verify:** today, Google Search Console knows the site is yours because of a meta tag on the Square site. That tag goes away when the new site goes live, so Google will stop trusting it. Verify again in one of the two ways below. Either one keeps your Search Console history.

**Google Search Console**

1. Go to **search.google.com/search-console** and sign in with the Google account you already use for Search Console.
2. Verify the site. Pick **one** way:
   - **Way 1 (recommended): DNS `TXT` record.** Click **Add property → Domain** and type `kreungla.com`. Google gives you a `TXT` record that starts with `google-site-verification=`. Add it in your DNS settings (same place as Step 4, or in Netlify DNS if you chose Option B). It's a *new* record: don't change the `MX` records or anything else. Click **Verify**. It can take a few minutes. This covers `kreungla.com`, `www.kreungla.com` and any future site, and you can do it **before** Step 4, while the Square site is still live.
   - **Way 2: meta tag on the new site.** In your existing `https://www.kreungla.com/` property, go to **Settings → Ownership verification → HTML tag**. Google shows a tag like `<meta name="google-site-verification" content="abc123..." />`. Send the code inside `content="..."` to Claude (or paste it into `siteVerification.google` in `src/data/business.ts`). The site then adds the tag to every page. After the new site is live, click **Verify**.
3. In the left menu, go to **Sitemaps**, type `sitemap-index.xml` and click **Submit**. (The site's sitemap is called `sitemap-index.xml`. `sitemap.xml` also works, because it forwards to the same file.)
4. Optional: use **URL Inspection** on `https://www.kreungla.com/catering` and click **Request indexing** to speed things up for your most important page.

**Bing Webmaster Tools** (also feeds ChatGPT search and DuckDuckGo)

1. Go to **bing.com/webmasters** and sign in.
2. Choose **Import from Google Search Console**. It copies your verified site over, so you don't need another tag or record.
3. Open **Sitemaps** and check that `https://www.kreungla.com/sitemap-index.xml` is listed. If it isn't, click **Submit sitemap** and add it.

---

## Step 8. After launch

- **Delete the style guide page.** It's an internal design reference. Ask Claude to remove `src/pages/styleguide.astro`, or delete it on GitHub.
- **Update your Google Business Profile and Yelp** so the website link is `https://www.kreungla.com`.
- **Square Online:** keep Square Online running at its `.square.site` address for ordering and as a fallback. Only remove `kreungla.com` from it after the new site is confirmed working. Don't turn off or delete the Square Online site.

---

## Making changes later

Every change merged into `main` on GitHub goes live on its own in a minute or two. Netlify rebuilds the site automatically.

- **Prices, hours, markets, ratings, reviews:** all in `src/data/business.ts`. Change it once and every page updates.
- **Something looks wrong after a change?** In Netlify, go to **Deploys**, click an earlier deploy and choose **Publish deploy**. The old version is back instantly.

## Costs

Netlify's free plan covers a site like this, including the quote form. Netlify's free plan has a monthly limit on form submissions and bandwidth; check **netlify.com/pricing** for the current numbers, and Netlify emails you before you get close. The domain renewal stays with Square (next renewal July 6, 2027, with auto-renew on).
