-- CreateTable
CREATE TABLE "EmojiComment" (
    "number" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL,
    "emojiId" INTEGER NOT NULL,

    CONSTRAINT "EmojiComment_pkey" PRIMARY KEY ("commentId","emojiId")
);

-- CreateTable
CREATE TABLE "EmojiPost" (
    "number" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "emojiId" INTEGER NOT NULL,

    CONSTRAINT "EmojiPost_pkey" PRIMARY KEY ("postId","emojiId")
);

-- CreateTable
CREATE TABLE "Emoji" (
    "id" SERIAL NOT NULL,
    "character" TEXT NOT NULL,

    CONSTRAINT "Emoji_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmojiComment" ADD CONSTRAINT "EmojiComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmojiComment" ADD CONSTRAINT "EmojiComment_emojiId_fkey" FOREIGN KEY ("emojiId") REFERENCES "Emoji"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmojiPost" ADD CONSTRAINT "EmojiPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmojiPost" ADD CONSTRAINT "EmojiPost_emojiId_fkey" FOREIGN KEY ("emojiId") REFERENCES "Emoji"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
