# Week 1 reflection
1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
Imperative (plain JS) is giving step-by-step DOM instructions manually. Declarative (React) is just describing what you want on screen and letting React handle updating the DOM.

2. Why must a component name start with a capital letter?
So React knows it’s a custom component. Lowercase tags (<div>, <button>) are read as standard HTML elements.

3. What does a fragment <>...</> do, and why not just use a <div>?
Fragments group elements without adding extra HTML tags to the actual page. Using a <div> instead can mess up CSS layouts.

4. Name one benefit of splitting the UI into small components.
Reusability. The same component can be used in multiple places without rewriting code, and it makes finding bugs way easier.
