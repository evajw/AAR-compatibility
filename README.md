# AAR-compatibility
The application for AAR-compatibility serves as an easy method for checking specifications between certain AAR combinations

## Which software do you need?
For the software to run locally there are couple of softwares you need to install.

1. Firstly, make sure you can run the project directory as a whole. For this Visual Studio code is advised: https://code.visualstudio.com/download
2. As the excel to sql read-out is done by a python script, you should install python on your device: https://www.python.org/downloads/
3. This python code needs several libraries. For this open your command prompt (or in Dutch "opdrachtprompt") on your device. First we need to check wether you already have the python library installer.
Type in the command prompt:

```bash
pip --version
```

If you already have pip installed. The output will show something similar to 

```bash 
pip 25.3 from C:\Users\ejwes\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.10_qbz5n2kfra8p0\LocalCache\local-packages\Python310\site-packages\pip (python 3.10)
```

4. In the same command prompt, download the following libraries:
```bash
pip install pandas
pip install sqlalchemy
```
5. The software makes use of two services. The first service being postgreSQL and the second service being node.js as the back-end running on javascript. Instead of having to download all the software for these services, we are going to make use of docker.compose. This is a tool for defining and running multi-container applications. It runs all services internally. Download Docker: https://docs.docker.com/

6. Lastly, you need git bash. This software allows you to communicate between your local and this online repository: https://git-scm.com/install/windows. 

### Now you are all set to work with the necessary software, read "How to work with GITHUB", to see how you can easily clone and adapt the code runnning the software.




## How to work with GITHUB
*Local* refers to the repository on your laptop. *Remote* refers to the repository online on Git.

1.	Make sure to have a github account and download “git bash” for easy usage via https://git-scm.com/install/windows
2.	In the bash terminal type:

```bash
git clone https://github.com/evajw/AAR-compatibility.git
```

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


## Run the services

Now you are ready use the repository! 
1. Open docker application on your device. 
2. Go to the "docker_compose.yml" file and click on "run all services" at the top of the file. 
3. Your service will now be running. To check this, open a browser and enter: "localhost:3000".


## Database

See [database README](database/README.md) for database details.




