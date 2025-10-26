import { TaskController } from '../../src/modules/tasks/task.controller';
import { TaskService } from '../../src/modules/tasks/task.service';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    const prismaMock = {
      task: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    } as any;

    const loggerMock = {
      setContext: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
    } as any;

    taskService = new TaskService(prismaMock, loggerMock);
    taskController = new TaskController(taskService);
  });

  it('create task', async () => {
    const dto = {
      title: 'Test Task',
      description: 'This is a test task',
      isCompleted: false,
      userId: '1',
    };
    const expectedResult = {
      id: '1',
      ...dto,
      userId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(taskService, 'addTask').mockResolvedValue(expectedResult);

    const result = await taskController.create(dto);

    expect(result).toEqual(expectedResult);
    expect(taskService.addTask).toHaveBeenCalledWith(dto);
  });

  it('get all tasks', async () => {
    const expectedResult = [
      {
        id: '1',
        title: 'Test Task 1',
        description: 'This is test task 1',
        isCompleted: false,
        userId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(taskService, 'getAllTasks').mockResolvedValue(expectedResult);

    const result = await taskController.getTasks();

    expect(result).toEqual(expectedResult);
    expect(taskService.getAllTasks).toHaveBeenCalled();
  });

  it('updated task completion status', async () => {
    const taskId = '1';
    const dto = { isCompleted: true };
    const expectedResult = {
      id: taskId,
      title: 'Test Task',
      description: 'This is a test task',
      isCompleted: false,
      userId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(taskService, 'updateCompletedTask').mockResolvedValue(expectedResult);

    const result = await taskController.updateCompleteTask(taskId, dto);

    expect(result).toEqual(expectedResult);
    expect(taskService.updateCompletedTask).toHaveBeenCalledWith(taskId, dto);
  });

  it('delete task', async () => {
    const taskId = '1';
    jest.spyOn(taskService, 'deleteTask').mockResolvedValue(undefined);

    const result = await taskController.deleteTask(taskId);
    expect(result).toBeUndefined();
    expect(taskService.deleteTask).toHaveBeenCalledWith(taskId);
  });

  it('update task', async () => {
    const taskId = '1';
    const dto = { title: 'Only Title Updated' };
    const expectedResult = {
      id: taskId,
      title: 'Only Title Updated',
      description: 'Original description',
      isCompleted: false,
      userId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(taskService, 'updateTask').mockResolvedValue(expectedResult);

    const result = await taskController.updateTask(taskId, dto);

    expect(result).toEqual(expectedResult);
    expect(taskService.updateTask).toHaveBeenCalledWith(taskId, dto);
    expect(result.title).toBe('Only Title Updated');
    expect(result.description).toBe('Original description');
  });
  it('should throw error when task not found', async () => {
    // Arrange
    const taskId = '999';
    const error = new Error('Task not found');

    jest.spyOn(taskService, 'deleteTask').mockRejectedValue(error);

    // Act & Assert
    await expect(taskController.deleteTask(taskId)).rejects.toThrow('Task not found');
    expect(taskService.deleteTask).toHaveBeenCalledWith(taskId);
  });
});
