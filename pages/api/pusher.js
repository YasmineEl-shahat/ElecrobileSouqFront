import Pusher from "pusher-js";

Pusher.logToConsole = true;
const pusher = new Pusher("bdc4b89cba613ed1d065", {
  cluster: "eu",
});

export const channel = pusher.subscribe("variant");
