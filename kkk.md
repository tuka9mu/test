model User {
  id          Int           @id @default(autoincrement())
  username    String        @unique
  password    String
  signature   String
  Validater   Validater?    @relation(fields: [validaterId], references: [id])
  validaterId Int?
  roleForUser RoleForUser[]
  statement   Statement[]
  createdAt   DateTime      @default(now())
  updatedAt   DateTime?     @updatedAt
  isActive    Boolean       @default(true)

  @@map("users")
}

model Role {
  id          Int           @id @default(autoincrement())
  name        String
  roleForUser RoleForUser[]
  createdAt   DateTime      @default(now())
  updatedAt   DateTime?     @updatedAt
  isActive    Boolean       @default(true)

  @@map("roles")
}

model RoleForUser {
  id        Int       @id @default(autoincrement())
  User      User      @relation(fields: [userId], references: [id])
  userId    Int
  Role      Role      @relation(fields: [roleId], references: [id])
  roleId    Int
  createdAt DateTime  @default(now())
  updatedAt DateTime? @updatedAt
  isActive  Boolean   @default(true)

  @@map("rolesForusers")
}

model Currency {
  id                     Int                      @id @default(autoincrement())
  name                   String?
  Faked_Logs             Faked_Logs[]
  Statement              Statement[]
  Iraqicalculated_Logs   Iraqicalculated_Logs[]
  Iraqiuncalculated_Logs Iraqiuncalculated_Logs[]
  createdAt              DateTime                 @default(now())
  updatedAt              DateTime?                @updatedAt
  isActive               Boolean                  @default(true)

  @@map("currencies")
}

model Faked_Logs {
  id          Int        @id @default(autoincrement())
  Currency    Currency?  @relation(fields: [currencyId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  currencyId  Int
  Statement   Statement? @relation(fields: [statementId], references: [id])
  statementId Int
  value       Int
  createdAt   DateTime   @default(now())
  updatedAt   DateTime?  @updatedAt
  isActive    Boolean    @default(true)

  @@map("faked_logs")
}

model Bank {
  id        Int       @id @default(autoincrement())
  name      String
  Invoice   Invoice[]
  createdAt DateTime  @default(now())
  updatedAt DateTime? @updatedAt
  isActive  Boolean   @default(true)

  @@map("Banks")
}

model Site {
  id        Int       @id @default(autoincrement())
  name      String
  Invoice   Invoice[]
  createdAt DateTime  @default(now())
  updatedAt DateTime? @updatedAt
  isActive  Boolean   @default(true)

  @@map("Sites")
}

model Iraqicalculated_Logs {
  id          Int        @id @default(autoincrement())
  Currency    Currency?  @relation(fields: [currencyId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  currencyId  Int
  Statement   Statement? @relation(fields: [statementId], references: [id])
  statementId Int
  value       Int
  createdAt   DateTime   @default(now())
  updatedAt   DateTime?  @updatedAt
  isActive    Boolean    @default(true)

  @@map("Iraqicalculated_logs")
}

model Iraqiuncalculated_Logs {
  id          Int        @id @default(autoincrement())
  Currency    Currency?  @relation(fields: [currencyId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  currencyId  Int
  Statement   Statement? @relation(fields: [statementId], references: [id])
  statementId Int
  value       Int
  createdAt   DateTime   @default(now())
  updatedAt   DateTime?  @updatedAt
  isActive    Boolean    @default(true)

  @@map("Iraqiuncalculated_logs")
}

model Statement {
  id                          Int                      @id @default(autoincrement())
  Invoice                     Invoice?                 @relation(fields: [invoiceId], references: [id])
  invoiceId                   Int
  Currency                    Currency?                @relation(fields: [currencyId], references: [id])
  currencyId                  Int
  User                        User?                    @relation(fields: [userId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  userId                      Int
  achieved                    Int
  loss                        Int
  unIraqiCalculated           Int
  unIraqiUnCalculated         Int
  unIraqiCalculated_Details   String
  unIraqiUnCalculated_Details String
  extra                       Int
  unacceptable                Int
  auger                       Int
  buried                      Int
  cashier                     String
  notes                       String
  Faked_Logs                  Faked_Logs[]
  Iraqicalculated_Logs        Iraqicalculated_Logs[]
  Iraqiuncalculated_Logs      Iraqiuncalculated_Logs[]
  createdAt                   DateTime                 @default(now())
  updatedAt                   DateTime?                @updatedAt
  isActive                    Boolean                  @default(true)

  @@map("Statementes")
}

model Invoice {
  id          Int         @id @default(autoincrement())
  Bank        Bank?       @relation(fields: [bankId], references: [id])
  bankId      Int?
  Site        Site?       @relation(fields: [siteId], references: [id])
  siteId      Int?
  Statement   Statement[]
  workingdate DateTime
  Validater   Validater[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime?   @updatedAt
  isActive    Boolean     @default(true)

  @@map("Invoices")
}

model Validater {
  id        Int       @id @default(autoincrement())
  Invoice   Invoice?  @relation(fields: [invoiceId], references: [id])
  invoiceId Int?
  User      User[]
  validated Boolean
  createdAt DateTime  @default(now())
  updatedAt DateTime? @updatedAt
  isActive  Boolean   @default(true)

  @@map("Validaters")
}
