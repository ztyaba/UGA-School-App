import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);
  const superAdmin = await prisma.user.upsert({
    where: { email: "super@schoolpay.ug" },
    update: {},
    create: {
      name: "Super Admin",
      email: "super@schoolpay.ug",
      phone: "+256700000001",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  const school = await prisma.school.upsert({
    where: { code: "UG-001" },
    update: {},
    create: {
      name: "Kampala Junior School",
      code: "UG-001",
      district: "Kampala",
      address: "Main Street",
      contact: "+256700000002",
      status: "APPROVED",
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@kjs.ug" },
    update: {},
    create: {
      name: "School Admin",
      email: "admin@kjs.ug",
      phone: "+256700000003",
      passwordHash,
      role: "SCHOOL_ADMIN",
    },
  });
  await prisma.schoolAdmin.upsert({
    where: { userId: adminUser.id },
    update: { schoolId: school.id },
    create: { userId: adminUser.id, schoolId: school.id },
  });

  const p1 = await prisma.class.upsert({
    where: { id: "class-p1" },
    update: { name: "P1", levelOrder: 1, schoolId: school.id },
    create: { id: "class-p1", name: "P1", levelOrder: 1, schoolId: school.id },
  });
  const term1 = await prisma.term.upsert({
    where: { id: "term-1" },
    update: {},
    create: {
      id: "term-1",
      name: "Term 1",
      schoolId: school.id,
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-04-30"),
      dueDate: new Date("2024-03-01"),
    },
  });

  const student = await prisma.student.upsert({
    where: { studentCode: "STU-001" },
    update: {},
    create: {
      studentCode: "STU-001",
      fullName: "Amina K" ,
      classId: p1.id,
      schoolId: school.id,
      stream: "Blue",
    },
  });

  const parent = await prisma.user.upsert({
    where: { email: "parent@example.com" },
    update: {},
    create: {
      name: "Parent One",
      email: "parent@example.com",
      phone: "+256700000004",
      passwordHash,
      role: "PARENT",
    },
  });

  await prisma.parentStudent.upsert({
    where: { id: "link-1" },
    update: {},
    create: { id: "link-1", parentId: parent.id, studentId: student.id, relationship: "Mother" },
  });

  const tuition = await prisma.feeItemTemplate.upsert({
    where: { id: "fee-1" },
    update: {},
    create: { id: "fee-1", classId: p1.id, termId: term1.id, itemName: "Tuition", amount: 500000 },
  });
  const meals = await prisma.feeItemTemplate.upsert({
    where: { id: "fee-2" },
    update: {},
    create: { id: "fee-2", classId: p1.id, termId: term1.id, itemName: "Meals", amount: 150000 },
  });

  const invoice = await prisma.invoice.upsert({
    where: { id: "invoice-1" },
    update: {},
    create: {
      id: "invoice-1",
      studentId: student.id,
      termId: term1.id,
      totalAmount: tuition.amount + meals.amount,
      status: "ISSUED",
      dueDate: term1.dueDate,
      lineItems: { create: [{ name: tuition.itemName, amount: tuition.amount }, { name: meals.itemName, amount: meals.amount }] },
    },
  });

  await prisma.payment.upsert({
    where: { id: "payment-1" },
    update: {},
    create: {
      id: "payment-1",
      invoiceId: invoice.id,
      parentId: parent.id,
      schoolId: school.id,
      amount: 300000,
      method: "MOBILE_MONEY",
      provider: "MTN",
      reference: "MM-123",
      status: "SUCCESS",
    },
  });

  console.log({ superAdmin, school, adminUser, student, parent });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
