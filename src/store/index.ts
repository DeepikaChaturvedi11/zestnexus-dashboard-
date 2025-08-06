import { atom } from 'jotai';

export interface Project {
  id: string;
  name: string;
  owner: string;
  startDate: string;
  dueDate: string;
  status: 'Active' | 'Completed' | 'Delayed';
  description?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId: string;
  status: 'todo' | 'inprogress' | 'done';
  assignee?: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    owner: 'John Doe',
    startDate: '2024-01-15',
    dueDate: '2024-03-30',
    status: 'Active',
    description: 'Building a modern e-commerce platform with React and Node.js'
  },
  {
    id: '2',
    name: 'Mobile App Redesign',
    owner: 'Jane Smith',
    startDate: '2024-02-01',
    dueDate: '2024-04-15',
    status: 'Active',
    description: 'Complete redesign of the mobile application'
  },
  {
    id: '3',
    name: 'Dashboard Analytics',
    owner: 'Mike Johnson',
    startDate: '2024-01-01',
    dueDate: '2024-02-28',
    status: 'Completed',
    description: 'Advanced analytics dashboard for business insights'
  },
  {
    id: '4',
    name: 'API Integration',
    owner: 'Sarah Wilson',
    startDate: '2024-02-15',
    dueDate: '2024-03-15',
    status: 'Delayed',
    description: 'Integration with third-party APIs'
  }
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Setup project structure',
    description: 'Initialize the project with proper folder structure',
    projectId: '1',
    status: 'done',
    assignee: 'John Doe',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Design database schema',
    description: 'Create the database schema for the e-commerce platform',
    projectId: '1',
    status: 'todo',
    assignee: 'John Doe',
    createdAt: '2024-01-16'
  },
  {
    id: '3',
    title: 'Implement user authentication',
    description: 'Add login and registration functionality',
    projectId: '1',
    status: 'inprogress',
    assignee: 'John Doe',
    createdAt: '2024-01-17'
  },
  {
    id: '4',
    title: 'Create wireframes',
    description: 'Design wireframes for mobile app screens',
    projectId: '2',
    status: 'done',
    assignee: 'Jane Smith',
    createdAt: '2024-02-01'
  },
  {
    id: '5',
    title: 'Prototype development',
    description: 'Build interactive prototype',
    projectId: '2',
    status: 'inprogress',
    assignee: 'Jane Smith',
    createdAt: '2024-02-05'
  },
{
  id: '6',
  title: 'Research AI APIs',
  description: 'Evaluate OpenAI, Google Dialogflow, and others',
  projectId: '6',
  status: 'todo',
  assignee: 'Ananya Gupta',
  createdAt: '2024-03-10'
},


];

// Atoms
export const projectsAtom = atom<Project[]>(mockProjects);
export const tasksAtom = atom<Task[]>(mockTasks);
export const currentUserAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom<boolean>(false);

// Derived atoms
export const activeProjectsAtom = atom((get) => 
  get(projectsAtom).filter(project => project.status === 'Active')
);

export const completedProjectsAtom = atom((get) => 
  get(projectsAtom).filter(project => project.status === 'Completed')
);

export const delayedProjectsAtom = atom((get) => 
  get(projectsAtom).filter(project => project.status === 'Delayed')
);

export const getTasksByProjectIdAtom = atom((get) => (projectId: string) =>
  get(tasksAtom).filter(task => task.projectId === projectId)
);

export const todoTasksAtom = atom((get) =>
  get(tasksAtom).filter(task => task.status === 'todo')
);

export const inProgressTasksAtom = atom((get) =>
  get(tasksAtom).filter(task => task.status === 'inprogress')
);

export const doneTasksAtom = atom((get) =>
  get(tasksAtom).filter(task => task.status === 'done')
);
