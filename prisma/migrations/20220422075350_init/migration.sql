/*
  Warnings:

  - You are about to drop the `Emoji` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmojiComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmojiPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmojiComment" DROP CONSTRAINT "EmojiComment_commentId_fkey";

-- DropForeignKey
ALTER TABLE "EmojiComment" DROP CONSTRAINT "EmojiComment_emojiId_fkey";

-- DropForeignKey
ALTER TABLE "EmojiPost" DROP CONSTRAINT "EmojiPost_emojiId_fkey";

-- DropForeignKey
ALTER TABLE "EmojiPost" DROP CONSTRAINT "EmojiPost_postId_fkey";

-- DropTable
DROP TABLE "Emoji";

-- DropTable
DROP TABLE "EmojiComment";

-- DropTable
DROP TABLE "EmojiPost";
