# AAR-compatibility
The application for AAR-compatibility serves as an easy method for checking specifications between certain AAR combinations

# How to work with GITHUB
*Local* refers to the repository on your laptop. *Remote* refers to the repository online on Git.

1.	Make sure to have a github account and download “git bash” for easy usage via https://git-scm.com/install/windows
2.	In the bash terminal type:
git clone https://github.com/evajw/AAR-compatibility.git
3.	Make sure you are working in the right local folder by typing:
```bash
cd “path/to/your/local/folder”
```
4.	To update your local repository type
```bash
git pull origin main
```
5.	To update the remote repository type
```bash
git add .
```
This adds all files in a so called staging phase, you can also change the “.” for a specific file e.g. “git add backend/server/server.js”. 


```bash
git commit -m “Description of your changes”
```
By commiting your changes your create a snapshot of your changes in the staging phase. This is where a new version of your local repository is created. Everything you have added to your add, will now end up in the commit. Make sure to give a description of your changes, as to make clear what adaptions have been done. 

```bash
git pull origin main –-rebase
```
By pulling the remote repository you get the latest version from GIT. BY using -rebase you build your local repository on the newest version of the remote repository. This will show all possible conflicts

```bash
git push origin main
```
Now you can push your commit definitly to GIT. You can also change the directory "main" for another bash. This way you allow people to first check your work before you overwrite everything! 
