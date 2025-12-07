
# Lesson 9: Creating a Custom RL Environment

The real power of Isaac Orbit comes from creating your own environments to solve custom tasks. In this lesson, we will define a simple "reach" task for our humanoid robot, specifying the state, action, and reward.

An Isaac Orbit environment is a Python class that inherits from a base `RLTask` class and implements a few key methods.

## Structure of an Environment Class

```python
import omni.isaac.orbit.envs.rl_task_env as rl_task_env
from omni.isaac.orbit.utils.config import DictConfig

class MyHumanoidReachEnv(rl_task_env.RLTaskEnv):
    """
    A custom environment for making a humanoid robot reach a target.
    """

    def __init__(self, cfg: DictConfig, **kwargs):
        # Initialize the base class
        super().__init__(cfg, **kwargs)
        
        # Define any variables you need, e.g., target position
        self._target_position = [0.5, 0.5, 0.7]

    def _setup_scene(self):
        # 1. Load your robot and any other objects into the scene
        # 2. Add sensors
        # 3. This is where you would call the URDF importer
        pass

    def _get_observations(self) -> dict:
        # Define the state that the agent sees
        # This must return a dictionary of tensors
        
        # Get joint positions and velocities
        joint_pos = self._robot.get_joint_positions()
        joint_vel = self._robot.get_joint_velocities()
        
        observations = {
            self._robot.name: {
                "joint_pos": joint_pos,
                "joint_vel": joint_vel,
            }
        }
        return observations

    def _get_rewards(self) -> torch.Tensor:
        # Define the reward function
        
        # Get the position of the robot's hand (end-effector)
        hand_position = self._robot.data.ee_state[:, :3] # pseudo-code
        
        # Calculate the distance to the target
        distance_to_target = torch.norm(hand_position - self._target_position, dim=1)
        
        # Reward is the negative distance (we want to minimize distance)
        reward = -distance_to_target
        
        # Optional: Add a bonus for being very close
        reward = torch.where(distance_to_target < 0.05, reward + 10.0, reward)
        
        return reward
```

## Defining State, Action, and Reward

### State (Observations)

The `_get_observations` method defines what the AI agent "sees." A good state representation is crucial for learning. For a reaching task, a minimal state would include:
-   **Joint Positions:** The current angle of each joint.
-   **Joint Velocities:** The current velocity of each joint.
-   **End-Effector Position:** The 3D coordinates of the robot's hand.
-   **Target Position:** The 3D coordinates of the goal.

### Action

The action space is defined in a separate configuration file. It specifies what the agent can control. Common action types are:
-   **`joint_pos`:** The agent outputs the target position for each joint. An internal controller then drives the joint to that position. This is easier to learn.
-   **`joint_tor`:** The agent outputs the raw torque to apply to each joint. This is more direct but harder to learn.

### Reward

The `_get_rewards` method is where you "teach" the agent the goal of the task. This is often the most difficult part of RL, known as **reward engineering**.
-   For our reaching task, a simple reward is the negative distance to the target. The agent is thus incentivized to minimize the distance.
-   We can add a "bonus" reward for getting very close to the target to encourage the final, precise movement.
-   We might also add small penalties for things we want to discourage, like excessive joint velocity or torque (to encourage smooth movements).

## Practical Activity

**Flesh out the `MyHumanoidReachEnv` class:**

1.  **Create a new Python file** for your environment within the Isaac Orbit structure.
2.  **Implement `_setup_scene`:** Use the knowledge from previous lessons to import your humanoid URDF and place a visual marker (e.g., a red sphere) at the target position.
3.  **Implement `_get_observations`:** Gather the joint positions, joint velocities, and any other data you think is necessary for the agent to learn the task.
4.  **Implement `_get_rewards`:** Write the code for the reward function described above.
5.  **Create a Configuration File:** Create a `.toml` file that defines the environment, the robot, the action space, and other parameters.

Once you have this class and its configuration file, you have successfully defined a custom RL problem that is ready for training.
