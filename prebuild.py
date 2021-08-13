import os
import shutil

if os.path.exists("build"): # if build exists
    shutil.rmtree('build') # delete it, to remove any contents
os.mkdir("build") # and create it again

shutil.copy("index.html", "build/index.html")
shutil.copy("styles.css", "build/styles.css")
shutil.copy("favicon.ico", "build/favicon.ico")
shutil.copytree("images", "build/images")

