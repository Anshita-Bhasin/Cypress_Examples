# Its Set

Deep check if an identifier is defined and not null

```
npm install its-set
```

## Examples

```javascript
import itsSet from 'its-set';

itsSet('im set'); // true
itsSet(false); // true
itsSet(33); // true
itsSet({ foo: { bar: { baz: 'im set' } } }, 'foo.bar.baz'); // true

itsSet(undefined); // false
itsSet(null); // false
itsSet({ foo: { bar: {} } }, 'foo.bar.baz'); // false
itsSet({ foo: { bar: { baz: null } } }, 'foo.bar.baz'); // false
```

Or...

```javascript
const { itsSet } = require('its-set');

itsSet('im set'); // true
```
