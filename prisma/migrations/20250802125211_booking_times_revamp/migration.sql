/*
  Warnings:

  - You are about to drop the column `timeSlot` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `loyalityPoints` on the `User` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closingHour` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openingHour` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slotDurationMinutes` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Booking" DROP COLUMN "timeSlot",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "loyalityPoints",
ADD COLUMN     "loyaltyPoints" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Venue" ADD COLUMN     "closingHour" INTEGER NOT NULL,
ADD COLUMN     "openingHour" INTEGER NOT NULL,
ADD COLUMN     "slotDurationMinutes" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Booking_date_idx" ON "public"."Booking"("date");

-- CreateIndex
CREATE INDEX "Booking_startTime_idx" ON "public"."Booking"("startTime");

-- CreateIndex
CREATE INDEX "Booking_endTime_idx" ON "public"."Booking"("endTime");

-- CreateIndex
CREATE INDEX "Sport_name_idx" ON "public"."Sport"("name");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "public"."User"("name");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "Venue_name_idx" ON "public"."Venue"("name");

-- CreateIndex
CREATE INDEX "Venue_location_idx" ON "public"."Venue"("location");
