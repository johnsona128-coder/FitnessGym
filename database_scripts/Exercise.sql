
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
  `CreatedDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK_MuscleGroup FOREIGN KEY (MuscleGroupID) REFERENCES MuscleGroups(MuscleGroupID),
  CONSTRAINT FK_ExerciseGroup FOREIGN KEY (ExerciseGroupID) REFERENCES ExerciseGroups(ExerciseGroupID)
);


INSERT INTO Exercise (ExerciseName, Description,MuscleGroupID,ExerciseGroupID) VALUES
('Kettlebell Swings',  'Russian or American style KB swing', 3,4);


CREATE TABLE `ExerciseSteps` (
  `StepID` INT AUTO_INCREMENT PRIMARY KEY,
  `ExerciseID` INT,
  `StepDescription` VARCHAR(255),
  `OrderNumber` INT,
  `CreatedDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK_Exercise FOREIGN KEY (ExerciseID) REFERENCES Exercise(ExerciseID)
);

