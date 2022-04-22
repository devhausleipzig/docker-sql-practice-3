/*
  Warnings:

  - A unique constraint covering the columns `[character]` on the table `Emoji` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Emoji_character_key" ON "Emoji"("character");
