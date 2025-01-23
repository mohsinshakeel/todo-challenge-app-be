import { Status } from "./types";

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Tasks API',
    version: '1.0.0',
    description: 'API documentation for managing tasks with Prisma and Express',
  },
  paths: {
    '/tasks': {
      get: {
        summary: 'Get all tasks',
        description: 'Retrieve a list of all tasks.',
        responses: {
          200: {
            description: 'List of tasks retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Task',
                  },
                },
              },
            },
          },
          400: {
            description: 'Failed to fetch tasks',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string', example: 'Failed to fetch tasks data' },
                  },
                },
              },
            },
          },
        },
        tags: ['Tasks'],
      },
      post: {
        summary: 'Create a new task',
        description: 'Add a new task to the system.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TaskInput',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Task created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Task',
                },
              },
            },
          },
          400: {
            description: 'Invalid task input',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string', example: 'Failed to create task' },
                  },
                },
              },
            },
          },
        },
        tags: ['Tasks'],
      },
    },
    '/tasks/{id}': {
      get: {
        summary: 'Get a task by ID',
        description: 'Retrieve details of a specific task by its ID.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'UUID of the task to retrieve',
          },
        ],
        responses: {
          200: {
            description: 'Task details retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Task',
                },
              },
            },
          },
          404: {
            description: 'Task not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string', example: 'Task not found' },
                  },
                },
              },
            },
          },
        },
        tags: ['Tasks'],
      },
      put: {
        summary: 'Update a task by ID',
        description: 'Update an existing task with new details.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'UUID of the task to update',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TaskInput',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Task updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Task',
                },
              },
            },
          },
          404: {
            description: 'Task not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string', example: 'Task not found' },
                  },
                },
              },
            },
          },
        },
        tags: ['Tasks'],
      },
      delete: {
        summary: 'Delete a task by ID',
        description: 'Remove a task from the system.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'UUID of the task to delete',
          },
        ],
        responses: {
          200: {
            description: 'Task deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                  example: 'Task deleted successfully',
                },
              },
            },
          },
          404: {
            description: 'Task not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string', example: 'Task not found' },
                  },
                },
              },
            },
          },
        },
        tags: ['Tasks'],
      },
    },
  },
  components: {
    schemas: {
      Task: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' },
          title: { type: 'string', example: 'Example Task Title' },
          color: { type: 'string', example: 'blue' },
          status: { type: 'string', example: 'completed' },
          createdAt: { type: 'string', format: 'date-time', example: '2023-07-19T12:34:56Z' },
        },
      },
      TaskInput: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'Example Task Title' },
          color: { type: 'string', example: 'blue' },
          status: {
            type: 'string',
            enum: Object.values(Status),
            example: Status.PENDING,
          },
        },
        required: ['title', 'status'],
      },
    },
  },
};

export default swaggerDocument;
