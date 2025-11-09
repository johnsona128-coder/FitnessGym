
CREATE DATABASE IF NOT EXISTS gym_tracker;
USE gym_tracker;

CREATE TABLE `ExerciseGroups` (
  `ExerciseGroupID` INT AUTO_INCREMENT PRIMARY KEY,
  `GroupName` VARCHAR(255),
  `CreatedDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO ExerciseGroups (ExerciseGroupID,GroupName) VALUES
(1,'Gymnastics'),
(2,'Weightlifting'),
(3,'Cardio'),
(4,'Strongman');

CREATE TABLE `MuscleGroups` (
  `MuscleGroupID` INT AUTO_INCREMENT PRIMARY KEY,
  `MuscleGroupName` VARCHAR(255),
  `CreatedDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO MuscleGroups (MuscleGroupID,MuscleGroupName) VALUES
(1,'Chest'),
(2,'Legs'),
(3,'Back'),
(4,'Shoulders'),
(5,'Arms');


CREATE TABLE `Exercise` (
  `ExerciseID` INT AUTO_INCREMENT PRIMARY KEY,
  `ExerciseName` VARCHAR(255),
  `Description` Text,
  `CaloriesBurned` VARCHAR(100),
  `MuscleGroupID` INT,
  `ExerciseGroupID` INT,
  `ExerciseImage` VARCHAR(255),
  `SafetyTips` TEXT,
  `CreatedDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK_MuscleGroup FOREIGN KEY (MuscleGroupID) REFERENCES MuscleGroups(MuscleGroupID),
  CONSTRAINT FK_ExerciseGroup FOREIGN KEY (ExerciseGroupID) REFERENCES ExerciseGroups(ExerciseGroupID)
);


INSERT INTO Exercise (ExerciseID,ExerciseName, Description,MuscleGroupID,ExerciseGroupID,SafetyTips) VALUES
(1,'Kettlebell Swings',  'Russian or American style KB swing', 3,4, 'Shoulder mobility is critical—don’t force the overhead position if it feels unstable. \n
Avoid squatting—this is a hip hinge movement, not a squat. \n Don’t lift with your arms—power comes from your hips.');


CREATE TABLE `ExerciseSteps` (
  `StepID` INT AUTO_INCREMENT PRIMARY KEY,
  `ExerciseID` INT,
  `StepDescription` VARCHAR(255),
  `OrderNumber` INT,
  `CreatedDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK_Exercise FOREIGN KEY (ExerciseID) REFERENCES Exercise(ExerciseID)
);

INSERT INTO ExerciseSteps (StepID,ExerciseID, StepDescription,OrderNumber) VALUES
(1,1, 'Start Position \n Stand with feet shoulder-width apart. \n Place the kettlebell about a foot in front of you. 
\n Hinge at the hips, bend knees slightly, and grip the kettlebell with both hands.',1),
(2,1,'Hike the Kettlebell \n Pull the kettlebell back between your legs like a football hike. \n Keep your back flat, chest up, and core engaged.' ,2),
(3,1,'Drive Through the Hips \n Explosively extend your hips and knees to propel the kettlebell upward. \n Use momentum—not your arms—to lift the kettlebell.
' ,3),
(4,1,'Swing Overhead \n As the kettlebell rises past chest level, guide it overhead with straight arms. \n 
At the top, your body should be upright, arms locked out, and ears between biceps. \n Avoid arching your back—brace your core to protect your spine.' ,4),
(5,1,'Control the Descent \n Let the kettlebell fall naturally, keeping arms straight. \n Guide it back between your legs while hinging at the hips.' ,5),
(6,1,'Repeat the movement for the desired number of reps.' ,6)
