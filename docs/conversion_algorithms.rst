1. Different units, and coordinates systems
*******************************************

Currently, the bot uses multiple coordinates system, and multiple units for each system.

1.1. Coordinate systems
========================

The two systems used rely on an orthogonal set. ``x`` represents the horizontal axis, and ``y`` the vertical axis. Let's consider this configuration (Conf. 1) :

.. image:: http://i.imgur.com/REyG3an.png)

1.1.1. Cartesian coordinates
----------------------------

These are the most used. As in traditional maths, they are represented by to numbers, each representing the position on an axis. They are represented as ``(x, y)``. ``x`` for the horizontal axis, and ``y`` for the vertical one.

In Link Conf 1 <http://i.imgur.com/REyG3an.png>, we have the following coordinates :
* ``A(2, 3)``
* ``B(-3, 1)``

1.1.2 Polar coordinates
-----------------------

Less used (and also less popular), these are used to avoid things inside certain angles. They are represented as a number and an angle. They look like this : :math:`(r, \theta)`, where :math:`r` is the distance from the origin, and :math:`\theta` is the angle, in radians, at which the point is, starting at the horizontal axis.

**Important notes** :
* In the game, the angles are reversed, they go clockwise. *i.e* positive angles are under the ``x`` axis, and negative ones are above.
* We only use angles up to :math:``\pi`` radians (:math:``180°``). That means we use negative angles to access the other side of a circle.

The coordinate system looks like this :

.. image:: http://i.imgur.com/LFEHUSe.png
   :height: 300px
   :width: 300px

In Link Conf 1 <http://i.imgur.com/REyG3an.png>, we have the following coordinates :
* ``A(3.60555, 56.30993°)``
* ``B(3.16228, 161.56505°)``

The above coordinates are approximative.

In the bot, every polar coordinate is converted from cartesian coordinates. Also, we don't use the :math:``r`` value, only the angle is important. That helps reducing computing expensiveness. Please refer to the conversion section below.
