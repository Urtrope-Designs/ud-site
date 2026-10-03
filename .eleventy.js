const { DateTime } = require("luxon");
const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const postcssConfig = require("./postcss.config.js");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Sort by `order` front matter; items without one go last.
  eleventyConfig.addFilter("sortByOrder", (array) => {
    return [...array].sort((a, b) => (a.data.order ?? Infinity) - (b.data.order ?? Infinity));
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));

  // Compile Tailwind/PostCSS before every build (including watch rebuilds),
  // so new classes in templates show up without a separate CSS watcher.
  eleventyConfig.addWatchTarget("./tailwind.config.js");
  eleventyConfig.on("eleventy.before", async () => {
    const from = "css/index.css";
    const to = "_site/assets/main.css";
    const css = await fs.promises.readFile(from, "utf8");
    const result = await postcss(postcssConfig.plugins).process(css, { from, to });
    await fs.promises.mkdir(path.dirname(to), { recursive: true });
    await fs.promises.writeFile(to, result.css);
  });

  eleventyConfig.addPassthroughCopy("media");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("resume.pdf");
  eleventyConfig.addPassthroughCopy("favicon.svg");

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  // let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  // let opts = {
  //   permalink: true,
  //   permalinkClass: "no-underline ml-0.5 opacity-0 hover:opacity-100",
  //   permalinkSymbol: "#"
  // };

  eleventyConfig.setLibrary("md", markdownIt(options)
    // .use(markdownItAnchor, opts)
  );

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
