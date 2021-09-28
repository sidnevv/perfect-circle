## Description
Program for drawing colorful circles of perfect share
## Realization
The principle of the program is based on the construction of a convex hull around the points entered by the user while drawing.
After the shell is obtained, its radius is found, in the center of which a circle is drawn with a radius equal to
half the diameter of the shell.

Andrew's monotone chain convex hull algorithm is used to construct the convex hull, the computational complexity is
which is O (n log n) and is sufficient for constructing circles even on the basis of very complex figures introduced
user. The complexity of finding the shell diameter is O (n), so the total complexity of the algorithm is O (n log n).

The code for building the wrapper and finding the diameter is taken [from here](https://code.activestate.com/recipes/117225/) and ported from Python to Javascript

## Demo
[demo](https://sidnevv.github.io/perfect-circle/)
