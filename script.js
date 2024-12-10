document.getElementById("actionButton").addEventListener("click", async () => {
  const message = document.getElementById("message");
  message.textContent = "Hey, You clicked the button! 🎉";

  // Send button click data to the backend
  await fetch('/button-click', { method: 'POST' });
});
