
# Lesson 7: Controlling Robots in Unity

With the ROS 2 to Unity bridge established, we can now control a robot in Unity using standard ROS 2 messages. This involves importing the robot model into Unity and creating a C# script to subscribe to joint commands.

## Importing a URDF into Unity

Unity provides a package to import URDF files, which greatly simplifies the process of setting up a robot model.

1.  **Install the URDF Importer:**
    - In the Unity Package Manager, add the following git URL: `https://github.com/Unity-Technologies/URDF-Importer.git`. This will install the importer package and its dependencies.

2.  **Import your URDF:**
    - Go to `Assets > Import Robot from URDF`.
    - Select your robot's `.urdf` file.
    - The importer will parse the file and generate a `Prefab` of your robot. A prefab is a configured `GameObject` that you can drag into your scene.

3.  **Articulation Bodies:**
    - The importer will automatically configure the robot's links with `ArticulationBody` components. This is a specialized Unity physics component designed for robotic arms and kinematic chains, providing more stable joint control than standard `Rigidbody` components.

## Subscribing to ROS 2 Messages in C#

To control the robot, we need a C# script that subscribes to a ROS 2 topic and applies the received commands to the `ArticulationBody` joints.

### Example: Subscribing to `sensor_msgs/JointState`

Let's create a script that listens to the standard `JointState` message, which is what the `joint_state_publisher` GUI uses.

1.  **Define Message Types:** The `ROS-TCP-Connector` requires C# definitions of the ROS messages you want to use. The package can generate these for you, or you can write them manually. For common messages like `JointState`, the definitions are often included or easily found.

2.  **Create the Subscriber Script:** Create a new C# script, e.g., `JointController.cs`.

```csharp
using UnityEngine;
using Unity.Robotics.ROSTCPConnector;
using RosMessageTypes.Sensor; // Namespace for sensor_msgs

public class JointController : MonoBehaviour
{
    // The name of the ROS 2 topic to subscribe to
    public string topicName = "/joint_states";
    
    // A dictionary to hold the ArticulationBody components for each joint
    private System.Collections.Generic.Dictionary<string, ArticulationBody> jointArticulationBodies;

    void Start()
    {
        // Initialize the dictionary
        jointArticulationBodies = new System.Collections.Generic.Dictionary<string, ArticulationBody>();
        
        // Find all ArticulationBody components in the robot
        foreach (var joint in GetComponentsInChildren<ArticulationBody>())
        {
            if(joint.jointType != ArticulationJointType.FixedJoint)
            {
                jointArticulationBodies.Add(joint.name, joint);
            }
        }
        
        // Subscribe to the topic
        ROSConnection.GetOrCreateInstance().Subscribe<JointStateMsg>(topicName, OnJointStateReceived);
    }

    void OnJointStateReceived(JointStateMsg jointState)
    {
        for (int i = 0; i < jointState.name.Length; i++)
        {
            var jointName = jointState.name[i];
            if (jointArticulationBodies.ContainsKey(jointName))
            {
                var joint = jointArticulationBodies[jointName];
                
                // Set the target position for the joint drive
                var drive = joint.xDrive;
                drive.target = Mathf.Rad2Deg * jointState.position[i];
                joint.xDrive = drive;
            }
        }
    }
}
```
- The script finds all `ArticulationBody` components on the robot and stores them in a dictionary.
- It subscribes to the `/joint_states` topic.
- When a message arrives, `OnJointStateReceived` is called. It iterates through the joint names in the message and sets the target position for the corresponding `ArticulationBody`.

## Practical Activity

1.  **Import your humanoid URDF** into your Unity project.
2.  **Drag the generated prefab** into your scene.
3.  **Attach the `JointController.cs` script** to the root `GameObject` of your robot prefab.
4.  **Run the ROS 2 endpoint server** and the `joint_state_publisher_gui`:
    ```bash
    # Terminal 1
    ros2 launch ros_tcp_endpoint endpoint.launch.py
    
    # Terminal 2
    ros2 run joint_state_publisher_gui joint_state_publisher_gui
    ```
5.  **Press Play in Unity.**

Now, when you move the sliders in the `joint_state_publisher` GUI, your robot model in Unity should move accordingly. You are now controlling a robot in a high-fidelity simulator using standard ROS 2 tools.
