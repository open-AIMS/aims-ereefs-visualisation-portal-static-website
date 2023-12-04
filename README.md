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

# TODO items after first round feedback

- [ ] any video:
  - [x] `Time step:` tabs
    - [x] space between icon and text
      - [x] remove underline the `Time step:` tabs
        - [x] vertical-align: middle is causing this or something similar
    - [x] sort monthly tab wrapping on small screen
  - [x] video size is not responsive and not full screen.
    - Should I do this? We don't want to video to be so small that it's unusable on mobile. You want people to be able to scroll and hit the full screen button
  - [x] remove debuging logs
  - [x] consistent css between Download buttons
  - [x] Elevation drop down value is not remembered when switching timesteps
    - Problem also exists in old ereefs site.
  - [ ] If elevation is changed because the old one isn't available, need to make it obvious to the user.
    - continue with TODO: JJ: in the javascript
    - To test it, I need a product for which we are lacking data on one level of elevation in a certain situation (like hourly data). Marc suggested that I mock the metadata api response to simulate this.
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
  - [ ] Change title from "AIMS eReefs" to "AIMS eReefs Visualisation Portal"
  - [ ] remove the About -> eReefs Program Website menu item 
  - [ ] add icons for external links (even ASCII character are better than nothing)
  - [ ] drop down text color should be darker
  - [ ] main banner link not working
  - [ ] make the main banner a little less prominent (reduce the height)
- [ ] fix links to R and python tutorials
- [ ] Remove "AIMS eReefs" at the top of the home page
- [ ] remove other H1s. Should only be 1 on a page
- [ ] Help page:
  - [ ] increase whitespace (or make it consistent with the product page headings)
  - [ ] add an image banner to the top of the help page (if necessary to make it less dull)
- [ ] on About page remove the table and link to the tutorials page (replace last sentence)
- [ ] product page visualisation should stick to the existing quarto column size
  - [ ] home page blocks of links should rows of 2 instead of rows of 3.
- [x] mistaken font [times new roman] on the depth drop down
  - The issue was the "Montserrat" font, adding similar alternative font and font class fixes issue.
