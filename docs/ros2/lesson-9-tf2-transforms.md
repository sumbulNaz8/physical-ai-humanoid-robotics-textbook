
# Lesson 9: Coordinate Transformations with TF2

In robotics, you are constantly dealing with multiple coordinate frames: the world frame, the robot's base frame, the end-effector frame, the camera frame, etc. **TF2** is the ROS 2 library that manages these coordinate frames and allows you to seamlessly transform data between them.

## Why is TF2 Necessary?

Imagine a humanoid robot with a camera in its head looking at a ball. The camera reports the ball's position as `(x, y, z)` in the `camera_frame`. To pick up the ball, the robot's arm needs to know the ball's position relative to its own `hand_frame` or `base_frame`. TF2 allows you to ask the question: "What is the position of the ball in the `base_frame`?"

TF2 maintains a tree of coordinate frames and their relationships over time.

## Key Components of TF2

- **Transform Broadcaster:** A node that publishes the relationship between two coordinate frames. For example, `robot_state_publisher` is a transform broadcaster that publishes the transforms between all the links of a robot based on the URDF and joint states.
- **Transform Listener:** A node that listens to all broadcasted transforms and caches them. It provides an API to request transforms between any two frames at a specific time.

## Broadcasting a Transform

Here's how you might broadcast a static transform, for example, the position of a fixed camera relative to the world.

```python
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import TransformStamped
from tf2_ros.static_transform_broadcaster import StaticTransformBroadcaster

class StaticFramePublisher(Node):
    def __init__(self):
        super().__init__('static_frame_publisher')
        self.tf_static_broadcaster = StaticTransformBroadcaster(self)

        t = TransformStamped()
        t.header.stamp = self.get_clock().now().to_msg()
        t.header.frame_id = 'world'
        t.child_frame_id = 'camera_frame'
        t.transform.translation.x = 1.0
        t.transform.translation.y = 0.5
        t.transform.translation.z = 0.75
        # No rotation in this example
        t.transform.rotation.x = 0.0
        t.transform.rotation.y = 0.0
        t.transform.rotation.z = 0.0
        t.transform.rotation.w = 1.0

        self.tf_static_broadcaster.sendTransform(t)
```

## Listening for a Transform

Now, let's create a node that looks up the transform between two frames.

```python
import rclpy
from rclpy.node import Node
from tf2_ros.buffer import Buffer
from tf2_ros.transform_listener import TransformListener

class FrameListener(Node):
    def __init__(self):
        super().__init__('frame_listener')
        self.tf_buffer = Buffer()
        self.tf_listener = TransformListener(self.tf_buffer, self)

        # Timer to periodically look up the transform
        self.timer = self.create_timer(1.0, self.timer_callback)

    def timer_callback(self):
        try:
            trans = self.tf_buffer.lookup_transform(
                'base_link',  # Target frame
                'end_effector_link',  # Source frame
                rclpy.time.Time())
            self.get_logger().info(f'Transform is: {trans.transform.translation}')
        except Exception as e:
            self.get_logger().info(f'Could not transform: {e}')
```
This node tries to find the transform from the `end_effector_link` to the `base_link` every second.

## Using TF2 in Practice

You almost never have to broadcast link transforms manually. `robot_state_publisher` does it for you. Your main job will be to use a `TransformListener` to get the transforms you need to make sense of your sensor data and control your robot.

For example, to make a robot arm touch a point seen by a camera, you would:
1.  Get the point's coordinates in the `camera_frame`.
2.  Use `tf_buffer.transform()` to convert those coordinates to the `base_link` frame.
3.  Use inverse kinematics to calculate the joint angles needed to move the end-effector to that position in the `base_link` frame.

TF2 is a critical, powerful tool that makes complex robotics tasks manageable.
