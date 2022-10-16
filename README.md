# Lightning Time

Lightning Time ⚡️ is a new way to measure time. At its core, it's just hexadecimal time—you split a day into 16 parts, then 16 more, then 16 more. The largest unit of Lightning Time is called a `bolt`; the smaller units (in order) are called `zaps`, `sparks`, and `charges`.

A typical Lightning Time string looks like this: `8~0~0` (12:00 pm), where 8 is the bolt, the first 0 is the zap, and the second 0 is the spark. Charges and smaller units are delimited by one pipe; for example, 12:00pm and 13 seconds is represented as `8~0~0|a`. Further units are not delimeted by anything (example: `8~0~0|af`).

Each of the three major units of Lightning Time are also their own colors. The hexadecimal string is padded with a 0 (example: `8~0~0` is secretly `80~00~00`), and the empty space within each unit is filled in by the remaining parts of a color. This package provides the set of colors that Purdue Hackers uses by default, but you can customize it with whatever colors you want.

The magic of Lightning Time: represent time with not just any 3 colors, but your favorite 3 colors! 🌈

---

This is a highly experimental package and is not currently recommended for production use. Massive breaking changes will be made in the coming days and weeks.

# How to use this library

```javascript
import { LightningTime } from '@purduehackers/time'

const lt = new LightningTime()
```

## Colors

By default, Lightning Time colors are set to the following:

```
bolt: (dynamic value), 161, 0
zap: 50, (dynamic value), 214
spark: 246, 133, (dynamic value)
```

If you want to change the static colors, you can do so by initializing a Lightning Time object like this:

```javascript
const lt = new LightningTime({
  staticBoltColors: [num1, num2],
  staticZapColors: [num1, num2],
  staticSparkColors: [num1, num2]
})
```

Where `num1` and `num2` are RGB values, from 0-255.

Example:

```javascript
const lt = new LightningTime({
  staticBoltColors: [120, 240],
  staticZapColors: [130, 130],
  staticSparkColors: [50, 206]
})
```

You don't have to set a custom value for every unit, though. Example:

```javascript
const lt = new LightningTime({
  staticSparkColors: [50, 206]
})
```

You can also set colors after initializing a Lightning Time object like this:

```javascript
lt.setStaticColors({
  staticBoltColors: [120, 240],
  staticZapColors: [130, 130],
  staticSparkColors: [50, 206]
})
```

## Convert a Date to Lightning Time

```javascript
lt.convertToLightning(new Date())

/*
Assumes it's currently 12:07 AM

returns {
  lightningString: '0~1~3|e'
  strippedCharges: '0~1~3',
  colors: {
    boltColor: '#01a100',
    zapColor: '#3213d6',
    sparkColor: '#f6853e'
  }
}
*/
```

## Strip Charges

```javascript
lt.stripCharges('8~0~0|e')

/*
Returns '8~0~0'
*/
```

## Convert a Lightning Time string to a traditional time string

```javascript
lt.convertFromLightning('lightning time string')
```

Examples:

```javascript
lt.convertFromLightning('8~0~0')

/*
returns {
  withSeconds: '12:00:00 PM',
  withoutSeconds: '12:00 PM'
}
*/
```

```javascript
lt.convertFromLightning('8~1~a|e')

/*
returns {
  withSeconds: '12:09:26 PM',
  withoutSeconds: '12:09 PM'
}
*/
```

## Get Colors for a Lightning Time string

```javascript
lt.getColors('8~0~0')

/*
Assuming `lt` was initialized with default colors
returns {
  boltColor: '#80a100',
  zapColor: '#3200d6',
  sparkColor: '#f68500'
}
*/
```

```javascript
lt.getColors('8~1~a|e')
/*
Assuming `lt` was initialized with default colors
returns {
  boltColor: '#81a100',
  zapColor: '#321ad6',
  sparkColor: '#f685ae'
}
*/
```
