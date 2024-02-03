#!/bin/bash

# Navigate to your project directory (change this to your project's path)
cd /path/to/your/project

# Check for uncommitted changes
if git diff-index --quiet HEAD --; then
    echo "No changes to commit."
else
    # Ask for a commit message
    read -p "Enter your commit message: " commit_message

    # Add all changed files to the commit
    git add .

    # Commit the changes
    git commit -m "$commit_message"

    # Push the changes
    git push origin master
fi
