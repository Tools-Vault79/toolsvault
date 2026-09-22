ToolVault — SEO V1 upload package

Purpose
-------
This package adds the first technical SEO layer without replacing the existing
ToolVault website.

Files
-----
robots.txt
  Allows normal crawling and points search engines to the XML sitemap.

sitemap.xml
  Lists the current public ToolVault homepage and tool URLs.

_headers
  Optional Cloudflare Pages configuration:
  - noindex for *.pages.dev deployment URLs to reduce duplicate indexing
  - noindex for the payment setup page

IMPORTANT
---------
1. Upload these files to the ROOT of the GitHub repository.
2. Commit directly to main (your current deployment branch).
3. Let the existing Cloudflare deployment run automatically.
4. Do NOT delete the current website or create a new repository.
5. Do NOT upload these files inside /tools or /css.

Next SEO phase
--------------
After this deployment is verified, optimize the actual HTML pages:
- unique <title> for every page
- unique meta description
- self-referencing canonical
- one clear H1
- descriptive H2 sections
- internal links
- relevant JSON-LD structured data
- image alt text
- paid-tool conversion/paywall messaging

The sitemap intentionally excludes payment-setup from SEO.

URL note
--------
Cloudflare Pages normally serves matching HTML pages at extensionless URLs.
Verify each listed URL on the live site before submitting the sitemap in
Google Search Console.
