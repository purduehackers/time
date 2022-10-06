# @purduehackers/time

Lightning Time ⚡️ is a new way to measure time. At its core, it's just hexadecimal time—you split a day into 16 parts, then 16 more, then 16 more. The largest unit of Lightning Time is called a `bolt`; the smaller units (in order) are called `zaps`, `sparks`, and `charges`.

A typical Lightning Time string looks like this: `8~0~0` (12:00 pm), where 8 is the bolt, the first 0 is the zap, and the second 0 is the spark. Charges and smaller units are delimited by one pipe; for example, 12:00pm and 13 seconds is represented as `8~0~0|a`. Further units are not delimeted by anything (example: `8~0~0|af`).

Each of the three major units of Lightning Time are also their own colors. The hexadecimal string is padded with a 0 (example: `8~0~0` is secretly `80~00~00`), and the empty space within each unit is filled in by the remaining parts of a color. This package provides the set of colors that Purdue Hackers uses by default, but ~you can~ you'll soon be able to customize it with whatever colors you want.

The magic of Lightning Time: represent time with not just any 3 colors, but your favorite 3 colors! 🌈

## This package

This is a highly experimental package and is not currently recommended for production use. Massive breaking changes will be made in the coming days and weeks.
