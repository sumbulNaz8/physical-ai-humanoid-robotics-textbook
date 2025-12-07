
# Lesson 7: AI-based Object Detection with AprilTags

For a robot to interact with its environment, it needs to be able to identify objects and determine their precise position and orientation in 3D space. **AprilTags** are a type of **fiducial marker**—like a QR code for robots—that makes this task extremely robust.

The `isaac_ros_apriltag` GEM provides a GPU-accelerated node for detecting these tags and is a perfect example of an AI-powered perception module.

## What is an AprilTag?

An AprilTag is a black and white square with a unique, identifiable pattern. When a camera sees one, software can:
1.  **Identify** the tag's unique ID.
2.  **Calculate** its 3D pose (position and orientation) relative to the camera, as long as the physical size of the tag is known.

This is incredibly useful for:
-   **Localization:** If you know the locations of tags in the environment, the robot can determine its own position by seeing them.
-   **Object Interaction:** By placing a tag on an object (e.g., a charging dock, a box to be picked up), the robot knows exactly where that object is.

## The `isaac_ros_apriltag` Pipeline

This GEM takes a camera image as input and outputs the poses of all detected tags.

-   **Input:** `sensor_msgs/Image` and `sensor_msgs/CameraInfo`.
-   **Output:** `isaac_ros_apriltag_interfaces/msg/AprilTagDetectionArray`. This custom message contains a list of all detected tags, including their ID and their `geometry_msgs/PoseWithCovarianceStamped`.

Because it runs on the GPU, this node can process a high-resolution video stream in real-time with very low CPU overhead.

## Practical Activity: "Follow the Tag"

Let's build an application where the robot finds an AprilTag and turns its head to look at it.

### 1. Set up the Scene in Isaac Sim

-   In your Isaac Sim Python script, add a flat plane or a box to the scene.
-   Apply a texture to it using one of the pre-made AprilTag materials provided with Isaac Sim. You can find them in the Nucleus assets.
-   Make sure your humanoid robot has a camera attached to its "head" link.

### 2. Create a "Tag Follower" Node

This ROS 2 node will subscribe to the detection results and calculate the necessary control command.

```python
import rclpy
from rclpy.node import Node
from isaac_ros_apriltag_interfaces.msg import AprilTagDetectionArray
from std_msgs.msg import Float64

class TagFollowerNode(Node):
    def __init__(self):
        super().__init__('tag_follower')
        self.detection_sub = self.create_subscription(
            AprilTagDetectionArray,
            '/tag_detections',
            self.detection_callback,
            10)
        
        # Publisher for the head's pan joint
        self.head_pan_pub = self.create_publisher(Float64, '/head_pan_joint/command', 10)
        
        self.target_tag_id = 0 # The ID of the tag we want to follow

    def detection_callback(self, msg):
        for detection in msg.detections:
            if detection.id == self.target_tag_id:
                # The pose of the tag is relative to the camera
                # A simple P-controller to turn the head
                # If tag is to the left (positive x), turn head left (positive command)
                error = detection.pose.pose.pose.position.x
                
                # Apply a proportional gain
                command = Float64()
                command.data = error * 0.5 
                
                self.head_pan_pub.publish(command)
                self.get_logger().info(f"Tag {self.target_tag_id} found! Sending command: {command.data}")
                return
```

### 3. Launch Everything

You will need a main launch file that:
1.  Starts Isaac Sim with your scene.
2.  Starts the `isaac_ros_apriltag` node, remapping its input topic to the robot's camera topic.
3.  Starts your `tag_follower` node.

When you run this, the robot's head should automatically turn to keep the target AprilTag centered in its view. This simple application demonstrates a complete, AI-powered perception-to-control loop using a high-performance Isaac ROS GEM.
