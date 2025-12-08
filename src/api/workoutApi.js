export async function fetchCurrentWorkout(memberId) {
  const res = await fetch(`/api/workouts/current/${memberId}`);
  return res.json();
}
