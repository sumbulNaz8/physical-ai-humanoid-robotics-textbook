
# Lesson 2: Building Simulation Worlds

A Gazebo world file is an SDF file that describes the entire simulation environment. This includes the lighting, physics properties, and all the objects and robots within it.

## The World File Structure

A typical `.world` file looks like this:

```xml
<?xml version="1.0" ?>
<sdf version="1.7">
  <world name="default">
    <!-- Scene properties: sky, shadows, etc. -->
    <scene>
      <sky>
        <clouds>
          <speed>12</speed>
        </clouds>
      </sky>
      <shadows>true</shadows>
    </scene>

    <!-- Global physics properties -->
    <physics type="ode">
      <max_step_size>0.001</max_step_size>
      <real_time_factor>1</real_time_factor>
    </physics>

    <!-- Lighting -->
    <include>
      <uri>model://sun</uri>
    </include>

    <!-- A ground plane -->
    <include>
      <uri>model://ground_plane</uri>
    </include>

    <!-- Add other models -->
    <model name="box_obstacle">
      <pose>2 0 0.5 0 0 0</pose>
      <link name="link">
        <collision name="collision">
          <geometry><box><size>1 1 1</size></box></geometry>
        </collision>
        <visual name="visual">
          <geometry><box><size>1 1 1</size></box></geometry>
        </visual>
      </link>
    </model>

  </world>
</sdf>
```

### Key Elements:
- **`<world>`:** The root element.
- **`<scene>`:** Controls the visual environment, like the sky and shadows.
- **`<physics>`:** Sets the global physics engine parameters. `ode` (Open Dynamics Engine) is the default.
- **`<include>`:** A powerful tag that lets you include pre-defined models from Gazebo's model library (e.g., `sun`, `ground_plane`) or from your own paths.
- **`<model>`:** Defines a new model directly within the world file. In the example, we create a simple box obstacle.
- **`<pose>`:** Specifies the position (`x y z`) and orientation (`roll pitch yaw`) of a model.

## Practical Activity

**Create a Robotics Lab World:**

1.  **Create a `worlds` directory** in your ROS 2 package:
    ```bash
    mkdir my_robot_pkg/worlds
    ```

2.  **Create a new file** `my_robot_pkg/worlds/robotics_lab.world`.

3.  **Add the following content:**

```xml
<?xml version="1.0" ?>
<sdf version="1.7">
  <world name="robotics_lab">
    <include>
      <uri>model://sun</uri>
    </include>
    <include>
      <uri>model://ground_plane</uri>
    </include>

    <!-- Wall 1 -->
    <model name="wall_1">
      <pose>0 5 1.5 0 0 0</pose>
      <static>true</static>
      <link name="link">
        <collision name="collision"><geometry><box><size>10 0.2 3</size></box></geometry></collision>
        <visual name="visual"><geometry><box><size>10 0.2 3</size></box></geometry></visual>
      </link>
    </model>

    <!-- Wall 2 -->
    <model name="wall_2">
      <pose>5 0 1.5 0 0 1.57</pose>
      <static>true</static>
      <link name="link">
        <collision name="collision"><geometry><box><size>10 0.2 3</size></box></geometry></collision>
        <visual name="visual"><geometry><box><size>10 0.2 3</size></box></geometry></visual>
      </link>
    </model>
  </world>
</sdf>
```
- We've added two models to act as walls.
- The **`<static>true</static>`** tag makes them immovable, so they won't be affected by physics.

## Launching Your World

You can launch Gazebo with your custom world file using a launch file:

```python
from launch import LaunchDescription
from launch.actions import ExecuteProcess

def generate_launch_description():
    return LaunchDescription([
        ExecuteProcess(
            cmd=['gazebo', '--verbose', 'worlds/robotics_lab.world',
                 '-s', 'libgazebo_ros_init.so',
                 '-s', 'libgazebo_ros_factory.so'],
            output='screen'
        ),
    ])
```

When you run this launch file, Gazebo will start and load your custom world with the two walls.
