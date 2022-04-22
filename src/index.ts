import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import { connect } from "http2";
import { resolve } from "path";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post(`/user/:id/posts`, async (req, res) => {
  const { id } = req.params;
  const { title, content, image, tags } = req.body;
  try {
    const result = await prisma.post.create({
      data: {
        user: { connect: { id: Number(id) } },
        title,
        content,
        image: {
          create: image,
        },
        tags,
      },
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// app.post(`/posts/`, async (req, res) => {
//   const { title, content, image, tags } = req.body;

//   const result = await prisma.post.create({
//     data: {
//       title,
//       content,
//       image,
//       tags,
//     },
//   });

//   res.json(result);
// });

app.post(`/user/`, async (req, res) => {
  const { userName, email, passwordHash, pwSalt } = req.body;
  try {
    const result = await prisma.user.create({
      data: {
        userName,
        email,
        passwordHash,
        pwSalt,
      },
    });

    res.json(result);
  } catch (err) {
    res.json("Something went wrong.");
  }
});

app.delete(`/user/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json("Success");
  } catch (err) {
    res.json("User could not be deleted");
  }
});

app.put(`/user/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.user.update({
      data: {
        ...req.body,
      },
      where: { id: Number(id) },
    });

    res.json(result);
  } catch (err) {
    res.json({ error: `User with ID ${id} does not exist` });
  }
});

app.get("/posts/", async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { image: true },
  });

  res.json(posts);
});

app.put("/post/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        ...req.body,
        image: {
          update: {
            ...req.body.image,
          },
        },
      },
    });
    res.json("updated3");
  } catch (error) {
    console.log(error);
  }
});

app.delete("/post/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.json("deleted");
  } catch (error) {
    console.log(error);
  }
});

app.put("/post/:id/views", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    res.json(post);
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` });
  }
});

// app.put(`/post/:post_id/reactions/`, async (req, res) => {
//   const { post_id } = req.params;
//   const { reactions } = req.body;

//   const result = await prisma.post.update({
//     where: {
//       id: Number(post_id),
//     },
//     data: {
//       reactions: {
//         connectOrCreate: reactions.map(
//           (emojiObj: { character: string; number: number }) => {
//             return {
//               where: {
//                 emoji: { connect: { character: emojiObj.character } },
//                 number: { increment: 1 },
//               },
//               create: {
//                 postId: Number(post_id),
//                 emoji: {
//                   connectOrCreate: {
//                     where: { character: emojiObj.character },
//                     create: { character: emojiObj.character },
//                   },
//                 },
//               },
//             };
//           }
//         ),
//       },
//     },
//   });

//   res.json(result);
// });

// app.post(`/post/:post_id/comment/`, async (req, res) => {
//   const { post_id } = req.params;
//   const { author, email, content } = req.body;

//   const result = await prisma.comment.create({
//     data: {
//       author,
//       email,
//       content,
//       post: { connect: { id: Number(post_id) } },
//     },
//   });

//   res.json(result);
// });

app.get("/post/:post_id/comment/", async (req, res) => {
  const { post_id } = req.params;
  const comments = await prisma.comment.findMany({
    where: {
      postId: Number(post_id),
    },
  });

  res.json(comments);
});

const server = app.listen(8000, () =>
  console.log(`
    🚀 Server ready at: http://localhost:8000
    ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
