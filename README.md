# eReefs Static Website

## Setup

- Install [Quarto](https://quarto.org/docs/get-started/)
- run `quarto preview` and confirm the website displays as expected.

## Previewing

To see a preview of the site, run `quarto preview`, or alternatively render the markdown to html with `quarto render` then run `python3 -m http.server`

## Publishing

### Publishing manually

- Check out the branch you wish to deploy (ensure you have not checked out the `gh-pages` branch).
- run `quarto publish gh-pages`

This command will render the content, copy the output to the `gh-pages` branch, push that branch to GitHub.

### Publishing with GitHub Actions

Publishing with GitHub Actions set up according to [the quarto documentation](https://quarto.org/docs/publishing/github-pages#github-action). However, the `_publish.yml` file was not generated by `quarto publish gh-pages`, which is not consistent with the documentation. The `.github/workflows/publish.yml` file has been set up to run the Quarto Publish on commits to the `main` branch. To publish with GitHub actions, push your changes to the `main` branch.

There has been some weird behaviour with the background image in the header. This may only work when published manually (at least initially).

## Styling

Several eReefs websites exist, which are linked to in the drop down menu of this website. This website has been styled with the [Flatly](https://bootswatch.com/flatly/) theme, modified to align with the CSIRO website as it is likely the one most difficult to change.

## Custom navigation

In order to match the styling of the CSIRO website, cusom navigation was created. This was done because quarto supports only a pinned header, or a dynamically hidden header with headroom.js. In order to create this custom header: 

- create the header with the _quarto.yml file
- rendered the page
- copy the code for the header
- put this code into the custom include (`includes/_navbar_custom.qmd`)
- change the header id="quarto-header" to id="custom-header"

When the website is built quarto will create it's own header, which is why we have the `javascript/remove_quarto_header.js` file to remove it.

## Development

The new version of the website was created by bringing accross css and javascrtip from the old verison. No time was spent looking into the files to see what unused functions, classe, etc, could be removed so there is a lot of redundant code relating to eAtlas.

# TODO items after first round feedback

- [x] any video:
  - [x] `Time step:` tabs
    - [x] space between icon and text
      - [x] remove underline the `Time step:` tabs
        - [x] vertical-align: middle is causing this or something similar
    - [x] sort monthly tab wrapping on small screen
  - [x] video size is not responsive and not full screen.
  - [x] remove debuging logs
  - [x] consistent css between Download buttons
  - [x] Elevation drop down value is not remembered when switching timesteps
  - [x] If elevation is changed because the old one isn't available, need to make it obvious to the user.
    - If the selected elevation is not available on the timestep, the app does not change elevation, it simply displays "Media not available". So I just need to make sure the elevation drop down shows the elevation that is being queried for.
  - [x] Calendar year:
    - [x] no year in calendar
    - [x] calendar year navigation needs some thought. Help section exists in order to explain the navigation problem around years (clicking the arrows doesn't actually change the year).
      - I don't think this needs a lot of explanation as once you use it, it becomes evident. I created a help article to replace the test on how to use the tool that previously existed on every page.
    - [x] consider implementing a drop down - this is a good idea but I think should be part of the backlog.
  - [x] make it obvious which months in calendar are links and which have no data.
    - [x] make the text bold just like the selected month (except without the background)
- [x] footer
  - [x] add links to all logos
  - [x] `display: None` to middle of footer
- [x] fav icon to match the ereefs logo
- [x] menu
  - [x] menu should show you where you are with highlighting
    - This is built in to quarto, but not for drop down menus.
    - [x] visualisation portal menu should not be drop down and should take you to this page.
  - [x] project website could be renamed to something more clear to someone who is new to our website.
    - renamed to "Project Overview"
  - [x] CSIRO -> "CSIRO research portal"
  - [x] interactive data portal should direct to portal.ereefs.info
  - [x] Change title from "AIMS eReefs" to "AIMS eReefs Visualisation Portal"
  - [x] remove the About -> eReefs Program Website menu item 
  - [x] add icons for external links (even ASCII character are better than nothing)
  - [ ] drop down text color should be darker
  - [x] main banner link not working
  - [x] make the main banner a little less prominent (reduce the height)
    - I assume Marc is happy with this as he created large_image_header.css
- [ ] fix links to R and python tutorials
  - not 100% sure what this was referring to. I have fixed the about page.
- [x] Remove "AIMS eReefs" at the top of the home page
- [x] remove other H1s. Should only be 1 on a page
- [x] Help page:
  - [x] increase whitespace (or make it consistent with the product page headings)
  - [x] add an image banner to the top of the help page (if necessary to make it less dull)
- [x] on About page remove the table and link to the tutorials page (replace last sentence)
- [x] product page visualisation should stick to the existing quarto column size
  - [x] home page blocks of links should rows of 2 instead of rows of 3.
- [x] mistaken font [times new roman] on the depth drop down
  - The issue was the "Montserrat" font, adding similar alternative font and font class fixes issue.
- [ ] javascript
  - [x] remove references to eAtlas
  - [x] get the original javascript files 
  - [ ] implement minifying (with post render script?)
- [ ] css
  - [x] remove eatlas from the file names
  - [x] rename eatlas references in the classes inside eatlas_ncanimate2.css 
  - [ ] remove _minimal_mistakes.scss and incorporate it else where
    - override flatly variables with the colors directly, instead of referring to minimal_mistakes?
- [x] remove unused includes like _csiro_navbar.qmd
- [x] increase whitespace between bullet point in the product tiles on the home page
- [x] discuss taking 'aims' out of the repository name at standup
