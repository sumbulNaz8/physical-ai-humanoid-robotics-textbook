
# Lesson 4: Defining Custom Interfaces

While ROS 2 provides a rich set of standard message types, you will often need to define your own data structures for your specific application. This is done through custom interfaces.

There are three types of custom interfaces:
- **Messages (`.msg`):** For sending data via topics.
- **Services (`.srv`):** For request/response communication.
- **Actions (`.action`):** For long-running, feedback-providing tasks.

## Creating a Custom Message

Let's create a custom message to represent a sensor reading.

1.  **Create a `msg` directory** inside your package `my_robot_pkg`:
    ```bash
    mkdir my_robot_pkg/msg
    ```

2.  **Create a new file** `my_robot_pkg/msg/SensorData.msg`:
    ```
    # This is a custom message for sensor data
    std_msgs/Header header
    float64 value
    ```
    - The first line is a comment.
    - `std_msgs/Header header`: This includes a standard header with a timestamp and frame ID, which is a good practice.
    - `float64 value`: This is the sensor reading.

## Modifying `CMakeLists.txt` and `package.xml`

To make ROS 2 aware of our new message type, we need to modify our build configuration.

1.  **Edit `package.xml`:**
    Add the following lines to ensure the necessary dependencies are met:
    ```xml
    <build_depend>rosidl_default_generators</build_depend>
    <exec_depend>rosidl_default_runtime</exec_depend>
    <member_of_group>rosidl_interface_packages</member_of_group>
    ```

2.  **Edit `CMakeLists.txt` (if you were using C++, for Python this is different)**
    For Python packages, this process is simpler, but if you were using C++, you would need to add:
    ```cmake
    find_package(rosidl_default_generators REQUIRED)

    rosidl_generate_interfaces(${PROJECT_NAME}
      "msg/SensorData.msg"
    )
    ```

For **Python packages**, you need to make sure you have the following in your `package.xml`:
```xml
<build_depend>rosidl_default_generators</build_depend>
<exec_depend>rosidl_default_runtime</exec_depend>
<member_of_group>rosidl_interface_packages</member_of_group>
```

And in your `setup.py` you don't need to do anything special, `colcon` will find the `.msg` files.

## Using the Custom Message

Now you can use this message in your Python nodes.

```python
# Import the new message type
from my_robot_pkg.msg import SensorData

# ... in your publisher
msg = SensorData()
msg.header.stamp = self.get_clock().now().to_msg()
msg.value = 123.45
self.publisher_.publish(msg)

# ... in your subscriber callback
def listener_callback(self, msg):
    self.get_logger().info('I heard value: "%f"' % msg.value)
```

## Building and Using

After adding the new message file and updating the package files, you need to rebuild the workspace:
```bash
cd ~/ros2_ws
colcon build
```
Now your nodes can import and use the `SensorData` message. This allows you to create structured, application-specific data types.
