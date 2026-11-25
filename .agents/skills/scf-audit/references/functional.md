# Functional Core Reference (`references/functional.md`)

**Plain Meaning:** *"Hisaab-kitab wale functions aise banana ki same input par hamesha 100% same output aaye aur koi hidden side-effect na ho."* (Google search: `"functional core imperative shell"`)

## Core Rules
1. **Pure Calculation Functions:** Tax, gold value, discount, and round-off helpers take plain integer/BigInt inputs and return new immutable result objects — zero DB calls or global state mutations inside math functions.
2. **Imperative Shell:** API handlers and DB repositories handle I/O (reading rates, saving rows inside ACID transactions) and pass data into the pure functional core.
3. **Easy Financial Testing:** Pure functions let `/scf-test` run 50+ boundary and rounding test cases instantly without spinning up a browser.
