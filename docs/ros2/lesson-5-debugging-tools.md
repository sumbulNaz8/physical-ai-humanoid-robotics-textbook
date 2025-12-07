
# Lesson 5: Introspection and Debugging

Once you have a ROS 2 system running, you need tools to inspect, debug, and interact with it. ROS 2 provides a powerful set of command-line and graphical tools for this purpose.

## `ros2` Command-Line Tool

The `ros2` command is your primary entry point for interacting with a running ROS 2 system.

- **`ros2 node list`**: Shows all running nodes.
- **`ros2 topic list`**: Shows all active topics.
- **`ros2 topic echo <topic_name>`**: Prints the messages being published on a topic.
- **`ros2 topic pub <topic_name> <message_type> '<args>'`**: Publishes a single message on a topic from the command line.
- **`ros2 service list`**: Shows all active services.
- **`ros2 service call <service_name> <service_type> '<args>'`**: Calls a service from the command line.

### Practical Activity

1.  Run the `simple_publisher` and `simple_subscriber` from Lesson 3.
2.  In a new terminal, use `ros2 node list` to see the two nodes.
3.  Use `ros2 topic list` to see the `/chatter` topic.
4.  Use `ros2 topic echo /chatter` to see the "Hello, ROS 2 World!" messages.

## `rqt` Graphical Tools

`rqt` is a software framework that provides various tools and plugins for visualizing and interacting with ROS 2.

- **`rqt_graph`**: Visualizes the ROS 2 graph, showing nodes and their connections. This is incredibly useful for understanding the architecture of a complex system.
- **`rqt_plot`**: Allows you to plot numeric values from topics in real-time.
- **`rqt_console`**: Displays logging output from all running nodes.
- **`rqt_image_view`**: Displays image messages.

### Practical Activity

1.  With your nodes still running, open a new terminal and run:
    ```bash
    rqt_graph
    ```
    This will open a window showing your `simple_publisher` node connected to your `simple_subscriber` node via the `/chatter` topic.

2.  If you had a topic publishing numeric data (like the `SensorData` from Lesson 4), you could use `rqt_plot` to visualize it:
    ```bash
    rqt_plot /sensor_topic/value
    ```

These tools are essential for the daily work of a robotics engineer, allowing for quick debugging and system analysis without modifying code.
