
# Lesson 8: Simulation and Visualization

Once you have a URDF model, you can bring it to life in a simulated environment. **Gazebo** is a powerful 3D robotics simulator that allows you to model rich and complex environments and interact with your robot. **RViz2** is a 3D visualization tool for ROS 2 that allows you to see the state of your robot and its sensor data.

## Key Nodes for Visualization

- **`robot_state_publisher`**: This node reads your URDF file, listens to `/joint_states` topic, and publishes the 3D poses of the robot's links using TF2.
- **`joint_state_publisher`**: This node provides a GUI to control the robot's joint positions. It publishes the `sensor_msgs/msg/JointState` messages to the `/joint_states` topic.

## Launch File for Visualization

Here is a launch file that starts `robot_state_publisher` and `joint_state_publisher_gui` to visualize your URDF in RViz2.

```python
import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch_ros.actions import Node
import xacro

def generate_launch_description():
    # Get the path to the URDF file
    urdf_file_name = 'simple_arm.urdf'
    urdf_path = os.path.join(
        get_package_share_directory('my_robot_pkg'),
        'urdf',
        urdf_file_name)

    with open(urdf_path, 'r') as infp:
        robot_desc = infp.read()

    return LaunchDescription([
        Node(
            package='robot_state_publisher',
            executable='robot_state_publisher',
            name='robot_state_publisher',
            output='screen',
            parameters=[{'robot_description': robot_desc}],
            arguments=[urdf_path]
        ),
        Node(
            package='joint_state_publisher_gui',
            executable='joint_state_publisher_gui',
            name='joint_state_publisher_gui',
            output='screen'
        ),
        Node(
            package='rviz2',
            executable='rviz2',
            name='rviz2',
            output='screen'
        )
    ])
```
When you run this launch file, RViz2 will open. You will need to:
1.  Set the "Fixed Frame" to `base_link`.
2.  Add a "RobotModel" display to see your robot.
3.  Add a "TF" display to see the coordinate frames.

The `joint_state_publisher_gui` will also open, allowing you to move the sliders to change the joint angles and see the robot model move in RViz2.

## Simulating in Gazebo

Gazebo provides a much more realistic simulation, including physics, sensors, and environments.

To use Gazebo, you need:
1.  **`gazebo_ros_pkgs`**: A set of ROS packages that provide the interface between ROS 2 and Gazebo.
2.  **Gazebo-specific URDF tags**: You need to add `<gazebo>` tags to your URDF to specify properties like friction, damping, and sensor plugins.
3.  **A world file**: An SDF file that describes the simulation environment (e.g., ground plane, lighting, objects).

A launch file to start Gazebo and spawn your robot looks like this:

```python
# ... (imports)

def generate_launch_description():
    # ... (get urdf path)

    return LaunchDescription([
        # Start Gazebo
        ExecuteProcess(
            cmd=['gazebo', '--verbose', '-s', 'libgazebo_ros_init.so', '-s', 'libgazebo_ros_factory.so'],
            output='screen'
        ),
        # Spawn the robot
        Node(
            package='gazebo_ros',
            executable='spawn_entity.py',
            arguments=['-topic', 'robot_description', '-entity', 'simple_arm'],
            output='screen'
        ),
        # Start robot_state_publisher
        Node(
            package='robot_state_publisher',
            # ... (as before)
        )
    ])
```

This setup allows you to test your robot's control logic in a safe, simulated environment before deploying it on physical hardware.
