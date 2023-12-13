# Lightning Time ⚡️

Lightning Time ⚡️ is a new way to measure time. It's a spin on hexadecimal time: the day is split into 16 parts over and over.

The first and largest unit is called a `bolt`; the others are called `zaps`, `sparks`, and `charges`.

A typical Lightning Time string looks like `8~0~0|e`, or `8~0~0` without charges.

The three major units—bolts, zaps, and sparks—are each delimited by a tilde `~`. Smaller units are delimited by a single pipe `|`. The charge is the only named unit after the pipe, but you can go down as far as you want. For example, `8~0~0|ef4` is a valid Lightning Time string.

The super fun part: **Lightning Time represents time as three colors**. The respective red, green, and blue values of each color are filled in by the four time units; the rest of the values are filled in by whatever you want!

The magic of Lightning Time: represent time with not just any 3 colors, but your favorite 3 colors! 🌈

Learn more about how Lightning Time works & play with it hands-on: https://blog.purduehackers.com/posts/lightning-time

---

This is an npm package that allows you to use Lightning Time in your own projects.

# Usage

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
  },
  parts: {
    bolts: 0,
    zaps: 1,
    sparks: 3,
    charges: e
  }
}
*/
```

## Get Parts

```javascript
lt.getParts('8~0~0|e')

/*
returns {
  bolts: '8',
  zaps: '0',
  sparks: '0',
  charges: 'e'
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
returns a Date object with time 12:00:00 PM
*/
```

```javascript
lt.convertFromLightning('8~1~a|e')

/*
returns a Date object with time 12:09:26 PM
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

## Lightning Time Clock React Hook

This package includes a React Hook for implementing a Lightning Time clock in your React app:

```javascript
import { useLightningTimeClock } from '@purduehackers/time/react'

export default function MyComponent() {
  const { lightningString, formattedNormalTime } =
    useLightningTimeClock() // Surfaces the entire Lightning Time object and an additional formattedNormalTime

  return <p>{lightningString} ({formattedNormalTime})</p>
}
```
