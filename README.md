# f8n

## Contents
- [Getting Started](#getting-started)
- [Naming Conventions](#naming-conventions)
    - [Branch Names](#branch-names)
    - [File and Folder Names](#file-and-folder-names)
    - [React Component Names](#component-names)
    - [Function Names](#functions)
    - [TypeScript Definitions](#types-and-interfaces)
- [Resources](#resources)
    - [KDNK Forms](#kdnk-forms)
    - [Next.js](#nextjs)
    - [Tailwind](#tailwind-css)
    - [Supabase](#supabase)

## Getting Started

### Clone the Repo
Follow [these instructions](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) to clone the repo from GitHub.

### Install Project Dependencies with PNPM
This project uses [PNPM](https://pnpm.io/) as its package manager. To install the project's dependencies, you should:
1) Verify you have PNPM installed by running `pnpm -v` in your terminal
2) If PNPM is not installed on your machine, [install it](https://pnpm.io/installation)
3) Run `pnpm install` in the root directory of your cloned project to install all dependencies

### Add Credentials for Supabase
Now you need to connect the project to Supabase by following these steps:
1) Inside the `web-app` directory, make a copy of `.env.example` and rename it `.env.local`
2) Put the Supabase credentials given to you by your team lead in `.env.local`

### Run Your Development Server
To test that everything is set up properly, `cd` into `web-app` and run `pnpm run dev` to start the development server.

## Naming Conventions

### Branch Names
Follow the pattern `firstname/branch-name` for your branches.

Use only lower case letters. Use hyphens instead of spaces (kebab-case).

You can use whatever version of your first name you like, as long as you're consistent.

**Example**: `joey/new-feature`

### Next.js & React
#### File and Folder Names
Use `kebab-case` (all lower case letters, hyphens instead of spaces) for file and folder names.

Because this is a TypeScript project, files with React components are `TSX` and should use the `.tsx` file extension.

**Examples**: `icon-button.tsx`, `schools-form.tsx`, `page.tsx`

#### Component Names
Use `PascalCase` (capitalize each word, no spaces) for component names in your code. This is the React naming convention for components.

**Examples**: `IconButton`, `SchoolsForm`, `Page`

```
function IconButton() {
    // function body
}
```
_Note_: The files where components are defined follow the [file name conventions](#file-and-folder-names) like other files.

#### Functions
Use `camelCase` (capitalize all words except the first, no spaces) for function names unless the function creates a [React component](#component-names).

**Examples**: `handleSubmit()`, `getDate()`, `formatTitle()`

### TypeScript
#### Types and Interfaces

Use `PascalCase` (capitalize each word, no spaces) for type and interface definitions.

**Examples**:
```
type Birthday = string | Date;

interface SeaOtter {
    name: string;
    birthday: Birthday;
    favoriteFood: string;
    friendCount: number;
}
```

## Resources

### KDNK Forms
This project uses [KDNK forms](https://kdnk-f8n-scrapbook-villagers.vercel.app/), and open-source library designed to make it fast and easy to add high quality forms to Next.js projects.

The best place to start is with the [KDNK built-in components](https://kdnk-f8n-scrapbook-villagers.vercel.app/2_form-inputs/1_built-in).

Consult the [KDNK Scrapbook](https://kdnk-f8n-scrapbook-villagers.vercel.app/) to see demos of the components that are available.

### Next.js
Check out the [Next.js docs](https://nextjs.org/docs) for more information about using React with Next.js.

### Tailwind CSS
The [Tailwind docs](https://tailwindcss.com/) are easy to search, so start there if you have any styling issues.

### Supabase
Find answers to your questions about database and auth issues in the [Supabase docs](https://supabase.com/docs).
