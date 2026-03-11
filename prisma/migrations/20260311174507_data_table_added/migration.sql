-- CreateTable
CREATE TABLE "DATA" (
    "id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "DATA_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DATA_id_key" ON "DATA"("id");
