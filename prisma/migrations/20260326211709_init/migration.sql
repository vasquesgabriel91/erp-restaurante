-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GERENTE', 'BALCONISTA', 'GARCOM');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userName" TEXT NOT NULL,
    "passWord" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");
