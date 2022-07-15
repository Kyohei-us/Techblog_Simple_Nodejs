-- CreateTable
CREATE TABLE "PostInfo" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "PostInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostInfoToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PostInfo_postId_key" ON "PostInfo"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PostInfoToTag_AB_unique" ON "_PostInfoToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostInfoToTag_B_index" ON "_PostInfoToTag"("B");

-- AddForeignKey
ALTER TABLE "PostInfo" ADD CONSTRAINT "PostInfo_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostInfoToTag" ADD CONSTRAINT "_PostInfoToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "PostInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostInfoToTag" ADD CONSTRAINT "_PostInfoToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
