# preact-shadow-root

A tiny `<Shadow>` component that renders its children into the Shadow DOM.

🔥 [**JSFiddle Demo**](https://jsfiddle.net/developit/rw72nx24/)

### Usage

```js
import Shadow from 'preact-shadow-root'

const Demo = () => (
  <div class="foo">
    <Shadow>
      <div class="foo">
        I am rendered into the Shadow DOM.
        <style>{`
          .foo {
            border: 2px solid red;
          }
        `}</style>
      </div>
    </Shadow>
  </div>
)
```

In the above demo, only the `<div class="foo">` within `<Shadow>` will be given a red border.

---

### License

[MIT License](https://oss.ninja/mit/developit) © [Jason Miller](https://jasonformat.com)
