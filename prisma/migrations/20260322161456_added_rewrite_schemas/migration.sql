-- CreateTable
CREATE TABLE "Rewrite" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "summary" TEXT,
    "achievements" TEXT[],
    "changesExplained" TEXT[],
    "userId" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,

    CONSTRAINT "Rewrite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewriteContact" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "location" TEXT,
    "website" TEXT,
    "rewriteId" TEXT NOT NULL,

    CONSTRAINT "RewriteContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewriteSkill" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "items" TEXT[],
    "rewriteId" TEXT NOT NULL,

    CONSTRAINT "RewriteSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewriteExperience" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT,
    "title" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "bullets" TEXT[],
    "rewriteId" TEXT NOT NULL,

    CONSTRAINT "RewriteExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewriteEducation" (
    "id" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "gpa" TEXT,
    "coursework" TEXT,
    "rewriteId" TEXT NOT NULL,

    CONSTRAINT "RewriteEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewriteProject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TEXT,
    "techStack" TEXT[],
    "bullets" TEXT[],
    "link" TEXT,
    "rewriteId" TEXT NOT NULL,

    CONSTRAINT "RewriteProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RewriteContact_rewriteId_key" ON "RewriteContact"("rewriteId");

-- AddForeignKey
ALTER TABLE "Rewrite" ADD CONSTRAINT "Rewrite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rewrite" ADD CONSTRAINT "Rewrite_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewriteContact" ADD CONSTRAINT "RewriteContact_rewriteId_fkey" FOREIGN KEY ("rewriteId") REFERENCES "Rewrite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewriteSkill" ADD CONSTRAINT "RewriteSkill_rewriteId_fkey" FOREIGN KEY ("rewriteId") REFERENCES "Rewrite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewriteExperience" ADD CONSTRAINT "RewriteExperience_rewriteId_fkey" FOREIGN KEY ("rewriteId") REFERENCES "Rewrite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewriteEducation" ADD CONSTRAINT "RewriteEducation_rewriteId_fkey" FOREIGN KEY ("rewriteId") REFERENCES "Rewrite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewriteProject" ADD CONSTRAINT "RewriteProject_rewriteId_fkey" FOREIGN KEY ("rewriteId") REFERENCES "Rewrite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
