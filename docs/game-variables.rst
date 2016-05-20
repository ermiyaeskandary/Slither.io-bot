1. Game variables
*****************

.. note:: All the variable names (currently) mean something. For example, ``gsc`` means general scale, ``playing`` is literal, etc...

.. warning:: All the variable below are global, and should be accessed using ``window.<variable name>``

1.1 Scale variables
===================

1.1.1 ``gsc`` - Number
----------------------

The general scale variable. It is used to zoom in and out of the game, and to scale the game according to the player's size.
It defaults at :math:`0.9`.

1.1.2 ``csc`` - Number
----------------------

This is the scale variable used by the canvas, to convert screen coordinates to canvas ones. It doesn't have any default value.

1.2 State variables
===================

1.2.1 ``playing`` - Boolean
---------------------------

This variable tells wether the game has started or not.

1.3 Game elements, content variables
====================================

The title may not be clear, but these are variables containing a list of snakes, etc..., with game unit.

.. glossary::
    Game unit
        One of the units used by the bot. Please refer to :ref:`different-units-section`.

1.3.1 ``snake`` - Object
------------------------

This is the object corresponding to the player's snake. It contains a lot of useful informations (angle, coordinates, length, width, etc...).

.. note:: Its value is ``undefined`` if the game did not start yet.

1.3.1.1 ``snake.xx`` and ``snake.yy`` - Number
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

They are the coordinates of the snake, in Game unit.

1.3.1.2 ``snake.ang`` - Number
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This is the angle, *in radians*, at which the snake is going. It goes from :math:`0` to :math:`2\pi`.

1.3.1.3 ``snake.nk`` - String
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The nickname you choose on login screen. In case you forget...

1.3.2 ``snakes`` - Array of objects
-----------------------------------

This is an array containing every snakes, including yours. The content of each object is almost the same as in the ``snake`` object.
It may contain null or undefined objects.

.. note:: ``snakes[index].pts`` contains every components of the snake.

1.3.3 ``foods`` - Array of objects
----------------------------------

An array containing the foods objects. each object has multiple keys:

1.3.3.1 ``foods[index].xx`` and ``foods[index].yy`` - Number
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In game unit, position of each food coordinate.

.. glossary::
    index
        Arbitrary or generated number to access the (n+1)th element of an array. For example, an index of 5 would access the sixth element of an array.

1.3.3.2 ``foods[index].sz`` - Number
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Size of the food. Each food has a different size. This value can be used to sort foods according to their size.

1.3.4 ``preys`` - Array of objects
----------------------------------

Contains every objects corresponding to a prey. Every object contains the coordinate of the prey under the keys ``xx`` and ``yy``.

.. glossary::
    preys
        Moving foods, that are ways better and make you grow much more.

1.4 Visual variables
====================

Variables containing visual things.

1.4.1 ``mc`` -  canvas
----------------------

This is the game canvas. It is not a modified DOM object, it is a classic canvas.

.. note:: You can get the canvas' context with ``mc.getContext('2d');``

1.4.2 ``ww`` and ``hh`` - Number
--------------------------------

They are the window size. They are dynamic read-only values.

1.4.3 ``xm`` and ``ym`` - Number
--------------------------------

They stand for 'x mouse' and 'y mouse' respectively. They are used to control the snake.

.. note:: It should be in mouse coordinates. Please refer to :ref:`different-units-section`


1.4 Table List of Snake Variables
====================

| snake variable | description | sample value
ang | snake movement direction in radian angles | 3.80427235395639
antenna | snake has antenna attachment | false
bb | unknown | 88
cfl | unknown | 2.200983084710446
chl | unknown | 0.2513932980841713
cs | unknown | "#4cc558"
cs04 | unknown | "#1e4f23"
csw | unknown | "#a6e2ac"
cv | unknown | 25
dead_amt | unknown | 0
dir | unknown | 2
eang | unknown | -2.45977989936525
ebi | unknown | canvas
ebih | unknown | 64
ebisz | unknown | 29
ebiw | unknown | 64
ec | unknown | "#ffffff"
eca | unknown | 0.75
edir | unknown | 0
ehang | unknown | -2.4069983290795416
ehl | unknown | 0
epi | unknown | canvas
epih | unknown | 48
episz | unknown | 14
epiw | unknown | 48
er | unknown | 6
fa | unknown | -1.067937970161438
fam | unknown | 0.9483512609214342
fapos | unknown | 13
fas | unknown | Float32Array[26]
fatg | unknown | 26
fchl | unknown | -19.11222267150879
fchls | unknown | Float32Array[43]
fl | unknown | -0.7409875988960266
flpos | unknown | 80
fls | unknown | Float32Array[128]
fltg | unknown | 128
fnfr | unknown | 16
fpos | unknown | 37
fsp | unknown | 5.89
ftg | unknown | 43
fx | unknown | 465.51165771484375
fxs | unknown | Float32Array[43]
fy | unknown | 128.0072784423828
fys | unknown | Float32Array[43]
gg | unknown | 197
id | unknown | 12010
iiv | unknown | true
lnp | unknown | Object
md | unknown | false
msl | unknown | 42
msp | unknown | 14
na | unknown | 1
nk | unknown | "Joe the A* bot"
one_eye | unknown | true
pma | unknown | 4
ppa | unknown | 1
ppc | unknown | "#000000"
pr | unknown | 3.5
pts | unknown | Array[74]
rbcs | unknown | Array[1]
rcv | unknown | 27
rex | unknown | -3.105726378330564
rey | unknown | -2.520806153384611
rr | unknown | 76
sc | unknown | 1
scang | unknown | 1
sct | unknown | 2
sep | unknown | 6
sfr | unknown | 0
sp | unknown | 5.777777777777778
spang | unknown | 1
ssp | unknown | 5.79
swell | unknown | 0.06
tl | unknown | 2.9483512609214344
tsp | unknown | 5.777777777777778
wang | unknown | 3.80427235395639
wehang | unknown | -2.4069983290795416
wmd | unknown | false
wsep | unknown | 6
xx | unknown | 28126.676229644094
yy | unknown | 25778.50406585705
