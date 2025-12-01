# AAR-compatibility
The application for AAR-compatibility serves as an easy method for checking specifications between certain AAR combinations

# How to work with GITHUB
Local refers to the repository on your laptop. Remote refers to the repository on Git.

1.	Make sure to have a github account and download “git bash” for easy usage.
2.	In the bash terminal type:
git clone https://github.com/evajw/AAR-compatibility.git
3.	Make sure you are working in the right local folder by typing:
cd “path/to/your/local/folder”
4.	To update your local repository type
git pull origin main
5.	To update the remote repository type
git add . 
(This adds all files in a certain in between phase, you can also change the “.” for a specific file e.g. “git add backend/server/server.js”)
git commit -m “Description of your changes”
git pull origin main –rebase
git push origin main

