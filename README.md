# 8bitlab

8bitlab is an 8-bit version of Gitlab built to demonstrate a simple, interactive UI for the Github API. It's not terribly pretty, and only mildly usable.

See the running demo [here](https://eightbitlab.herokuapp.com/).

## Development server

Clone the repository and run `npm i`.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io/).

## What I would have done if I had more time

### Technical

1. Built a custom diff to HTML parser, since a couple of the ones I tried off NPM didn't work that well.
2. Built a caching service to store commonly accessed organization information. Admittedly though, I wasn't sure if sharing state via a service was the best idea in this scenario given that the components are loaded independently of one another and services are injected on component initialization. I could have used local storage too, but that could be easily cleared by a user. I chose query params to keep things simple.
3. Added a repo search bar on the Organization page. I could have re-used the generic searchbar I made, but I would have had to rewrite the paginator, and I did not want to spend time on this.
4. Added a dropdown menu on the Commits page to filter by branch.
5. Wrote a custom function to group commits together by day, sorted from most to least recent.
6. Added inputs for users to be able to narrow commits to a range of dates.
7. Added a Pull Requests tab on the Commits page.
8. Built a custom backend that would have allowed me to paginate, sort and search through data in a way that would enable the frontend to consume the results of more complex queries without burdening itself with the processing.
9. Defined complete Typescript interfaces for the API response types. The response types were large though and I figured it would be a better use of time to call this one out here.
10. Better HTTP error handling.
11. More unit tests. Due to the time-consuming nature of needing to import all Material components and services on the whole page (not just the ones on the component itself) into the component test file, I decided to just call this one out here too. I wrote an e2e test to make up for it.

### Observability

1. More logging.

### Accessibility

1. I tried using a component library with built-in accessibility, but if I had more time I'd also aria all the things.
2. I really wanted to come up with a UX for the Commits page that would have avoided needing to pop out diffs in a new tab. An elegant summary dialog or an expandable panel would have been nice.
3. Cross-browser testing with custom polyfills for anything that isn't fully compatible with every browser.
4. Better error handling to ensure the user knows when something has gone wrong.

### Style

1. Implemented custom components for displaying things like the commit tree and the diff.
2. Separated out the components more granularly for future reusability.
3. Had more generic CSS classes for reusability purposes as well.
4. Better fonts, colors, padding, margin, spacing, general layout. I did not put major emphasis on CSS for this due to the time-consuming nature of it.
5. Mobile-responsiveness and media queries.
6. Animations and progress bars so that page's empty states do not load before the API responds.
7. Opinionated tslint + prettier config (◡ ‿ ◡ ✿)
