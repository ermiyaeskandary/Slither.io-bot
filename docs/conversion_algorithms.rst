.. highlight:: javascript

2. Different units, and coordinates systems
*******************************************

Currently, the bot uses multiple coordinates system, and multiple units for each system.

2.1 Coordinate systems
========================

The two systems used rely on an orthogonal set. ``x`` represents the horizontal axis, and ``y`` the vertical axis. Let's consider this configuration (Conf. 1) :

.. image:: http://i.imgur.com/REyG3an.png)

2.1.1 Cartesian coordinates
----------------------------

These are the most used. As in traditional maths, they are represented by to numbers, each representing the position on an axis. They are represented as ``(x, y)``. ``x`` for the horizontal axis, and ``y`` for the vertical one.

In `Conf 1 <http://i.imgur.com/REyG3an.png>`_, we have the following coordinates :

* ``A(2, 3)``
* ``B(-3, 1)``

2.1.2 Polar coordinates
-----------------------

Less used (and also less popular), these are used to avoid things inside certain angles. They are represented as a number and an angle. They look like this : :math:`(r, \theta)`, where :math:`r` is the distance from the origin, and :math:`\theta` is the angle, in radians, at which the point is, starting at the horizontal axis.

**Important notes** :

* In the game, the angles are reversed, they go clockwise. *i.e* positive angles are under the ``x`` axis, and negative ones are above.
* We only use angles up to :math:`\pi` radians (:math:`180°`). That means we use negative angles to access the other side of a circle.

The coordinate system looks like this :

.. image:: http://i.imgur.com/LFEHUSe.png
   :height: 600px
   :width: 600px

In `Conf 1 <http://i.imgur.com/REyG3an.png>`_, we have the following coordinates :

* ``A(3.60555, 56.30993°)``
* ``B(3.16228, 161.56505°)``

The above coordinates are approximative.

In the bot, every polar coordinate is converted from cartesian coordinates. Also, we don't use the :math:`r` value, only the angle is important. That helps reducing computing expensiveness. Please refer to the conversion section below.

.. _different-units-section:

2.2 Different units
===================

There are three main units used for the game. Some of them subdivide into others, but overall, we have three units.

2.2.1 Screen unit
-----------------

This is the unit used by the game for mouse input. Basically, they are cartesian coordinates, relative to the browther window. The origin can either be at the top left corner, starting at :math:`(0, 0)`, or the center of the window.

.. note:: If the origin is the center, then the unit is called **Mouse unit**.

.. _canvas-units-section:

2.2.2 Canvas unit
-----------------

This is the unit used by the canvas to draw every elements. As before, cartesian coordinates, origin is the top left corner or the canvas center, but the canvas element doesn't start at screen unit :math:`(0, 0)`. Instead, there is an offset relative to window size. Also, the canvas size has not much to do with window size.

On initialization, an array containing the ratio between the canvas size and the window size is created. This ratio is stored inside ``canvasRatio[]``, which is defined as follows ::

    var canvasRatio = [window.mc.width / window.ww, window.mc.height /
        window.hh
    ]

As you can see, the ratio is the width/height of the canvas (the canvas element is ``window.mc``) divided by the width/height of the screen ( ``window.ww`` or ``window.hh``).

2.2.3 Game/Map unit
---------------

This is the unit used by the game, and which is present in every objects. It's origin is the top left corner, or, as the previous units, the snake's head position (center of the screen).

2.3 Conversion
==============

Every part will have a title in the form ``Starting unit -> Result unit``

.. _screen-to-canvas:

2.3.1 Screen unit -> Canvas unit
--------------------------------

The function used for this conversion is this one::

    // Convert screen coordinates to canvas coordinates.
    screenToCanvas: function(point) {
       var canvasX = window.csc * (point.x * canvas.canvasRatio[0]) - parseInt(window.mc.style.left);
       var canvasY = window.csc * (point.y * canvas.canvasRatio[1]) - parseInt(window.mc.style.top);
       return {
           x: canvasX,
           y: canvasY
       };
    }

It takes a object as argument, which contain a value ``x`` and a value ``y``, given in screen unit. Both are positive integers. The object can be defined as follows::

    var point = {
       x: 100,
       y: 200
    }

The conversion process may seem complicated, but it is quite simple.
Firstly, we multiply the point coordinates and the ratio defined at initialization. (Cf. :ref:`canvas-units-section`)::

    point.x * canvas.canvasRatio[0]

Then we multiply the result by the canvas scale variable `window.csc <http://slitherio-bot.readthedocs.io/en/docs/game-variables.html>`_::

    window.csc * (point.x * canvas.canvasRatio[0])

But, as stated in :ref:`canvas-units-section`, there is an offset between the canvas and the screen. We solve this issue by taking it away from the result. However, this offset is defined as a String, thus we need to convert it to an integer. The final result looks like::

    window.csc * (point.x * canvas.canvasRatio[0]) - parseInt(window.mc.style.left);

2.3.2 Mouse unit -> Screen unit
-------------------------------

This is the function used for conversion::

    // Convert snake-relative coordinates to absolute screen coordinates.
    mouseToScreen: function(point) {
        var screenX = point.x + (window.ww / 2);
        var screenY = point.y + (window.hh / 2);
        return {
            x: screenX,
            y: screenY
        };
    }

It takes a object as argument, which contain a value ``x`` and a value ``y``, given in mouse unit. As for :ref:`screen-to-canvas`, the object can be defined as follows::

    var point = {
       x: -100,
       y: 150
    }

.. note:: ``x`` and ``y`` can be negative, if they are on the left part of the screen, because the origin is the center.

The conversion algorithm is simple, take the mouse coordinates, and add the coordinates of the screen's center.

2.3.3 Game unit -> Mouse unit
-------------------------------

The map unit -> mouse unit is made using this function::

    // Convert map coordinates to mouse coordinates.
    mapToMouse: function(point) {
        var mouseX = (point.x - window.snake.xx) * window.gsc;
        var mouseY = (point.y - window.snake.yy) * window.gsc;
        return {
            x: mouseX,
            y: mouseY
        };
    },

Both game unit and mouse unit share the same norm, thus don't need any coordinates scale. Only the general scale variable `window.gsc <http://slitherio-bot.readthedocs.io/en/docs/game-variables.html>`_ is needed to apply zoom.

The game unit is just mouse unit shifted. The origin is the top left corner (of the map), so we just need to take the player's coordinates away from the given coordinates. Then we multiply by the `general scale <http://slitherio-bot.readthedocs.io/en/docs/game-variables.html>`_.


2.3.4 Game unit -> Canvas unit
------------------------------

This function is just a shorthand, using all of the above coordinates conversion, respectively ``Game unit -> Mouse unit``, ``Mouse unit -> Screen unit``, and ``Screen unit -> Canvas unit`` ::

    // Map cordinates to Canvas cordinate shortcut
    mapToCanvas: function(point) {
        var c = canvas.mapToMouse(point);
        c = canvas.mouseToScreen(c);
        c = canvas.screenToCanvas(c);
        return c;
    }
