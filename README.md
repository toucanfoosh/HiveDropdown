# Daniel Wu's Dropdown Menu Component for Hive

## To run:

\*Node.js version "^18.18.0 || ^19.8.0 || >= 20.0.0" is required.

- clone the repository
- run `npm install`
- Either:
  - run `npm run dev`
- Or:
  - run `npm run build`
  - run `npm start`

### This should open the demo page I have prepared, here is how the component works and what is shown on the page:

The component takes in the following parameters:

- **title**
  - The title of the dropdown menu
- **height** (optional, defaults to "3rem")
  - The height of the dropdown menu
- **width** (optional, defaults to "15rem")
  - The width of the dropdown menu
- **options**
  - An array of strings that represent the options in the dropdown menu
- **required** (optional, defaults to false)
  - A boolean that determines if the dropdown menu is required
- **multiSelect** (optional, defaults to false)
  - A boolean that determines if the dropdown menu allows multiple selections
- **value**
  - An array of strings that represent the selected options in the dropdown menu
- **onChange**
  - A function that is called when the selected options in the dropdown menu change

This is a controlled component and the parent component must pass in the value and onChange function as props.

The demo page shows 5 seperate dropdown menus. Their names describe whether they are single or multiple selections and whether they are required or not. The last menu contains 500 options to demonstrate rendering large lists.

The right side shows the current values for each menu.

At the bottom of multiselect lists, there is a `Select all` / `Deselect all` button that is differentiated by having no +/- on the right. This button will intuitively select all or deselect all. When a menu has an option selected, the right side arrow will become an x that can be clicked to clear the value.

When a field is required, it will highlight red if empty. I felt this would probably be a pretty notable feature to want to have.

Clicking on the menu will open it, then:

- For single select menus, clicking anything next will close the menu
  - If an option is clicked, the selection will be recorded then the menu will close
- For multiselect menus, clicking anything BUT a selection will close the menu
  - Since you can select multiple things, the menu will not close on option selection
