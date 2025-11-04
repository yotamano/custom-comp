## CORE DOCUMENTATION

The Wix Component Model allows components to declare a contract between the component implementation (React, CSS) and the Wix ecosystem. This allows a react component to be editable and configurable when consumed by users. Correct application of the Wix Component Model will allow consumers of the react component to:

- Interact with the component's inner elements (selection, removal etc)
- Edit the components (or one of its elements):
  - Style
  - Props
  - etc

Every component that uses the Wix Component Model will have an "instance" of its contract with the Editor in a shape that adheres to the model.
We will refer to this contract as the "Component Manifest".
