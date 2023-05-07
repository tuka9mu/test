
model Currency {
  id                     Int                      @id @default(autoincrement())
  name                   String? 
  createdAt              DateTime                 @default(now())
  updatedAt              DateTime?                @updatedAt
  isActive               Boolean                  @default(true)
}

model Faked_Logs {
  id          Int        @id @default(autoincrement())
  currencyId  Int
  statementId Int
  value       Int
  createdAt   DateTime   @default(now())
  updatedAt   DateTime?  @updatedAt
  isActive    Boolean    @default(true)

}

model Bank {
  id        Int        
  name      String 
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
  currencyId  Int 
  statementId Int
  value       Int
  createdAt   DateTime   @default(now())
  updatedAt   DateTime?  @updatedAt
  isActive    Boolean    @default(true)

  @@map("Iraqicalculated_logs")
}

model Iraqiuncalculated_Logs {
  id          Int        @id @default(autoincrement()) 
  currencyId  Int 
  statementId Int
  value       Int
  createdAt   DateTime   @default(now())
  updatedAt   DateTime?  @updatedAt
  isActive    Boolean    @default(true)

  @@map("Iraqiuncalculated_logs")
}

model Statement {
  id                          Int                      @id @default(autoincrement()) 
  invoiceId                   Int 
  currencyId                  Int 
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
  createdAt                   DateTime                 @default(now())
  updatedAt                   DateTime?                @updatedAt
  isActive                    Boolean                  @default(true)

  @@map("Statementes")
}

model Invoice {
  id          Int         @id @default(autoincrement()) 
  bankId      Int? 
  siteId      Int? 
  workingdate DateTime 
  createdAt   DateTime    @default(now())
  updatedAt   DateTime?   @updatedAt
  isActive    Boolean     @default(true)

  @@map("Invoices")
}

model Validater {
  id        Int       @id @default(autoincrement()) 
  invoiceId Int? 
  validated Boolean
  createdAt DateTime  @default(now())
  updatedAt DateTime? @updatedAt
  isActive  Boolean   @default(true)

  @@map("Validaters")
}