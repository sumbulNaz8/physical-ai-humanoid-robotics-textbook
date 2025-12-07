
# Lesson 6: Bridging ROS 2 and Unity

To use Unity as a ROS 2 simulator, we need to establish a communication bridge between them. Unity does not natively understand ROS 2 messages or the DDS protocol. The standard way to solve this is to use a TCP-based bridge.

Unity provides a set of official packages for this purpose. The architecture involves two key parts:

1.  **`ROS-TCP-Connector` (in Unity):** A Unity package that manages the TCP connection and handles the serialization/deserialization of ROS messages.
2.  **`ros_tcp_endpoint` (in ROS 2):** A ROS 2 package that runs a server node. It listens for connections from Unity and acts as a bridge to the rest of the ROS 2 graph.

![ROS-Unity Architecture](https://github.com/Unity-Technologies/ROS-TCP-Connector/raw/main/images/ROS-TCP-Connector.png)
*Image credit: Unity Technologies*

## Setting up the Unity Side

1.  **Install `ROS-TCP-Connector`:**
    - In your Unity project, go to `Window > Package Manager`.
    - Click the `+` icon and choose `Add package from git URL...`.
    - Enter `https://github.com/Unity-Technologies/ROS-TCP-Connector.git`. Unity will download and install the package.

2.  **Configure the Connection:**
    - The package provides a `ROSConnection` prefab. Add this to your scene.
    - In the Inspector for the `ROSConnection` object, you can set the `ROS IP Address` to the IP of the machine running ROS 2 (or leave it as `127.0.0.1` if running on the same machine).

## Setting up the ROS 2 Side

1.  **Clone the `ros_tcp_endpoint` package** into your ROS 2 workspace's `src` directory:
    ```bash
    cd ~/ros2_ws/src
    git clone --branch main https://github.com/Unity-Technologies/ros_tcp_endpoint.git
    # Note: The branch may vary, e.g., 'ros2'
    ```

2.  **Build your workspace:**
    ```bash
    cd ~/ros2_ws
    colcon build
    ```

3.  **Run the endpoint server:**
    The package provides a launch file to start the server.
    ```bash
    source install/setup.bash
    ros2 launch ros_tcp_endpoint endpoint.launch.py
    ```
    You should see output indicating that the server is running and waiting for a connection.

## Practical Activity: Test the Connection

1.  **Start the ROS 2 endpoint server** in a terminal.
2.  **Open your Unity project.**
3.  **Create a simple C# script** called `RosConnectionTest.cs`:

    ```csharp
    using UnityEngine;
    using Unity.Robotics.ROSTCPConnector;

    public class RosConnectionTest : MonoBehaviour
    {
        void Start()
        {
            // Get the ROSConnection instance
            ROSConnection.GetOrCreateInstance().Connect();
            
            // Optional: Add a callback for connection status
            ROSConnection.GetOrCreateInstance().connected += OnConnected;
        }

        void OnConnected(object sender, System.EventArgs e)
        {
            Debug.Log("Successfully connected to ROS!");
        }
    }
    ```

4.  **Attach this script** to a `GameObject` in your scene (e.g., the Main Camera).
5.  **Press the "Play" button** in Unity.

If everything is configured correctly, the Unity Editor's console window will display the message "Successfully connected to ROS!". You have now successfully bridged the two systems, allowing them to exchange data.
