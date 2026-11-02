# Gray's A-Z Contracting website

Static one-page site for Gray's A-Z Contracting. Plain HTML, CSS and JavaScript, with no build step.

## Files

```
index.html        main page
thanks.html       shown after a quote request is sent
404.html          "page not found" page
style.css         all styles
script.js         open/closed status, phone menu, photo size check
assets/           favicon and images
robots.txt        search engine rules
sitemap.xml       page list for search engines
netlify.toml      security headers and hidden files (read by Netlify)
```

## Quote form

The form uses Netlify Forms. Submissions, including up to 3 photos, appear under **Forms** in the
Netlify dashboard. Turn on email notifications there so each request is emailed to the business.

## Site address

The pages assume the site lives at `https://grays-az-contracting.netlify.app/`. If the Netlify site
gets a different name or a custom domain, replace that address in `index.html` (canonical, og:url,
og:image, JSON-LD), `robots.txt` and `sitemap.xml`.
