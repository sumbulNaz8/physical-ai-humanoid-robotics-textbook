
# Lesson 1: Introduction to the ROS 2 Graph

## Core Concepts

The ROS 2 framework is built on a network of processes called **nodes** that communicate with each other. This network is called the ROS 2 graph. Understanding this graph is the first step to building any robotics application.

The main components of the graph are:
- **Nodes:** A node is a process that performs computation. A robot control system is usually comprised of many nodes. For example, a node for controlling the wheel motors, a node for reading laser range-finder data, and a node for planning a path.
- **Topics:** Topics are named buses over which nodes exchange messages. Topics have anonymous publish/subscribe semantics.
  - **Publishers:** A node can publish messages to a topic.
  - **Subscribers:** A node can subscribe to a topic to receive messages.
- **Services:** Services are another way for nodes to communicate. They are based on a request/response model. One node offers a service, and another node can make a request and wait for a response.
- **Actions:** Actions are for long-running tasks. They provide feedback during execution and are cancellable. For example, navigating to a location is an action, as it can take a long time and you might want to know its progress or cancel it.
- **Parameters:** Parameters are configuration values for a node. You can think of them as node settings.

## Practical Activity

**Diagramming a simple robotics application:**

Consider a simple mobile robot that has a sensor to detect obstacles.
1.  **Identify the Nodes:**
    -   `sensor_node`: Reads data from the obstacle sensor.
    -   `control_node`: Drives the robot's wheels.
    -   `navigation_node`: Decides where the robot should go.
2.  **Identify the Topics:**
    -   `/obstacle_data`: The `sensor_node` publishes sensor readings to this topic. The `navigation_node` subscribes to it.
    -   `/cmd_vel`: The `navigation_node` publishes velocity commands to this topic. The `control_node` subscribes to it.
3.  **Identify the Services:**
    -   `/get_robot_status`: A service offered by the `control_node` to provide the robot's current status (e.g., battery level) when requested.
4.  **Diagram:** Draw a diagram connecting these nodes with arrows indicating the flow of information through topics and services.

This simple exercise helps visualize the architecture of a ROS 2 application.
