const bcrypt = require('bcryptjs')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const password = bcrypt.hashSync('123456');
const userData = [
  { username: 'Pond', password, email: 'Pond@ggg.mail',  address: '123 Street, City',  phone: '0970890759' },
  { username: 'may',password,  email: 'may@ggg.mail',  address: '1234 Street, City',  phone: '0970890758' },
  { username: 'bam',  password, email: 'bam@ggg.mail', address: '1235 Street, City',  phone: '0970890757' }
];

const run = async () => {
  await prisma.user.createMany({
    data: userData,
  });
};

run()