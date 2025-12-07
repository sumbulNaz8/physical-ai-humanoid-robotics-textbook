
# Lesson 6: Managing Complex Applications with Launch Files

As your robotics application grows, starting each node manually in a separate terminal becomes tedious and error-prone. ROS 2 launch files solve this problem by allowing you to define a whole system of nodes to be run with a single command.

Launch files in ROS 2 are written in Python, which makes them incredibly powerful and flexible.

## Creating a Simple Launch File

1.  **Create a `launch` directory** inside your package `my_robot_pkg`:
    ```bash
    mkdir my_robot_pkg/launch
    ```

2.  **Create a new file** `my_robot_pkg/launch/my_system.launch.py`:

```python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='my_robot_pkg',
            executable='simple_publisher',
            name='my_publisher'
        ),
        Node(
            package='my_robot_pkg',
            executable='simple_subscriber',
            name='my_subscriber'
        ),
    ])
```
- We import the necessary modules.
- `generate_launch_description()` is the main function that ROS 2 looks for.
- We create a `LaunchDescription` and add two `Node` actions to it.
- Each `Node` action specifies the package, the executable (from your `setup.py`), and a unique name for the node.

## Installing the Launch File

To make the launch file available, you need to tell `colcon` to install it.

**Edit `setup.py`:**
Add the following `import` at the top of the file:
```python
import os
from glob import glob
```
And then add the `data_files` section to the `setup` function:
```python
data_files=[
    ('share/ament_index/resource_index/packages',
        ['resource/' + package_name]),
    ('share/' + package_name, ['package.xml']),
    # Include all launch files.
    (os.path.join('share', package_name, 'launch'), glob(os.path.join('launch', '*launch.[pxy][yma]*'))),
],
```
This tells `colcon` to find all launch files in the `launch` directory and install them to the `share` directory of the package.

## Running the Launch File

1.  **Build your workspace** to install the launch file:
    ```bash
    cd ~/ros2_ws
    colcon build
    ```

2.  **Run the launch file:**
    ```bash
    source install/setup.bash
    ros2 launch my_robot_pkg my_system.launch.py
    ```

You should now see the output from both the publisher and subscriber nodes in the same terminal.

## Advanced Launch File Features

Because launch files are Python, you can do much more:
- **Set parameters:** Configure your nodes at startup.
- **Remap topics:** Change the topic names a node uses.
- **Include other launch files:** Build complex systems from smaller, reusable parts.
- **Use arguments:** Create configurable launch files that can be modified from the command line.

Launch files are a fundamental tool for managing real-world robotics applications.
