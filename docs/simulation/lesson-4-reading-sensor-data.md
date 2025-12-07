
# Lesson 4: Subscribing to Sensor Data

Once your simulated robot is publishing sensor data, the next step is to use that data in your ROS 2 nodes to enable perception and control. This involves subscribing to the correct topics and understanding the message types.

## Common Sensor Message Types

- **IMU:** `sensor_msgs/msg/Imu`
  - `orientation`: A `geometry_msgs/Quaternion` describing the sensor's orientation.
  - `angular_velocity`: A `geometry_msgs/Vector3`.
  - `linear_acceleration`: A `geometry_msgs/Vector3`.
- **LiDAR:** `sensor_msgs/msg/PointCloud2`
  - A complex and highly efficient binary format for representing a 3D point cloud. It's not human-readable directly and requires a special library to parse.
- **Depth Camera:** `sensor_msgs/msg/Image`
  - Similar to a regular camera image, but the value of each pixel represents distance instead of color.

## Visualizing Sensor Data in RViz2

Before you write any code, the best first step is always to visualize the data in RViz2 to confirm everything is working.

1.  **Launch your robot simulation** in Gazebo.
2.  **Launch RViz2** (`ros2 run rviz2 rviz2`).
3.  **Set the Fixed Frame** to your robot's base link (e.g., `base_link` or `world`).
4.  **Add displays for each sensor:**
    - For the **LiDAR**, add a `PointCloud2` display and set its topic to the one you configured (e.g., `/demo/points`).
    - For the **Depth Camera**, add an `Image` display and set its topic (e.g., `/demo/depth/image_raw`).
    - The **IMU** data is not directly visualizable as a shape, but you can see its TF frame if you add a `TF` display.

You should see a 3D point cloud from the LiDAR and a grayscale image from the depth camera, where darker pixels are closer.

## Practical Activity: A Sensor Subscriber Node

Let's write a single ROS 2 node that subscribes to all three sensor topics.

1.  **Create a new Python file** in your package, e.g., `sensor_subscriber.py`.
2.  **Add the following code:**

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Imu, PointCloud2, Image
# You might need a helper library to parse PointCloud2
# For now, we will just log that we received it.

class SensorSubscriberNode(Node):
    def __init__(self):
        super().__init__('sensor_subscriber')
        self.imu_sub = self.create_subscription(
            Imu,
            '/demo/imu',
            self.imu_callback,
            10)
        self.lidar_sub = self.create_subscription(
            PointCloud2,
            '/demo/points',
            self.lidar_callback,
            10)
        self.depth_sub = self.create_subscription(
            Image,
            '/demo/depth/image_raw',
            self.depth_callback,
            10)
        self.get_logger().info('Sensor subscriber node started')

    def imu_callback(self, msg):
        # We can access orientation, angular_velocity, etc.
        self.get_logger().info(f'IMU Orientation: w={msg.orientation.w:.2f}')

    def lidar_callback(self, msg):
        # PointCloud2 messages have height, width, and a binary data blob
        # Parsing this data is complex and is often done with a library
        # like ros2_numpy or pcl_utils.
        self.get_logger().info(f'Received PointCloud2 data of size: {len(msg.data)}')

    def depth_callback(self, msg):
        # The encoding (e.g., '16UC1') tells you how to interpret the data
        self.get_logger().info(f'Received depth image of size {msg.width}x{msg.height}')

def main(args=None):
    rclpy.init(args=args)
    node = SensorSubscriberNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```
3.  **Add the node to your `setup.py`**, build your workspace, and run it.

While your Gazebo simulation is running, this node will print messages confirming that it is receiving data from all three sensors, demonstrating that your robot's perception system is fully integrated and publishing data via ROS 2.
