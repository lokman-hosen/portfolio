// apps/api/prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@portfolio.com' },
    update: {},
    create: {
      email: 'admin@portfolio.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  // Create skills
  const skills = [
    {
      name: 'NestJS',
      category: 'BACKEND',
      proficiency: 4,
      featured: true,
      order: 1,
    },
    {
      name: 'Next.js',
      category: 'FRONTEND',
      proficiency: 5,
      featured: true,
      order: 2,
    },
    {
      name: 'Prisma',
      category: 'DATABASE',
      proficiency: 4,
      featured: true,
      order: 3,
    },
    { name: 'PostgreSQL', category: 'DATABASE', proficiency: 4, order: 4 },
    { name: 'React', category: 'FRONTEND', proficiency: 5, order: 5 },
    {
      name: 'TypeScript',
      category: 'FRONTEND',
      proficiency: 5,
      featured: true,
      order: 1,
    },
    { name: 'Docker', category: 'DEVOPS', proficiency: 3, order: 6 },
    { name: 'Git', category: 'TOOLS', proficiency: 4, order: 7 },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: {
        name_category: { name: skill.name, category: skill.category as any },
      },
      update: {},
      create: skill,
    });
  }

  // Create sample projects
  await prisma.project.createMany({
    data: [
      {
        title: 'E-Commerce Platform',
        slug: 'e-commerce-platform',
        description:
          'A full-stack e-commerce solution with real-time inventory management',
        technologies: [
          'NestJS',
          'Next.js',
          'PostgreSQL',
          'Prisma',
          'TailwindCSS',
        ],
        githubUrl: 'https://github.com/yourusername/ecommerce',
        liveUrl: 'https://ecommerce-demo.com',
        featured: true,
        order: 1,
        status: 'COMPLETED',
      },
      {
        title: 'Task Management App',
        slug: 'task-management-app',
        description:
          'Collaborative task management with real-time updates and team features',
        technologies: [
          'NestJS',
          'React',
          'PostgreSQL',
          'Socket.io',
          'TailwindCSS',
        ],
        githubUrl: 'https://github.com/yourusername/taskmanager',
        featured: false,
        order: 2,
        status: 'IN_PROGRESS',
      },
      {
        title: 'Portfolio Website',
        slug: 'portfolio-website',
        description: 'Personal portfolio website showcasing my work and skills',
        technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
        liveUrl: 'https://yourportfolio.com',
        featured: true,
        order: 3,
        status: 'COMPLETED',
      },
    ],
  });

  console.log('✅ Seeding completed!');
  console.log('Admin credentials:');
  console.log('Email: admin@portfolio.com');
  console.log('Password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
