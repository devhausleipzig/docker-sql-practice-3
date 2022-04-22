import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

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
      image,
      tags,
      comments,
    },
  });
  res.json(result);
});

app.post(`/user/:id/posts`, async (req, res) => {
  const { id } = req.params;
  const { title, content, image, tags, comments } = req.body;
  try {
    const result = await prisma.post.create({
      data: {
        user: { connect: { id: Number(id) } },
        title,
        content,
        image,
        tags,
        comments,
      },
    });
    res.json(result);
  } catch (err) {
    res.json("Something went wrong");
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

app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(post);
});

app.get(`/post/:id`, async (req, res) => {
  const { id }: { id?: string } = req.params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  res.json(post);
});
app.get("/feed", async (req, res) => {
  const { searchString, skip, take, orderBy } = req.query;

  const or: Prisma.PostWhereInput = searchString
    ? {
        OR: [
          { title: { contains: searchString as string } },
          { content: { contains: searchString as string } },
        ],
      }
    : {};

  const posts = await prisma.post.findMany({});

  res.json(posts);
});

const server = app.listen(8000, () =>
  console.log(`
    🚀 Server ready at: http://localhost:8000
    ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
