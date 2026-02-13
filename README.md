**Run Locally Guide**
**1. Prerequisites**
Install:
Node.js (LTS, v20 or above)
npm (comes with Node.js)

**2. Download project**
Clone/download the project folder:
Slooze-management-system

**3. Open terminal in project root**
cd Slooze-management-system

**4. Install dependencies**
npm install

**5. Create environment files**
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env.local

**6. Configure frontend API URL**
In .env.local, make sure:
NEXT_PUBLIC_API_URL=http://localhost:4000

**7. Setup database and sample data**
cd backend
npx prisma db push --schema prisma/schema.prisma
npm run prisma:seed
cd ..

**8. Start the application**
npm run dev

**9. Open in browser**
App: http://localhost:3000
API GraphQL: http://localhost:4000/graphql

**10. Demo credentials**
Manager: manager@slooze.com / manager123
Store Keeper: keeper@slooze.com / keeper123
