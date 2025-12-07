
# Lesson 3: Building Scenes with Python Scripting

While you can build scenes interactively in the Isaac Sim editor, the real power and repeatability come from using its **Python scripting API**. This allows you to define and generate entire simulation environments programmatically.

## The Isaac Sim API

Isaac Sim provides a rich, object-oriented Python API to interact with every aspect of the simulation. The core class is `SimulationContext`, which is your main entry point.

A typical script structure looks like this:
```python
from omni.isaac.kit import SimulationApp

# Configuration dictionary
CONFIG = {"renderer": "RayTracedLighting", "headless": False}

# Start the simulation app
simulation_app = SimulationApp(CONFIG)

from omni.isaac.core import World
from omni.isaac.core.objects import Box

# Get the simulation context
world = World()

# Create a new scene
world.scene.add_default_ground_plane()

# Add a box to the scene
box = world.scene.add(
    Box(
        prim_path="/World/MyBox",
        name="my_box",
        position=[0, 0, 1.0],
        scale=[0.5, 0.5, 0.5],
        color=[1.0, 0, 0],
    )
)

# Run the simulation
world.reset()
while simulation_app.is_running():
    world.step(render=True)

# Cleanup
simulation_app.close()
```

This script initializes the simulator, adds a ground plane and a red box, and then runs the simulation loop.

## The Nucleus Server

NVIDIA Omniverse uses a system called **Nucleus** for managing and sharing assets. A Nucleus server acts like a cloud storage drive specifically for 3D assets in the **USD (Universal Scene Description)** format.

Isaac Sim comes with a pre-configured connection to a public NVIDIA Nucleus server, which contains a library of ready-to-use assets, including robots, environments, and props. You can browse this from the "Content" tab in Isaac Sim. The paths look like cloud URLs, e.g., `omniverse://localhost/NVIDIA/Assets/Isaac/2022.2.1/`.

## Practical Activity: Procedural Robotics Lab

Let's write a Python script to recreate our "robotics lab" from Chapter 3 inside Isaac Sim.

1.  **Create a Python Script:** Save the following code as `create_lab.py`.

    ```python
    from omni.isaac.kit import SimulationApp

    simulation_app = SimulationApp({"renderer": "RayTracedLighting", "headless": False})

    from omni.isaac.core import World
    from omni.isaac.core.objects import FixedCuboid

    world = World()
    world.scene.add_default_ground_plane()

    # Add a light source from the Nucleus server
    world.scene.add(
        prim_path="/World/Light",
        usd_path="omniverse://localhost/NVIDIA/Assets/Isaac/2022.2.1/Isaac/Environments/Simple_Warehouse/Props/dome_light.usd",
    )

    # Add Wall 1
    world.scene.add(
        FixedCuboid(
            prim_path="/World/Wall1",
            name="wall_1",
            position=[0, 5, 1.5],
            scale=[10, 0.2, 3],
            color=[0.8, 0.8, 0.8],
        )
    )

    # Add Wall 2
    world.scene.add(
        FixedCuboid(
            prim_path="/World/Wall2",
            name="wall_2",
            position=[5, 0, 1.5],
            scale=[0.2, 10, 3], # Note the change in scale for orientation
            color=[0.8, 0.8, 0.8],
        )
    )
    
    world.reset()

    # Keep the simulation running
    while simulation_app.is_running():
        world.step(render=True)

    simulation_app.close()
    ```
    - We use `FixedCuboid` for the walls so they are static and immovable.
    - We add a realistic dome light from the Nucleus assets to illuminate the scene.

2.  **Run the Script:**
    You can run this script from the Isaac Sim script editor or from the command line using the provided Python executable:
    ```bash
    ./python.sh create_lab.py
    ```

This will launch Isaac Sim and programmatically build your scene. This scripted approach is fundamental for creating repeatable experiments and is a key advantage of the Isaac Sim platform.
