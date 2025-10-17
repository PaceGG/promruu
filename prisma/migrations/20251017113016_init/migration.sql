-- CreateEnum
CREATE TYPE "CarStatus" AS ENUM ('available', 'reserved', 'sold', 'not_available');

-- CreateEnum
CREATE TYPE "EngineType" AS ENUM ('petrol', 'diesel', 'electric', 'hybrid');

-- CreateEnum
CREATE TYPE "TransmissionType" AS ENUM ('manual', 'automatic', 'robot');

-- CreateEnum
CREATE TYPE "BodyType" AS ENUM ('sedan', 'suv', 'hatchback', 'coupe', 'wagon', 'pickup', 'minivan', 'convertible', 'other');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('customer', 'sales', 'admin');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'blocked');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'paid', 'failed', 'refunded');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('new', 'confirmed', 'processing', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "DeliveryMethod" AS ENUM ('pickup', 'delivery');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('orders_by_period', 'sales_by_model', 'inventory');

-- CreateTable
CREATE TABLE "Car" (
    "car_id" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "status" "CarStatus" NOT NULL DEFAULT 'available',
    "mileage" INTEGER NOT NULL,
    "engine_type" "EngineType" NOT NULL,
    "engine_capacity" DOUBLE PRECISION NOT NULL,
    "engine_power" INTEGER NOT NULL,
    "transmission" "TransmissionType" NOT NULL,
    "body_type" "BodyType" NOT NULL,
    "color" TEXT NOT NULL,
    "vin" TEXT,
    "features" TEXT[],
    "images" TEXT[],
    "description" TEXT,
    "created_timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("car_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'customer',
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "password_hash" TEXT NOT NULL,
    "last_login_timestamp" TIMESTAMP(3),
    "created_timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "UserStatus" NOT NULL DEFAULT 'active',

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "order_items" JSONB NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "delivery_method" "DeliveryMethod" NOT NULL,
    "contact_info" TEXT,
    "status" "OrderStatus" NOT NULL DEFAULT 'new',
    "history" JSONB NOT NULL,
    "created_timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "EventLog" (
    "event_id" TEXT NOT NULL,
    "user_id" TEXT,
    "event_type" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "details" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip_address" TEXT,

    CONSTRAINT "EventLog_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "Report" (
    "report_id" TEXT NOT NULL,
    "type" "ReportType" NOT NULL,
    "parameters" JSONB NOT NULL,
    "generated_timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file_ref" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("report_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Car_vin_key" ON "Car"("vin");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventLog" ADD CONSTRAINT "EventLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
