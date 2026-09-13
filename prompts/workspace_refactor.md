# Workspace Refactor Instructions

The existing workspace is a little haphazardly organized; refactor it to the following structure. Change all associated code paths and run necessary checks to ensure everything runs. 

```
my-website/
├── index.html
├── about.html
├── projects.html
├── publications.html
├── cv.html
│
├── css/
│   ├── style.css
│   └── responsive.css
│
├── js/
│   └── main.js
│
├── assets/
│   ├── images/
│   │   ├── profile.jpg
│   │   ├── project-1.jpg
│   │   └── ...
│   ├── icons/
│   └── documents/
│       └── CV.pdf
│
├── .gitignore
└── README.md
```