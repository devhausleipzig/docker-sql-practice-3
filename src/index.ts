import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import { connect } from "http2";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post(`/posts`, async (req, res) => {
  const { title, content, image, tags, comments, user } = req.body;
  const result = await prisma.post.create({
    data: {
      user,
      title,
      content,
      image: {
        create: image,
      },
      tags,
      comments,
    },
  });
  res.json(result);
});

app.post(`/user/:id/posts`, async (req, res) => {
  const { id } = req.params;
  const { title, content, tags, comments, image } = req.body;
  try {
    const result = await prisma.post.create({
      data: {
        user: { connect: { id: Number(id) } },
        title,
        content,
        image: {
          create: {
            ...image,
          },
        },
        tags,
        comments,
      },
    });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

app.post(`/user`, async (req, res) => {
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
    res.json({ error: `Something went wrong` });
  }
});

app.put(`/user/:id`, async (req, res) => {
  const { id } = req.params;
  const { userName, email, passwordHash } = req.body;
  try {
    const result = await prisma.user.update({
      data: {
        ...req.body,
      },
      where: {
        id: Number(id),
      },
    });
    res.json(result);
  } catch (err) {
    res.json({ error: `User with ID ${id} does not exist in the database` });
  }
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.json("Success");
  } catch (err) {
    res.json({ error: `User could not be deleted` });
  }
});

app.get("/user/:id/post", async (req, res) => {
  const { id } = req.params;
  const posts = await prisma.post.findMany({
    where: {
      userId: Number(id),
    },
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
    res.json("Success");
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

app.get("/post/:post_id/comment/", async (req, res) => {
  const { post_id } = req.params;
  const comments = await prisma.comment.findMany({
    where: {
      postId: Number(post_id),
    },
  });

  res.json(comments);
});

app.get("/user", async (req, res) => {
  const result = await prisma.user.findMany();
  res.json(result);
});

const server = app.listen(8000, () =>
  console.log(`
    🚀 Server ready at: http://localhost:8000
    ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
