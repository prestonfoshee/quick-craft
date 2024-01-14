-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "details" TEXT NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "stack_size" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
