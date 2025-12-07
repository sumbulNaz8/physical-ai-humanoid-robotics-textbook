
# Lesson 7: Modeling Your Robot with URDF

A **URDF (Unified Robot Description Format)** is an XML file format used in ROS to describe all elements of a robot. This includes its links, joints, sensors, and visual appearance. A URDF file is the foundation for simulation, visualization, and collision detection.

## Core URDF Components

- **`<robot>`**: The root element of the file.
- **`<link>`**: Describes a rigid part of the robot. It has child elements for:
  - **`<visual>`**: The visual appearance of the link (shape, color, mesh).
  - **`<collision>`**: The collision geometry of the link, used for physics calculations.
  - **`<inertial>`**: The dynamic properties of the link (mass, inertia).
- **`<joint>`**: Describes the connection between two links. It has child elements for:
  - **`<parent>`**: The parent link.
  - **`<child>`**: The child link.
  - **`<origin>`**: The transform (position and orientation) of the joint relative to the parent link.
  - **`<axis>`**: The axis of rotation or translation for the joint.
  - **`<limit>`**: The joint's limits (e.g., upper and lower angle for a revolute joint).
  - **`type`**: The type of joint (`revolute`, `continuous`, `prismatic`, `fixed`, etc.).

## Example: A Simple Two-Link Arm

Let's create a URDF for a simple arm with two links and one revolute joint.

1.  **Create a `urdf` directory** in your package:
    ```bash
    mkdir my_robot_pkg/urdf
    ```

2.  **Create a new file** `my_robot_pkg/urdf/simple_arm.urdf`:

```xml
<?xml version="1.0"?>
<robot name="simple_arm">

  <!-- Base Link -->
  <link name="base_link">
    <visual>
      <geometry>
        <cylinder length="0.05" radius="0.1"/>
      </geometry>
      <origin rpy="0 0 0" xyz="0 0 0.025"/>
      <material name="grey">
        <color rgba="0.5 0.5 0.5 1"/>
      </material>
    </visual>
  </link>

  <!-- Arm Link -->
  <link name="arm_link">
    <visual>
      <geometry>
        <box size="0.5 0.05 0.05"/>
      </geometry>
      <origin rpy="0 0 0" xyz="0.25 0 0"/>
      <material name="blue">
        <color rgba="0 0 0.8 1"/>
      </material>
    </visual>
  </link>

  <!-- Shoulder Joint -->
  <joint name="shoulder_joint" type="revolute">
    <parent link="base_link"/>
    <child link="arm_link"/>
    <origin xyz="0 0 0.05"/>
    <axis xyz="0 1 0"/>
    <limit effort="1000.0" lower="-1.57" upper="1.57" velocity="0.5"/>
  </joint>

</robot>
```

## Visualizing the URDF

You can use RViz2 to visualize and check your URDF file. ROS 2 provides a tool called `urdf_to_graphiz` to see the tree structure of the links and joints.

To visualize it, you would typically use the `robot_state_publisher` and `joint_state_publisher` nodes, which we will cover in the next lesson. These nodes read the URDF and publish the transforms between the links, allowing RViz2 to display the robot model.

This URDF file provides the essential description of the robot's structure, which is the first step toward simulating it in Gazebo and controlling it with ROS 2.
