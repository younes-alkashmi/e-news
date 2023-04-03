import User from "../Models/UserModel.js";
import supertest from "supertest";
import app from "../app.js";
const api = supertest(app);

test("delete call", async () => {
  const users = await User.find();
  const id = users[users.length - 1]._id;
  await api.delete(`/user/${id}`).send({ _id: id }).expect(200);
});

// test("auth call", async () => {
//   const user = {
//     email: "user4@",
//     password: "123456",
//   };
//   await api.post("/auth/login").send(user).expect(200);
// });

//
//
// expect(userAuth.body.username).toEqual('user3')

// test("update call", async () => {
//   const users = await User.find();
//   const lastUser = users[users.length - 1];
//   const user = {
//     _id: lastUser._id,
//     username: lastUser.username,
//     email: lastUser.email,
//     bio: "updated using jest",
//   };
//   await api.put(`/user/${lastUser._id}`).send(user).expect(200);
// });

// test("GET call", async () => {
//   const users = await api.get("/user/");
//   const firstUser = users.body[0];
//   const getUser = await api.get(`/user/6378979f59ab3f59874b0e40`);
//   expect(getUser.body.email).toEqual(firstUser.email);
// });

// test("POST call", async () => {
//   const user = {
//     username: "user4",
//     email: "user4@",
//     password: "123456",
//     document: "sent from jest",
//   };
//   await api.post("/auth/register").send(user).expect(200);
//   const users = await User.find();
//   expect(users[users.length - 1].document).toBe("sent from jest");
// });

// test("check all users", async () => {
//   //get all the users
//   const users = await api.get("/user/");
//   //check that every user in our DB has the ID & Email properties
//   for (const user of users.body) {
//     expect(user._id).toBeDefined();
//     expect(user.email).toBeDefined();
//   }
// });

// test("GET call", async () => {
//   await api
//     .get("/user/")
//     .expect(200)
//     .expect("Content-Type", /application\/json/);
// });
