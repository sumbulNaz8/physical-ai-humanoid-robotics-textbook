
# Lesson 4: Importing and Controlling a Robot

Once you have a scene, the next step is to add your robot and control it. Isaac Sim can import standard URDF files and provides multiple ways to interface with the robot's joints.

## Importing a URDF

Isaac Sim has a built-in URDF Importer that converts a URDF file into an Omniverse-native USD asset. This process is highly configurable, allowing you to specify joint drive parameters, physics properties, and more.

You can do this programmatically in your Python script:

```python
from omni.isaac.core.articulations import Articulation
from omni.isaac.importers import URDFImporter

# ... inside your script ...

# Setup the URDF importer config
importer_config = URDFImporter.Configuration()
importer_config.merge_fixed_joints = False
importer_config.fix_base = True # Make the robot's base link immovable
importer_config.make_default_prim = True

# Get the path to your URDF file
# Note: This path should be accessible from where you run the script
urdf_path = "/path/to/your/humanoid.urdf"

# Import the robot
importer = URDFImporter(importer_config)
robot_prim = importer.import_robot(urdf_path, "/World/Robot")

# Wrap it in an Articulation object for easy control
robot = Articulation(robot_prim.prim_path)
world.scene.add(robot)
```

## Controlling the Robot

There are two primary ways to control the robot's joints:

### 1. Native Isaac Sim API (`ArticulationController`)

This is the most direct and highest-performance method. You get the `ArticulationController` from your robot object and can send it position or velocity targets.

```python
# Get the articulation controller
articulation_controller = robot.get_articulation_controller()

# Example: Set the position of a specific joint
joint_names = articulation_controller.get_joint_names()
joint_index = joint_names.index("left_shoulder_joint")

# Set the target position (in radians)
articulation_controller.set_joint_positions(
    positions=[3.14 / 2], 
    joint_indices=[joint_index]
)
```

### 2. ROS 2 Bridge

For compatibility with the broader ROS ecosystem, you can use the ROS 2 bridge. Isaac Sim provides pre-built components for this.

-   **`ROS2PublishJointState`**: Publishes the robot's current joint states to the `/joint_states` topic.
-   **`ROS2SubscribeJointState`**: Subscribes to a `/joint_command` topic and applies the received commands to the robot's joints.

Here is how you would add these components in your Python script:

```python
from omni.isaac.core.ros2_bridge import ROS2PublishJointState, ROS2SubscribeJointState

# ... after importing the robot ...

# Add the ROS 2 components
ROS2PublishJointState(
    prim_path="/World/Robot",
    topic_name="/joint_states"
)

ROS2SubscribeJointState(
    prim_path="/World/Robot",
    topic_name="/joint_command"
)
```

## Practical Activity

**ROS 2 Control of the Humanoid:**

1.  **Modify your `create_lab.py` script** to import your humanoid URDF.
2.  **Add the `ROS2PublishJointState` and `ROS2SubscribeJointState` components** to the imported robot.
3.  **Run your script** to launch Isaac Sim with the robot in the lab environment.
4.  **In a separate terminal, run the `joint_state_publisher` GUI:**
    ```bash
    ros2 run joint_state_publisher_gui joint_state_publisher_gui
    ```
5.  **Remap the topic:** The GUI publishes on `/joint_states`, but our subscriber listens on `/joint_command`. Use ROS 2's remapping feature to bridge them:
    ```bash
    ros2 run joint_state_publisher_gui joint_state_publisher_gui --ros-args -r /joint_states:=/joint_command
    ```

Now, when you move the sliders in the GUI, your robot in Isaac Sim should move. This confirms that you have a complete control loop: from a standard ROS 2 tool, through the ROS 2 bridge, to the robot in the high-fidelity simulator.
