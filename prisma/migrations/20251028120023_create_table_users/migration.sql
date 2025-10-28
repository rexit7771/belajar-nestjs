-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
