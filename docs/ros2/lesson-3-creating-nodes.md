
# Lesson 3: Creating Your First ROS 2 Nodes

In this lesson, we will write a simple publisher and subscriber in Python to demonstrate the core communication mechanism in ROS 2.

## The Publisher Node

A publisher is a node that sends out data to a topic. Let's create a node that publishes a "Hello, World!" message every second.

1.  **Open the file** `my_robot_pkg/my_robot_pkg/my_first_node.py` that was created in the previous lesson.
2.  **Replace the content** with the following publisher code:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class SimplePublisher(Node):
    def __init__(self):
        super().__init__('simple_publisher')
        self.publisher_ = self.create_publisher(String, 'chatter', 10)
        self.timer = self.create_timer(1.0, self.timer_callback)
        self.get_logger().info('Publisher is ready.')

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello, ROS 2 World!'
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)

def main(args=None):
    rclpy.init(args=args)
    simple_publisher = SimplePublisher()
    rclpy.spin(simple_publisher)
    simple_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```
- We import the necessary libraries. `std_msgs.msg.String` is a standard message type for sending text.
- `create_publisher` creates a publisher that sends `String` messages on the `chatter` topic.
- `create_timer` sets up a callback to be called every 1 second.
- In `timer_callback`, we create a `String` message, fill it with data, and publish it.

## The Subscriber Node

A subscriber is a node that receives data from a topic.

1.  **Create a new file** in the same directory called `my_subscriber_node.py`.
2.  **Add the following code:**

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class SimpleSubscriber(Node):
    def __init__(self):
        super().__init__('simple_subscriber')
        self.subscription = self.create_subscription(
            String,
            'chatter',
            self.listener_callback,
            10)
        self.get_logger().info('Subscriber is ready.')

    def listener_callback(self, msg):
        self.get_logger().info('I heard: "%s"' % msg.data)

def main(args=None):
    rclpy.init(args=args)
    simple_subscriber = SimpleSubscriber()
    rclpy.spin(simple_subscriber)
    simple_subscriber.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```
- `create_subscription` creates a subscriber that listens for `String` messages on the `chatter` topic.
- `listener_callback` is the function that gets called every time a message is received.

## Updating `setup.py`

To make ROS 2 aware of our new subscriber node, we need to add it to the `entry_points` in the `setup.py` file of our package.

Open `my_robot_pkg/setup.py` and add the new node to the `console_scripts` list:
```python
'console_scripts': [
    'simple_publisher = my_robot_pkg.my_first_node:main',
    'simple_subscriber = my_robot_pkg.my_subscriber_node:main',
],
```

## Running the Nodes

1.  **Build the package:**
    ```bash
    cd ~/ros2_ws
    colcon build
    ```
2.  **Run the publisher** in one terminal:
    ```bash
    source install/setup.bash
    ros2 run my_robot_pkg simple_publisher
    ```
3.  **Run the subscriber** in another terminal:
    ```bash
    source install/setup.bash
    ros2 run my_robot_pkg simple_subscriber
    ```

You should see the publisher sending messages and the subscriber receiving them. This is the foundation of communication in ROS 2.
