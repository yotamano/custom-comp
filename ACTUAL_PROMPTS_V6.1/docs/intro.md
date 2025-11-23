Editor React Components

---

The Editor React Component is a new way to add `React` components to the Wix editors and site.

The new component standardizes behavior of the component in Wix Editors allowing experiences that are natively supplied by Wix for users. It allows any component to benefit from the panels and controls we have created for editing the site and give the user the same "look and feel" as if the component was suppplied by Wix.

The model also defines a standard way to store `data` and `style` data for the component. We are aligning with our server standards for data types and CSS standards for style data.

The model is geared towards component developers, application developers and Automated tooling.  
This model tries to stay close to the `React` model and native CSS model as much as possible.

The main parts of the component model:

1. [`installation`](installation.md) - definition of what happens when the app is installed or the component is added to the Editor stage
2. [`editorElement`](editorElement.md) - behaviors and configurations for on stage in the editor

Here is a very simple descriptor of a button component:

```json
{
  "type": "ItaisUI.button",
  "description": "A customizable button",
  "editorElement": {
    "data": {
      "label": {
        "dataType": "text",
        "text": {
          "maxLength": 40
        }
      }
    }
  }
}
```

## Model Base

These are all the keys at the root of the component.

| Key           | Type                                      | Values                                                                                | More Info                                   |
| ------------- | ----------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------- |
| type          | String                                    | The type of component to present in the Page tree, will be prefixed with `AppSlug`    | This is the name of the component           |
| description   | String                                    | A description of the component by the developer with some basic use cases.            | This is useful for users and AI tools       |
| editorElement | [Editor Element Object](editorElement.md) | An object describing the component and it's integration with the editor               | This enables most native editor experiences |
| installation  | [Installation Object](installation.md)    | Defines what happens when the component is added to the stage or the app is installed | Optional                                    |
