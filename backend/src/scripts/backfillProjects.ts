import prisma from '../lib/prisma';

const tempFunction = async () => {
  try {
    const updatedCount = await prisma.$transaction(async (tx) => {
      const tasksWithoutProject = await tx.task.count({
        where: { projectId: null },
      });
      if (tasksWithoutProject === 0) {
        return 0;
      }
      const createProject = await tx.project.create({
        data: { name: `Project_1` },
      });

      const updatedTasks = await tx.task.updateMany({
        where: { projectId: null },
        data: { projectId: createProject.id },
      });
      return updatedTasks.count;
    });
    console.log(`Updated ${updatedCount} tasks`);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
};

tempFunction();
